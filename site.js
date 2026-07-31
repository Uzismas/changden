(function () {
  const phoneUrl = 'tel:0956862586';
  // Placeholder LINE ID until the shop sets up a real LINE OA — swap @changden for the real one.
  const lineUrl = 'https://line.me/R/ti/p/%40changden';

  document.querySelectorAll('img[alt*="Logo"]').forEach((image) => {
    image.src = 'assets/logo.webp';
    image.closest('a')?.setAttribute('href', '/');
  });

  document.querySelectorAll('img[src*="qrserver"]').forEach((image) => image.remove());

  const sharedStyle = document.createElement('style');
  sharedStyle.textContent = `
    nav { position: relative; }
    nav > div:first-child { min-height: 5.25rem; box-sizing: border-box; }
    nav .site-brand-link { display: inline-flex !important; align-items: center; justify-content: center; width: 5.75rem; height: 4rem; }
    nav .site-brand-logo { display: block; width: 5.75rem !important; height: 4rem !important; object-fit: contain; }
    nav .site-nav-tabs { display: flex; align-items: center; gap: .5rem !important; }
    nav .site-nav-tab { display: inline-flex !important; align-items: center; justify-content: center; width: 6.5rem; height: 2.75rem !important; min-height: 2.75rem; padding: 0 .75rem; box-sizing: border-box; border-bottom: 0 !important; }
    nav .site-nav-tab.is-current { border-bottom: 2px solid currentColor !important; padding-bottom: .25rem !important; }
    nav .line-action, nav .phone-action { display: inline-flex !important; align-items: center; justify-content: center; width: 2.75rem !important; height: 2.75rem !important; min-width: 2.75rem; padding: 0 !important; box-sizing: border-box; overflow: hidden; border-radius: .75rem; }
    nav .line-action img { width: 100% !important; height: 100% !important; object-fit: cover; }
    nav .phone-action .material-symbols-outlined { font-size: 1.25rem; }
    main .phone-action { width: 2.75rem !important; height: 2.75rem !important; min-width: 2.75rem; padding: 0 !important; overflow: hidden; }
    main .phone-action .material-symbols-outlined { font-size: 1.25rem; }
    .phone-action .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    a[href^="tel:"]::before { content: none !important; }
    footer a[href^="tel:"] { width: auto !important; height: auto !important; min-width: 0 !important; padding: 0 !important; overflow: visible !important; font-size: inherit !important; }
    .contact-detail-action { display: inline-flex; align-items: center; gap: .75rem; }
    .contact-detail-action[href^="tel:"] { width: auto !important; height: auto !important; padding: 0 !important; overflow: visible !important; font-size: inherit !important; }
    .contact-detail-action .contact-detail-icon { display: inline-flex; width: 2.75rem; height: 2.75rem; align-items: center; justify-content: center; flex: 0 0 2.75rem; overflow: hidden; border-radius: .75rem; }
    .contact-detail-action .contact-detail-icon img { width: 100%; height: 100%; object-fit: cover; }
    .mobile-site-menu { display: none; }
    html { overflow-y: scroll; scrollbar-gutter: stable; }
    @media (max-width: 767px) {
      nav > div:first-child { display: flex !important; align-items: center; justify-content: space-between; }
      nav .mobile-support-slot { display: none !important; }
      nav .site-brand-slot { display: flex !important; align-items: center; justify-content: flex-start !important; flex: 0 0 auto !important; order: 1; }
      nav .mobile-toggle-slot { display: flex !important; align-items: center; justify-content: flex-end !important; flex: 0 0 auto !important; order: 2; }
      nav .mobile-menu-toggle { display: inline-flex !important; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem; padding: 0; }
      nav .site-brand-link { width: 4.75rem; height: 3.25rem; }
      nav .site-brand-logo { width: 4.75rem !important; height: 3.25rem !important; }
      nav .mobile-site-menu { position: absolute; top: 100%; left: 0; right: 0; display: grid; gap: .25rem; padding: .75rem 1rem 1rem; background: #ffffff; border-bottom: 1px solid rgba(0, 77, 153, .16); box-shadow: 0 10px 24px rgba(0, 0, 0, .12); opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-.5rem); transform-origin: top; transition: opacity .2s ease-out, transform .2s ease-out, visibility 0s linear .2s; }
      nav .mobile-site-menu.is-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); transition-delay: 0s; }
      nav .mobile-site-menu .site-nav-tab { width: 100% !important; justify-content: flex-start; }
    }
    @media (min-width: 768px) { nav .mobile-menu-toggle { display: none !important; } }
    @media (prefers-reduced-motion: reduce) { nav .mobile-site-menu { transition: none !important; transform: none !important; } }
  `;
  document.head.appendChild(sharedStyle);

  const nav = document.querySelector('nav');
  if (nav) {
    const navShell = nav.querySelector(':scope > div:first-child');
    navShell?.classList.add('site-nav-shell');
    nav.querySelector('img[alt*="Logo"]')?.classList.add('site-brand-logo');
    nav.querySelector('img[alt*="Logo"]')?.closest('a')?.classList.add('site-brand-link');
    nav.querySelector('.site-brand-link')?.parentElement?.classList.add('site-brand-slot');
    if (navShell) {
      Array.from(navShell.children).forEach((child) => {
        if (!child.classList.contains('site-brand-slot')) child.classList.add('mobile-support-slot');
      });
    }
  }

  document.querySelectorAll('a').forEach((link) => {
    const label = link.textContent.trim();
    if (label === 'หน้าหลัก') link.href = '/';
    if (label === 'ผลงาน') link.href = 'work.html';
    if (label === 'ติดต่อเรา') link.href = 'contact.html';
    if (link.closest('nav') && ['หน้าหลัก', 'ผลงาน', 'ติดต่อเรา'].includes(label)) link.classList.add('site-nav-tab');
    if (label.includes('LINE QR') || link.getAttribute('href')?.includes('#line-qr')) {
      link.href = lineUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.title = 'เพิ่มเพื่อนใน LINE';
      link.innerHTML = '<img src="assets/LINE_logo.webp" alt="" class="h-5 w-5 object-contain"><span class="sr-only">เพิ่มเพื่อนใน LINE</span>';
      link.classList.add('line-action', 'inline-flex', 'items-center', 'justify-center');
    }
  });

  const pageName = location.pathname.toLowerCase().includes('work.html') ? 'work.html' : location.pathname.toLowerCase().includes('contact.html') ? 'contact.html' : '/';
  document.querySelectorAll('nav .site-nav-tab').forEach((link) => {
    const isCurrent = link.getAttribute('href') === pageName;
    link.classList.toggle('is-current', isCurrent);
    link.classList.toggle('text-primary', isCurrent);
    link.classList.toggle('text-on-surface-variant', !isCurrent);
  });

  const navTabContainer = document.querySelector('nav .site-nav-tab')?.parentElement;
  navTabContainer?.classList.add('site-nav-tabs');

  document.querySelectorAll('nav a[href^="tel:"]').forEach((link) => {
    link.classList.add('phone-action');
    link.setAttribute('aria-label', 'โทร 095-686-2586');
    link.setAttribute('title', 'โทร 095-686-2586');
    link.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">call</span><span class="sr-only">โทร 095-686-2586</span>';
  });

  if (nav) {
    const mobileToggle = Array.from(nav.querySelectorAll('button')).find((button) => button.classList.contains('md:hidden'));
    const navLinks = Array.from(nav.querySelectorAll('a.site-nav-tab'));
    if (mobileToggle && navLinks.length) {
      mobileToggle.classList.add('mobile-menu-toggle');
      mobileToggle.parentElement?.classList.remove('mobile-support-slot');
      mobileToggle.parentElement?.classList.add('mobile-toggle-slot');
      mobileToggle.setAttribute('type', 'button');
      mobileToggle.setAttribute('aria-label', 'เปิดเมนู');
      mobileToggle.setAttribute('aria-expanded', 'false');

      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-site-menu';
      mobileMenu.setAttribute('aria-hidden', 'true');
      navLinks.forEach((link) => {
        const clone = link.cloneNode(true);
        clone.classList.remove('hidden');
        mobileMenu.appendChild(clone);
      });
      nav.appendChild(mobileMenu);

      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        if (icon) icon.textContent = isOpen ? 'close' : 'menu';
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('is-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.setAttribute('aria-label', 'เปิดเมนู');
          mobileMenu.setAttribute('aria-hidden', 'true');
          if (icon) icon.textContent = 'menu';
        });
      });
    }
  }

  const lineBlock = document.getElementById('line-qr');
  if (lineBlock) {
    lineBlock.innerHTML = `<a class="contact-detail-action font-body-lg text-body-lg font-bold" href="${lineUrl}" target="_blank" rel="noopener" title="เพิ่มเพื่อนใน LINE"><span class="contact-detail-icon"><img src="assets/LINE_logo.webp" alt="LINE"></span><span><small class="block font-label-md text-label-md text-on-surface-variant">LINE ID</small>@changden</span></a>`;
  }

  const phoneId = Array.from(document.querySelectorAll('p')).find((node) => node.textContent.trim() === '095-686-2586');
  if (phoneId) {
    const phoneBlock = phoneId.parentElement?.parentElement;
    if (phoneBlock) {
      phoneBlock.innerHTML = `<a class="contact-detail-action font-body-lg text-body-lg font-bold" href="${phoneUrl}"><span class="contact-detail-icon bg-primary text-white"><span class="material-symbols-outlined">call</span></span><span><small class="block font-label-md text-label-md text-on-surface-variant">เบอร์โทรศัพท์</small>095-686-2586</span></a>`;
    }
  }

  const contactHeading = Array.from(document.querySelectorAll('h1')).find((node) => node.textContent.trim() === 'ติดต่อเรา');
  if (contactHeading) {
    const subtitle = contactHeading.parentElement?.querySelector('p');
    subtitle?.remove();
  }

  const makeLink = (element, href, external) => {
    if (element.tagName.toLowerCase() === 'a') {
      element.href = href;
      if (external) {
        element.target = '_blank';
        element.rel = 'noopener';
      }
      return element;
    }
    const link = document.createElement('a');
    link.className = element.className;
    link.innerHTML = element.innerHTML;
    link.href = href;
    if (external) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    element.replaceWith(link);
    return link;
  };

  document.querySelectorAll('button, a').forEach((element) => {
    const label = element.textContent.trim();
    if (label.includes('ดูทั้งหมด') || label.includes('ดูผลงาน')) makeLink(element, 'work.html');
    if (label.startsWith('ติดต่อเรา') && element.tagName.toLowerCase() === 'button') makeLink(element, 'contact.html');
  });

  const footer = document.querySelector('footer');
  if (footer) {
    footer.outerHTML = `
      <footer class="full-width bg-surface-container-lowest border-t border-outline-variant">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-7xl mx-auto">
          <div class="md:col-span-5">
            <div class="font-headline-md text-headline-md font-bold text-primary mb-3">ช่างเด่น</div>
            <p class="font-body-md text-on-surface-variant max-w-md">ทีมงานมืออาชีพสำหรับงานทาสี งานหลังคา และงานเคลือบผิว ให้บริการกรุงเทพฯ และปริมณฑล</p>
          </div>
          <div class="md:col-span-3 md:col-start-7">
            <p class="font-label-lg text-primary mb-3">เมนูหลัก</p>
            <div class="flex flex-col gap-3 font-body-md">
              <a class="text-on-surface-variant hover:text-primary" href="/">หน้าหลัก</a>
              <a class="text-on-surface-variant hover:text-primary" href="roof-painting.html">รับทาสีหลังคาบ้าน</a>
              <a class="text-on-surface-variant hover:text-primary" href="work.html">ผลงาน</a>
              <a class="text-on-surface-variant hover:text-primary" href="contact.html">ติดต่อเรา</a>
            </div>
          </div>
          <div class="md:col-span-3">
            <p class="font-label-lg text-primary mb-3">ติดต่อ</p>
            <div class="flex flex-col gap-3 font-body-md">
              <a class="inline-flex items-center gap-3 text-on-surface-variant hover:text-primary" href="${lineUrl}" target="_blank" rel="noopener" title="เพิ่มเพื่อนใน LINE"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"><img src="assets/LINE_logo.webp" alt="LINE" class="h-full w-full object-cover"></span><span>LINE ID: @changden</span></a>
              <a class="footer-contact-link inline-flex items-center gap-3 text-on-surface-variant hover:text-primary" href="${phoneUrl}" title="โทร 095-686-2586"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"><span class="material-symbols-outlined" aria-hidden="true">call</span></span><span>โทร 095-686-2586</span></a>
              <a class="inline-flex items-center gap-3 text-on-surface-variant hover:text-primary" href="mailto:changden.official@gmail.com" title="อีเมล changden.official@gmail.com"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"><span class="material-symbols-outlined" aria-hidden="true">mail</span></span><span>changden.official@gmail.com</span></a>
            </div>
          </div>
          <div class="md:col-span-12 border-t border-outline-variant/30 pt-5 mt-2 text-center md:text-left">
            <p class="font-body-md text-on-surface-variant opacity-70">© 2026 ช่างเด่น. All rights reserved.</p>
          </div>
        </div>
      </footer>`;
  }

  // Fade sections in as they scroll into view
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-10');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    revealObserver.observe(section);
  });
})();
