/**
 * The Saffron Plate — Unified Navigation & Mobile Drawer
 * Provides scroll-aware glassmorphism, responsive drawer, active state, and live cart syncing.
 */
(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header') || document.querySelector('.navbar-overlay');
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const closeBtn = document.getElementById('mobileNavClose');
    const drawerBackdrop = document.getElementById('mobileNavBackdrop');
    const cartCountEls = document.querySelectorAll('.nav-cart-count');

    // 1. Scroll effect for glassmorphic transition
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

    // 2. Mobile drawer open / close
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

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeDrawer();
        });
      });
    }

    // 3. Sync live cart badge count with localStorage
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
      } catch (err) {
        // no-op
      }
    }

    updateCartBadge();
    window.addEventListener('storage', updateCartBadge);
    window.addEventListener('cartUpdated', updateCartBadge);

    // 4. Mark active link automatically based on location
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu-list a, .mobile-drawer-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.split('#')[0].split('/').pop();
      if (cleanHref && (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
