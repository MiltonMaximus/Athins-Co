/* Athins & Co. — small site script (mobile nav + active link) */
(() => {
  'use strict';

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-nav');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.dataset.open = String(!open);
    });

    /* Close menu when a link is clicked (mobile UX) */
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 991px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.dataset.open = 'false';
      }
    });

    /* Reset state when crossing the desktop breakpoint */
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.dataset.open = 'false';
      }
    });
  }

  /* Highlight current page in nav */
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('#primary-nav a').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
