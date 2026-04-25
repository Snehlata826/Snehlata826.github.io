/* ═══════════════════════════════════════════
   SNEHLATA KUMARI PORTFOLIO — script.js
═══════════════════════════════════════════ */

(function () {
  'use strict';

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
    '.skill-group, .timeline-item, .project-card, .proj-row, .edu-card, .ach-card, .contact-item, .stat-card, .section-title, .section-sub, .contact-profile-box'
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

  /* ═══════════════════════════════════════════
     HOVER GLOW EFFECTS
     Smooth lift + rising colored glow shadow
     on all interactive card/tag/button elements
  ═══════════════════════════════════════════ */

  /* ── Glow color map by element type ── */
  const glowMap = [
    /* Project cards (new alternating layout) */
    {
      selector: '.proj-row',
      color: 'rgba(26, 86, 219, 0.18)',
      lift: -6,
      scale: 1.005,
      shadow: '0 8px 16px rgba(0,0,0,.06), 0 20px 48px rgba(26,86,219,.14), 0 2px 4px rgba(0,0,0,.04)'
    },
    /* Old project cards (grid layout fallback) */
    {
      selector: '.project-card',
      color: 'rgba(26, 86, 219, 0.16)',
      lift: -5,
      scale: 1.005,
      shadow: '0 8px 16px rgba(0,0,0,.07), 0 18px 44px rgba(26,86,219,.13)'
    },
    /* Skill groups */
    {
      selector: '.skill-group',
      color: 'rgba(6, 182, 212, 0.15)',
      lift: -4,
      scale: 1.008,
      shadow: '0 6px 14px rgba(0,0,0,.07), 0 14px 36px rgba(6,182,212,.13)'
    },
    /* Timeline / experience cards */
    {
      selector: '.timeline-body',
      color: 'rgba(26, 86, 219, 0.12)',
      lift: -4,
      scale: 1.003,
      shadow: '0 6px 18px rgba(0,0,0,.07), 0 14px 36px rgba(26,86,219,.1)'
    },
    /* Achievement cards */
    {
      selector: '.ach-card',
      color: 'rgba(16, 185, 129, 0.14)',
      lift: -4,
      scale: 1.008,
      shadow: '0 6px 16px rgba(0,0,0,.07), 0 14px 32px rgba(16,185,129,.12)'
    },
    /* Education card */
    {
      selector: '.edu-card',
      color: 'rgba(26, 86, 219, 0.14)',
      lift: -5,
      scale: 1.003,
      shadow: '0 8px 24px rgba(0,0,0,.08), 0 20px 48px rgba(26,86,219,.12)'
    },
    /* Contact profile boxes */
    {
      selector: '.contact-profile-box',
      color: 'rgba(59, 130, 246, 0.22)',
      lift: -3,
      scale: 1.012,
      shadow: '0 4px 12px rgba(0,0,0,.12), 0 10px 28px rgba(59,130,246,.2)'
    },
    /* Nav links */
    {
      selector: '.nav-links a',
      color: 'rgba(26, 86, 219, 0.08)',
      lift: -1,
      scale: 1.0,
      shadow: 'none'
    },
    /* Stat cards (hero) */
    {
      selector: '.stat-card',
      color: 'rgba(59, 130, 246, 0.2)',
      lift: -3,
      scale: 1.01,
      shadow: '0 4px 14px rgba(0,0,0,.1), 0 10px 28px rgba(59,130,246,.18)'
    },
  ];

  /* ── Apply lift+glow via JS for smooth per-element control ── */
  glowMap.forEach(({ selector, lift, scale, shadow }) => {
    document.querySelectorAll(selector).forEach(el => {
      /* Store original so we can restore it cleanly */
      const origTransition = el.style.transition || '';
      const origTransform  = el.style.transform  || '';
      const origShadow     = el.style.boxShadow   || '';

      el.style.transition = [
        'transform .28s cubic-bezier(.25,.8,.25,1)',
        'box-shadow .28s cubic-bezier(.25,.8,.25,1)',
        'border-color .28s ease',
        origTransition
      ].filter(Boolean).join(', ');

      el.addEventListener('mouseenter', () => {
        el.style.transform = `translateY(${lift}px) scale(${scale})`;
        if (shadow !== 'none') el.style.boxShadow = shadow;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = origTransform;
        el.style.boxShadow = origShadow;
      });
    });
  });

  /* ── Tag / badge hover: pop + blue glow ── */
  document.querySelectorAll('.tag, .proj-tech-chip, .result-badge').forEach(el => {
    el.style.transition = 'transform .2s cubic-bezier(.25,.8,.25,1), box-shadow .2s ease, background .2s ease';
    el.style.cursor = 'default';

    el.addEventListener('mouseenter', () => {
      el.style.transform  = 'translateY(-2px) scale(1.06)';
      el.style.boxShadow  = '0 4px 12px rgba(26,86,219,.2)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });

  /* ── Button hover: lift + colored glow ── */
  document.querySelectorAll(
    '.btn, .proj-btn, .project-link, .nav-cta, .quick-btn'
  ).forEach(el => {
    el.style.transition = [
      el.style.transition,
      'transform .2s cubic-bezier(.25,.8,.25,1)',
      'box-shadow .2s ease'
    ].filter(Boolean).join(', ');

    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-2px)';

      /* Pick glow color by button class */
      if (el.classList.contains('btn-primary') || el.classList.contains('proj-btn-demo') || el.classList.contains('nav-cta')) {
        el.style.boxShadow = '0 6px 20px rgba(26,86,219,.38)';
      } else if (el.classList.contains('proj-btn-live')) {
        el.style.boxShadow = '0 6px 20px rgba(16,185,129,.38)';
      } else if (el.classList.contains('demo-btn')) {
        el.style.boxShadow = '0 6px 20px rgba(16,185,129,.3)';
      } else if (el.classList.contains('live-link')) {
        el.style.boxShadow = '0 6px 20px rgba(16,185,129,.3)';
      } else {
        el.style.boxShadow = '0 4px 14px rgba(0,0,0,.15)';
      }
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });

  /* ── Social links in hero: glow on hover ── */
  document.querySelectorAll('.hero-socials a').forEach(el => {
    el.style.transition = 'color .2s ease, transform .2s ease, text-shadow .2s ease';
    el.addEventListener('mouseenter', () => {
      el.style.transform  = 'translateY(-2px)';
      el.style.textShadow = '0 0 12px rgba(147,197,253,.6)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform  = '';
      el.style.textShadow = '';
    });
  });

  /* ── Browser frame inside proj-row: extra lift ── */
  document.querySelectorAll('.browser-frame').forEach(el => {
    const card = el.closest('.proj-row');
    if (!card) return;
    card.addEventListener('mouseenter', () => {
      el.style.transition = 'transform .35s cubic-bezier(.25,.8,.25,1), box-shadow .35s ease';
      el.style.transform  = 'scale(1.018) translateY(-3px)';
      el.style.boxShadow  = '0 20px 60px rgba(0,0,0,.22), 0 4px 8px rgba(0,0,0,.1)';
    });
    card.addEventListener('mouseleave', () => {
      el.style.transform  = '';
      el.style.boxShadow  = '';
    });
  });

  /* ═══════════════════════════════════════════
     LEGAL AI MODAL
  ═══════════════════════════════════════════ */
  const openLegalBtn = document.getElementById('openLegalDemo');
  const closeLegalBtn= document.getElementById('closeModal');
  const legalModal   = document.getElementById('legalModal');
  const analyzeBtn   = document.getElementById('analyzeBtn');
  const legalText    = document.getElementById('legalText');
  const legalQ       = document.getElementById('legalQuestion');
  const outputArea   = document.getElementById('outputArea');
  const outputHdr    = document.getElementById('outputHeader');
  const copyBtn      = document.getElementById('copyResult');

  if (openLegalBtn) {
    openLegalBtn.addEventListener('click', () => {
      legalModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeLegalBtn) closeLegalBtn.addEventListener('click', closeLegalModal);
  if (legalModal) {
    legalModal.addEventListener('click', e => {
      if (e.target === legalModal) closeLegalModal();
    });
  }

  function closeLegalModal() {
    legalModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      legalQ.value = btn.dataset.q;
      legalQ.focus();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(outputArea.innerText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
      });
    });
  }

  if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeDocument);

  async function analyzeDocument() {
    const docText  = legalText.value.trim();
    const question = legalQ.value.trim();

    if (!docText) {
      legalText.style.borderColor = '#ef4444';
      legalText.focus();
      setTimeout(() => (legalText.style.borderColor = ''), 1800);
      outputArea.innerHTML = '<div style="padding:1rem"><p style="color:#ef4444;font-weight:600">⚠ Please paste a legal document first.</p></div>';
      return;
    }

    outputHdr.style.display = 'none';
    outputArea.innerHTML = '<div class="loading-state"><div class="spinner"></div><p class="loading-text">Analyzing with AI…</p><p class="loading-text" style="font-size:.8rem;color:#94a3b8">Identifying risks, clauses &amp; obligations</p></div>';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing…';

    const systemPrompt = `You are an expert legal document analyzer. Analyze legal documents and respond with these exact sections using ### headers:

### 📋 Document Summary
2-3 sentence plain-English overview.

### ⚖️ Key Clauses & Obligations
Bullet list of the most important rights and obligations for each party.

### ⚠️ Risk Assessment
For each risk start with [HIGH RISK], [MEDIUM RISK], or [LOW RISK] then explain clearly.

### 🔍 Unusual or One-Sided Clauses
Any non-standard or unfavorable clauses with explanation.

### ✅ Key Takeaways
3-5 practical bullet points of what the user should know or do.

Use plain language, avoid jargon, always recommend consulting a real attorney for important decisions.`;

    const userPrompt = question
      ? 'Here is the legal document:\n\n---\n' + docText + '\n---\n\nPlease analyze it and also specifically answer: "' + question + '"'
      : 'Here is the legal document:\n\n---\n' + docText + '\n---\n\nPlease analyze it fully.';

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || 'API error ' + response.status);
      }

      const data = await response.json();
      const raw  = data.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
      renderLegalOutput(raw);

    } catch (err) {
      outputArea.innerHTML = '<div style="padding:1rem"><h3 style="color:#ef4444;font-size:.95rem;margin-bottom:.5rem">⚠️ Error</h3><p style="font-size:.88rem;color:#64748b">' + err.message + '</p></div>';
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Analyze Document';
    }
  }

  function renderLegalOutput(text) {
    outputHdr.style.display = 'flex';
    let html = text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[HIGH RISK\]/g,   '<span class="risk-badge high">🔴 HIGH</span>')
      .replace(/\[MEDIUM RISK\]/g, '<span class="risk-badge medium">🟡 MEDIUM</span>')
      .replace(/\[LOW RISK\]/g,    '<span class="risk-badge low">🟢 LOW</span>')
      .replace(/^[-•*] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/gs, m => '<ul>' + m + '</ul>');

    html = html.split('\n').map(line => {
      line = line.trim();
      if (!line) return '';
      if (line.startsWith('<h3>') || line.startsWith('<ul>') || line.startsWith('<li>') || line.startsWith('</ul>')) return line;
      return '<p>' + line + '</p>';
    }).join('\n');

    outputArea.innerHTML = html;
    outputArea.scrollTop = 0;
  }

  /* ═══════════════════════════════════════════
     VIDEO DEMO MODAL
  ═══════════════════════════════════════════ */
  const videoModal    = document.getElementById('videoModal');
  const demoVideo     = document.getElementById('demoVideo');
  const demoSource    = document.getElementById('demoVideoSource');
  const videoTitleEl  = document.getElementById('videoTitle');
  const closeVideoBtn = document.getElementById('closeVideoModal');

  window.openVideo = function (src, title) {
    demoSource.src = src;
    videoTitleEl.textContent = title + ' — Live Demo';
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    demoVideo.load();
    demoVideo.play().catch(function () {});
  };

  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeVideoModal(); closeLegalModal(); }
  });

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    demoVideo.pause();
    demoSource.src = '';
    demoVideo.load();
    document.body.style.overflow = '';
  }

  /* ─── Footer year ─── */
  document.querySelectorAll('.footer-inner p').forEach(p => {
    p.innerHTML = p.innerHTML.replace(/© \d{4}/, '© ' + new Date().getFullYear());
  });

})();