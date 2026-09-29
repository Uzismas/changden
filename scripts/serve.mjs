import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const localStats = { total: 0, days: {}, months: {}, pages: {}, events: {} };
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);

  if (pathname === '/api/stats') {
    const now = new Date();
    const day = now.toISOString().slice(0, 10);
    const month = day.slice(0, 7);
    const sendJson = (status, payload) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify(payload));
    };

    if (request.method === 'GET') {
      const rows = (values) => Object.entries(values).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);
      sendJson(200, { configured: true, metrics: { total: localStats.total, today: localStats.days[day] || 0, month: localStats.months[month] || 0, pages: rows(localStats.pages), events: rows(localStats.events) } });
      return;
    }

    if (request.method === 'POST') {
      let body = '';
      request.on('data', (chunk) => { body += chunk; });
      request.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const page = typeof payload.page === 'string' && payload.page.startsWith('/') ? payload.page.split(/[?#]/)[0].slice(0, 160) : '/';
          const event = typeof payload.event === 'string' ? payload.event.replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 60) : '';
          if (!event) {
            localStats.total += 1;
            localStats.days[day] = (localStats.days[day] || 0) + 1;
            localStats.months[month] = (localStats.months[month] || 0) + 1;
            localStats.pages[page] = (localStats.pages[page] || 0) + 1;
          } else {
            localStats.events[event] = (localStats.events[event] || 0) + 1;
          }
          sendJson(202, { recorded: true });
        } catch {
          sendJson(400, { error: 'Invalid JSON' });
        }
      });
      return;
    }

    response.setHeader('Allow', 'GET, POST');
    sendJson(405, { error: 'Method not allowed' });
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = normalize(join(root, relativePath));

  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Chang Den site: http://127.0.0.1:${port}`);
});
