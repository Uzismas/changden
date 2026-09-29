// Vercel environment values are sometimes pasted from a .env file with quotes
// or a trailing slash. Normalize those forms before constructing REST requests.
function envValue(name) {
  const raw = process.env[name];
  if (typeof raw !== 'string') return '';
  const value = raw.trim();
  if (value.length >= 2 && ((value[0] === '"' && value[value.length - 1] === '"') || (value[0] === "'" && value[value.length - 1] === "'"))) {
    return value.slice(1, -1).trim();
  }
  return value;
}

const redisUrl = envValue('UPSTASH_REDIS_REST_URL').replace(/\/+$/, '');
const redisToken = envValue('UPSTASH_REDIS_REST_TOKEN');
const keyPrefix = 'changden:stats';

function isConfigured() {
  return Boolean(redisUrl && redisToken);
}

function respond(response, status, payload) {
  response.status(status).setHeader('Cache-Control', 'no-store');
  return response.json(payload);
}

function cleanPath(value) {
  if (typeof value !== 'string') return '/';
  const path = value.split('?')[0].split('#')[0].trim();
  if (!path || path[0] !== '/') return '/';
  return path.slice(0, 160);
}

function cleanEvent(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 60);
}

function redisCommand(commands) {
  return fetch(`${redisUrl}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  }).then(async (result) => {
    if (!result.ok) throw new Error(`Redis request failed with ${result.status}`);
    return result.json();
  });
}

function resultValue(item) {
  return item && Object.prototype.hasOwnProperty.call(item, 'result') ? item.result : null;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hashToList(value) {
  if (!Array.isArray(value)) return [];
  const rows = [];
  for (let index = 0; index < value.length; index += 2) {
    rows.push({ name: String(value[index]), count: numberValue(value[index + 1]) });
  }
  return rows.sort((a, b) => b.count - a.count).slice(0, 10);
}

async function readStats(day, month) {
  const results = await redisCommand([
    ['GET', `${keyPrefix}:total`],
    ['GET', `${keyPrefix}:day:${day}`],
    ['GET', `${keyPrefix}:month:${month}`],
    ['HGETALL', `${keyPrefix}:pages`],
    ['HGETALL', `${keyPrefix}:events`]
  ]);

  return {
    total: numberValue(resultValue(results[0])),
    today: numberValue(resultValue(results[1])),
    month: numberValue(resultValue(results[2])),
    pages: hashToList(resultValue(results[3])),
    events: hashToList(resultValue(results[4]))
  };
}

async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    return respond(response, 405, { error: 'Method not allowed' });
  }

  if (!isConfigured()) {
    return respond(response, 200, { configured: false, metrics: null });
  }

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const month = now.toISOString().slice(0, 7);

  try {
    if (request.method === 'POST') {
      let body = request.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
      }
      body = typeof body === 'object' && body ? body : {};
      const page = cleanPath(body.page);
      const event = cleanEvent(body.event);
      const commands = event ? [] : [
        ['INCR', `${keyPrefix}:total`],
        ['INCR', `${keyPrefix}:day:${day}`],
        ['INCR', `${keyPrefix}:month:${month}`],
        ['HINCRBY', `${keyPrefix}:pages`, page, 1]
      ];
      if (event) commands.push(['HINCRBY', `${keyPrefix}:events`, event, 1]);
      await redisCommand(commands);
      return respond(response, 202, { recorded: true });
    }

    return respond(response, 200, { configured: true, metrics: await readStats(day, month) });
  } catch (error) {
    console.error('Unable to read or write site statistics', error);
    return respond(response, 503, { error: 'Statistics service unavailable' });
  }
}

module.exports = handler;
