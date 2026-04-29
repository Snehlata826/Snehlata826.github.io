/* ═══════════════════════════════════════════
   SNEHLATA KUMARI PORTFOLIO — script.js
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── THEME TOGGLE ─── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  /* ─── NAVBAR ─── */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks   = document.querySelectorAll('.nav-links a');
  const sections   = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 110) cur = s.id; });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    });
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    })
  );

  /* ─── SCROLL REVEAL ─── */
  document.querySelectorAll(
    '.skill-group, .timeline-item, .proj-row, .edu-card, .ach-card, .stat-card, .section-title, .section-sub, .contact-profile-box'
  ).forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
      entry.target.style.transitionDelay = Math.min(idx * 55, 300) + 'ms';
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ─── TYPED HERO TITLE ─── */
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #93c5fd';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroTitle.textContent += text[i++];
        setTimeout(type, 65);
      } else {
        setTimeout(() => { heroTitle.style.borderRight = 'none'; }, 1000);
      }
    };
    setTimeout(type, 500);
  }

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ─── HOVER GLOW EFFECTS ─── */
  const glowMap = [
    { selector: '.proj-row', lift: -5, scale: 1.003, shadow: '0 8px 16px rgba(0,0,0,.08), 0 20px 48px rgba(26,86,219,.12)' },
    { selector: '.skill-group', lift: -4, scale: 1.008, shadow: '0 6px 14px rgba(0,0,0,.07), 0 14px 36px rgba(6,182,212,.11)' },
    { selector: '.timeline-body', lift: -4, scale: 1.003, shadow: '0 6px 18px rgba(0,0,0,.07), 0 14px 36px rgba(26,86,219,.08)' },
    { selector: '.ach-card', lift: -4, scale: 1.008, shadow: '0 6px 16px rgba(0,0,0,.07), 0 14px 32px rgba(16,185,129,.1)' },
    { selector: '.edu-card', lift: -5, scale: 1.003, shadow: '0 8px 24px rgba(0,0,0,.08), 0 20px 48px rgba(26,86,219,.1)' },
    { selector: '.contact-profile-box', lift: -3, scale: 1.012, shadow: '0 4px 12px rgba(0,0,0,.12), 0 10px 28px rgba(59,130,246,.18)' },
  ];

  glowMap.forEach(({ selector, lift, scale, shadow }) => {
    document.querySelectorAll(selector).forEach(el => {
      const origT = el.style.transition || '';
      el.style.transition = ['transform .28s cubic-bezier(.25,.8,.25,1)', 'box-shadow .28s cubic-bezier(.25,.8,.25,1)', origT].filter(Boolean).join(', ');
      el.addEventListener('mouseenter', () => {
        el.style.transform = `translateY(${lift}px) scale(${scale})`;
        if (shadow) el.style.boxShadow = shadow;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      });
    });
  });

  /* Tag hover */
  document.querySelectorAll('.tag, .proj-tech-chip').forEach(el => {
    el.style.transition = 'transform .2s cubic-bezier(.25,.8,.25,1), box-shadow .2s ease';
    el.style.cursor = 'default';
    el.addEventListener('mouseenter', () => { el.style.transform = 'translateY(-2px) scale(1.06)'; el.style.boxShadow = '0 4px 12px rgba(26,86,219,.18)'; });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.boxShadow = ''; });
  });

  /* Button hover */
  document.querySelectorAll('.btn, .proj-btn, .nav-cta').forEach(el => {
    el.style.transition = [el.style.transition, 'transform .2s cubic-bezier(.25,.8,.25,1)', 'box-shadow .2s ease'].filter(Boolean).join(', ');
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-2px)';
      if (el.classList.contains('btn-primary') || el.classList.contains('proj-btn-demo') || el.classList.contains('nav-cta')) {
        el.style.boxShadow = '0 6px 20px rgba(26,86,219,.38)';
      } else if (el.classList.contains('proj-btn-live')) {
        el.style.boxShadow = '0 6px 20px rgba(16,185,129,.38)';
      } else {
        el.style.boxShadow = '0 4px 14px rgba(0,0,0,.15)';
      }
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.boxShadow = ''; });
  });

  /* Hero socials */
  document.querySelectorAll('.hero-socials a').forEach(el => {
    el.style.transition = 'color .2s ease, transform .2s ease';
    el.addEventListener('mouseenter', () => { el.style.transform = 'translateY(-2px)'; });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ═══════════════════════════════════════════
     VIDEO MODAL — FULL-SIZE UNCROPPED
  ═══════════════════════════════════════════ */
  const videoModalOverlay = document.getElementById('videoModalOverlay');
  const videoModalPlayer  = document.getElementById('videoModalPlayer');
  const videoModalSource  = document.getElementById('videoModalSource');
  const videoModalTitle   = document.getElementById('videoModalTitle');
  const videoModalClose   = document.getElementById('videoModalClose');

  window.openVideoModal = function (src, title) {
    if (!videoModalOverlay) return;
    videoModalSource.src = src;
    videoModalTitle.textContent = title;
    videoModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoModalPlayer.load();
    videoModalPlayer.play().catch(() => {});
  };

  // Legacy support for old openVideo calls
  window.openVideo = window.openVideoModal;

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }
  if (videoModalOverlay) {
    videoModalOverlay.addEventListener('click', e => {
      if (e.target === videoModalOverlay) closeVideoModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeVideoModal();
  });

  function closeVideoModal() {
    if (!videoModalOverlay) return;
    videoModalOverlay.classList.remove('open');
    videoModalPlayer.pause();
    videoModalSource.src = '';
    videoModalPlayer.load();
    document.body.style.overflow = '';
  }

  /* ─── Footer year ─── */
  document.querySelectorAll('.footer-inner p').forEach(p => {
    p.innerHTML = p.innerHTML.replace(/© \d{4}/, '© ' + new Date().getFullYear());
  });

})();