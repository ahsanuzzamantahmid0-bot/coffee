/* main.js - preloader + UI interactions (no reveal animations) */

// ----- HELPERS -----
const safe = fn => { try { fn(); } catch (e) { console.error(e); } };

// ----- PRELOADER -----
safe(() => {
  const preloader = document.querySelector('.preloader');
  const removePreloader = () => {
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(() => {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 600);
  };

  window.addEventListener('load', removePreloader, { once: true });
  window.addEventListener('DOMContentLoaded', removePreloader, { once: true });
  setTimeout(removePreloader, 3000);

  if (preloader) {
    preloader.addEventListener('click', removePreloader);
  }
});

// ----- NAVBAR SCROLL EFFECT -----
safe(() => {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 70) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

// ----- SMOOTH SCROLL FOR ANCHORS -----
safe(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
});

// ----- MOBILE MENU TOGGLE -----
safe(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('active');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', (!expanded).toString());
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('open');
    nav.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }));
});

// ----- PARALLAX -----
safe(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.backgroundPosition = `center ${Math.round(y * 0.4)}px`;
  }, { passive: true });
});

// ----- CONTACT FORM -----
safe(() => {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    if (btn) {
      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        btn.textContent = 'Sent!';
        form.reset();
        setTimeout(() => { btn.textContent = prev; btn.disabled = false; }, 1400);
      }, 900);
    }
  });
});
