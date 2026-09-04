(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  if (menuButton && menu) {
    function setMenuOpen(open) {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
      menuButton.textContent = open ? '×' : '☰';
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
        const symbol = toggle.querySelector('b');
        if (symbol) {
          symbol.textContent = open ? '−' : '＋';
        }
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

  function reportConversion(sendTo, url, navigateAfterReport) {
    if (typeof window.gtag !== 'function') {
      return false;
    }

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
      if (reportConversion(conversionTargets.phone, href, true)) {
        event.preventDefault();
      }
      return;
    }

    if (href.indexOf('https://line.me/ti/p/~den432524') === 0) {
      reportConversion(conversionTargets.line, href, false);
    }
  });
})();
