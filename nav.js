(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header') || document.querySelector('.navbar-overlay');
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const closeBtn = document.getElementById('mobileNavClose');
    const drawerBackdrop = document.getElementById('mobileNavBackdrop');
    const cartCountEls = document.querySelectorAll('.nav-cart-count');
    const dropdown = document.getElementById('navAccountDropdown');
    const dropdownTrigger = document.getElementById('navDropdownTrigger');

    function onScroll() {
      if (!header) return;
      if (window.scrollY > 20) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('is-open');
      if (toggleBtn) {
        toggleBtn.classList.add('is-active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.classList.add('nav-drawer-open');
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      if (toggleBtn) {
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('nav-drawer-open');
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (drawer && drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    let dropdownTimer = null;

    function openDropdown() {
      if (!dropdown) return;
      clearTimeout(dropdownTimer);
      dropdown.classList.add('is-open');
      if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      if (!dropdown) return;
      dropdownTimer = setTimeout(function () {
        dropdown.classList.remove('is-open');
        if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    if (dropdown && dropdownTrigger) {
      dropdownTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (dropdown.classList.contains('is-open')) {
          dropdown.classList.remove('is-open');
          dropdownTrigger.setAttribute('aria-expanded', 'false');
        } else {
          openDropdown();
        }
      });

      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);
    }

    document.addEventListener('click', function (e) {
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (drawer && drawer.classList.contains('is-open')) closeDrawer();
        if (dropdown && dropdown.classList.contains('is-open')) {
          dropdown.classList.remove('is-open');
          if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
      }
    });

    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeDrawer();
        });
      });
    }

    function updateCartBadge() {
      try {
        const raw = localStorage.getItem('saffron_order_cart');
        if (!raw) {
          cartCountEls.forEach(function (el) {
            el.textContent = '0';
            el.classList.remove('has-items');
          });
          return;
        }
        const cart = JSON.parse(raw);
        let total = 0;
        if (Array.isArray(cart)) {
          total = cart.reduce(function (sum, item) {
            return sum + (Number(item.quantity) || 1);
          }, 0);
        } else if (typeof cart === 'object' && cart !== null) {
          total = Object.values(cart).reduce(function (sum, qty) {
            return sum + (Number(qty) || 1);
          }, 0);
        }
        cartCountEls.forEach(function (el) {
          el.textContent = total > 99 ? '99+' : String(total);
          if (total > 0) {
            el.classList.add('has-items');
          } else {
            el.classList.remove('has-items');
          }
        });
      } catch (err) {}
    }

    updateCartBadge();
    window.addEventListener('storage', updateCartBadge);
    window.addEventListener('cartUpdated', updateCartBadge);

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash || '';

    document.querySelectorAll('.nav-menu-list a, .mobile-drawer-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      link.classList.remove('active');

      const parts = href.split('#');
      const targetPage = parts[0].split('/').pop() || (parts[0] === '' ? currentPath : 'index.html');
      const targetHash = parts[1] ? '#' + parts[1] : '';

      const isCurrentPage = (targetPage === currentPath) || (currentPath === '' && targetPage === 'index.html');

      if (targetHash) {
        if (isCurrentPage && currentHash === targetHash) {
          link.classList.add('active');
        }
      } else {
        if (isCurrentPage && (!currentHash || currentHash === '#home')) {
          link.classList.add('active');
        }
      }
    });

    if (currentPath === 'auth.html' && dropdownTrigger) {
      dropdownTrigger.classList.add('active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
