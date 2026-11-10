(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'AW-18365659298');

  let googleAdsLoaded = false;
  function loadGoogleAds() {
    if (googleAdsLoaded || document.querySelector('script[data-google-ads]')) return;
    googleAdsLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18365659298';
    script.dataset.googleAds = 'true';
    document.head.appendChild(script);
  }

  document.querySelectorAll('[data-menu]').forEach(function (navigation) {
    if (!navigation.querySelector('a[href="/stats.html"]')) {
      const statsLink = document.createElement('a');
      statsLink.href = '/stats.html';
      statsLink.textContent = 'สถิติเข้าชม';
      if (window.location.pathname === '/stats.html') {
        statsLink.setAttribute('aria-current', 'page');
      }
      navigation.appendChild(statsLink);
    }
  });

  document.querySelectorAll('.footer-links').forEach(function (footerLinks) {
    if (!footerLinks.querySelector('a[href="/stats.html"]')) {
      const statsLink = document.createElement('a');
      statsLink.href = '/stats.html';
      statsLink.textContent = 'สถิติเข้าชม';
      footerLinks.appendChild(statsLink);
    }
  });

  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  if (menuButton && menu) {
    function setMenuOpen(open) {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
    }

    menuButton.addEventListener('click', function () {
      setMenuOpen(!menu.classList.contains('open'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menu.classList.contains('open')) {
        setMenuOpen(false);
      }
    });
  }

  document.querySelectorAll('[data-compare]').forEach(function (frame) {
    const range = frame.querySelector('[data-compare-range]');
    if (!range) return;
    // --dx moves the handle with transform so the seam sweep is not counted as layout shift.
    // Width is cached from ResizeObserver so setPos never reads layout (no forced reflow).
    let width = 0, current = Number(range.value);
    function setPos(value) { current = Number(value); frame.style.setProperty('--pos', value + '%'); frame.style.setProperty('--dx', ((current - 50) / 100 * width) + 'px'); }
    if (window.ResizeObserver) new ResizeObserver(function (entries) { width = entries[0].contentRect.width; setPos(current); }).observe(frame);
    range.addEventListener('input', function () { setPos(range.value); });
    // One orchestrated moment: the seam sweeps from "before" to the middle once on load.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = 88, end = Number(range.value), duration = 1400;
    let t0 = null, touched = false;
    range.addEventListener('pointerdown', function () { touched = true; }, { once: true });
    range.addEventListener('keydown', function () { touched = true; }, { once: true });
    function tick(now) {
      if (touched) return;
      if (t0 === null) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setPos(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    setPos(start);
    setTimeout(function () { requestAnimationFrame(tick); }, 350);
  });

  // Tuck the floating LINE/phone buttons while the hero's own LINE/phone buttons are visible.
  const heroActions = document.querySelector('.aerial .actions');
  const floating = document.querySelector('.floating-contact');
  if (heroActions && floating && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      floating.classList.toggle('is-tucked', entries[0].isIntersecting);
    }).observe(heroActions);
  }

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  const projectToggles = document.querySelectorAll('[data-project-toggle], [data-project-preview]');
  const projectDetails = document.querySelector('[data-project-details]');

  if (projectToggles.length && projectDetails) {
    projectToggles.forEach(function (projectToggle) {
      projectToggle.addEventListener('click', function () {
      const open = projectDetails.classList.toggle('open');
      projectToggles.forEach(function (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
      });
      if (open) {
        projectDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    });
  }

  const conversionTargets = {
    phone: 'AW-18365659298/cerJCKXMwNwcEKLxtrVE',
    line: 'AW-18365659298/iHb8CLzkyNwcEKLxtrVE'
  };

  function reportAnalyticsEvent(name, data) {
    if (typeof window.va === 'function') {
      window.va('event', { name: name, data: data || {} });
    }
  }

  function recordSitePageView(eventName) {
    if (typeof window.fetch !== 'function') return;
    const payload = { page: window.location.pathname, event: eventName || '' };
    window.fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function () {});
  }

  function formatStat(value) {
    return new Intl.NumberFormat('th-TH').format(Number(value) || 0);
  }

  function renderStatsList(node, rows, labels, ordered) {
    if (!node) return 0;
    node.textContent = '';
    if (!rows.length) {
      const empty = document.createElement('li');
      empty.className = 'stats-empty';
      empty.textContent = 'ยังไม่มีข้อมูล';
      node.appendChild(empty);
      return 0;
    }
    rows.forEach(function (row) {
      const item = document.createElement('li');
      const label = document.createElement('span');
      const count = document.createElement('strong');
      label.textContent = labels[row.name] || row.name;
      count.textContent = formatStat(row.count);
      item.append(label, count);
      node.appendChild(item);
    });
    return rows.reduce(function (sum, row) { return sum + (Number(row.count) || 0); }, 0);
  }

  function loadStatsDashboard() {
    const dashboard = document.querySelector('[data-stats-dashboard]');
    if (!dashboard || typeof window.fetch !== 'function') return;
    const status = document.querySelector('[data-stats-status]');
    const refresh = document.querySelector('[data-stats-refresh]');
    const pageList = document.querySelector('[data-stats-pages]');
    const eventList = document.querySelector('[data-stats-events]');
    const pageLabels = {
      '/': 'หน้าหลัก',
      '/work.html': 'ผลงาน',
      '/roof-painting.html': 'บริการงานหลังคา',
      '/contact.html': 'ติดต่อเรา',
      '/stats.html': 'สถิติเข้าชม'
    };
    const eventLabels = {
      contact_click: 'คลิกช่องทางติดต่อ',
      cta_click: 'คลิกปุ่มสำคัญ'
    };

    function load() {
      if (status) status.textContent = 'กำลังโหลดข้อมูล...';
      if (refresh) refresh.disabled = true;
      window.fetch('/api/stats', { cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('Statistics request failed');
          return response.json();
        })
        .then(function (result) {
          if (!result.configured || !result.metrics) {
            if (status) status.textContent = 'รอเชื่อมต่อฐานข้อมูล';
            return;
          }
          const metrics = result.metrics;
          const total = dashboard.querySelector('[data-stat="total"]');
          const today = dashboard.querySelector('[data-stat="today"]');
          const month = dashboard.querySelector('[data-stat="month"]');
          const contact = dashboard.querySelector('[data-stat="contact"]');
          if (total) total.textContent = formatStat(metrics.total);
          if (today) today.textContent = formatStat(metrics.today);
          if (month) month.textContent = formatStat(metrics.month);
          if (contact) contact.textContent = formatStat((metrics.events || []).reduce(function (sum, row) { return sum + (Number(row.count) || 0); }, 0));
          renderStatsList(pageList, metrics.pages || [], pageLabels, true);
          renderStatsList(eventList, metrics.events || [], eventLabels, false);
          if (status) status.textContent = 'อัปเดตแล้ว';
        })
        .catch(function () {
          if (status) status.textContent = 'ไม่สามารถโหลดข้อมูลได้';
        })
        .finally(function () {
          if (refresh) refresh.disabled = false;
        });
    }

    if (refresh) refresh.addEventListener('click', load);
    load();
  }

  recordSitePageView();
  loadStatsDashboard();

  function getLinkLocation(link) {
    if (link.closest('.floating-contact')) return 'floating-contact';
    if (link.closest('.site-header')) return 'header';
    if (link.closest('.site-footer')) return 'footer';
    if (link.closest('.cta-band')) return 'cta-band';
    return 'page';
  }

  function reportConversion(sendTo, url, navigateAfterReport) {
    loadGoogleAds();

    let navigated = false;
    const navigate = function () {
      if (navigateAfterReport && !navigated) {
        navigated = true;
        window.location.href = url;
      }
    };

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'THB',
      event_callback: navigate,
      event_timeout: 800
    });

    if (navigateAfterReport) {
      window.setTimeout(navigate, 700);
    }

    return true;
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) {
      return;
    }

    const href = link.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      recordSitePageView('contact_click');
      reportAnalyticsEvent('contact_click', {
        method: 'phone',
        location: getLinkLocation(link)
      });
      if (reportConversion(conversionTargets.phone, href, true)) {
        event.preventDefault();
      }
      return;
    }

    if (href.indexOf('https://line.me/ti/p/~den432524') === 0) {
      recordSitePageView('contact_click');
      reportAnalyticsEvent('contact_click', {
        method: 'line',
        location: getLinkLocation(link)
      });
      reportConversion(conversionTargets.line, href, false);
      return;
    }

    if (link.classList.contains('button')) {
      recordSitePageView('cta_click');
      reportAnalyticsEvent('cta_click', {
        target: href,
        location: getLinkLocation(link)
      });
    }
  });
})();
