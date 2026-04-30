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

  /* ─── CURSOR AURA ─── */
  const aura = document.getElementById('cursor-aura');
  if (aura && window.matchMedia('(pointer: fine)').matches) {
    // Dark mode: vivid but lighter; Light mode: softer tones for multiply blend
    const darkColors = [
      'rgba(59,130,246,0.55)',    // blue
      'rgba(6,182,212,0.52)',     // cyan / accent
      'rgba(99,102,241,0.50)',    // indigo
    ];
    const lightColors = [
      'rgba(59,130,246,0.45)',    // blue
      'rgba(6,182,212,0.40)',     // cyan
      'rgba(99,102,241,0.42)',    // indigo
    ];

    function getColors() {
      return html.getAttribute('data-theme') === 'light' ? lightColors : darkColors;
    }

    let colorIdx = 0;
    let colorTimer = null;
    let ax = window.innerWidth / 2, ay = window.innerHeight / 2;
    let cx = ax, cy = ay;

    // Smoothly lerp the aura toward cursor
    function animateAura() {
      cx += (ax - cx) * 0.1;
      cy += (ay - cy) * 0.1;
      aura.style.left = cx + 'px';
      aura.style.top  = cy + 'px';
      requestAnimationFrame(animateAura);
    }
    animateAura();

    function applyColor() {
      aura.style.background = getColors()[colorIdx];
    }
    applyColor();

    // Cycle colour every 2.2 s
    function cycleColor() {
      colorIdx = (colorIdx + 1) % darkColors.length;
      applyColor();
      colorTimer = setTimeout(cycleColor, 2200);
    }
    colorTimer = setTimeout(cycleColor, 2200);

    // Re-apply color when theme switches
    if (themeToggle) {
      themeToggle.addEventListener('click', () => setTimeout(applyColor, 50));
    }

    // Track cursor
    document.addEventListener('mousemove', e => {
      ax = e.clientX;
      ay = e.clientY;
    }, { passive: true });

    // Hide when cursor leaves window
    document.addEventListener('mouseleave', () => { aura.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      aura.style.opacity = isLight ? '0.28' : '0.38';
    });
  }

  /* ═══════════════════════════════════════════
     AI CHATBOT WIDGET
  ═══════════════════════════════════════════ */
  (function initChatbot() {
    const widget   = document.getElementById('aiChatWidget');
    const fab      = document.getElementById('aiChatFab');
    const minimize = document.getElementById('aiChatMinimize');
    const messages = document.getElementById('aiChatMessages');
    const input    = document.getElementById('aiChatInput');
    const sendBtn  = document.getElementById('aiChatSend');
    const suggestions = document.getElementById('aiSuggestions');
    if (!widget || !fab) return;

    /* ── Toggle open / closed ── */
    function openChat() {
      widget.classList.add('open');
      fab.setAttribute('aria-label', 'Close chat');
      setTimeout(() => input && input.focus(), 320);
    }
    function closeChat() {
      widget.classList.remove('open');
      fab.setAttribute('aria-label', 'Open chat');
    }

    fab.addEventListener('click', () => {
      widget.classList.contains('open') ? closeChat() : openChat();
    });
    if (minimize) minimize.addEventListener('click', closeChat);

    /* ── Knowledge base ── */
    const KB = {
      projects: `🚀 **Snehlata's Featured Projects:**

**1. LexAnalyze — Legal Intelligence & XAI** *(Live)*
   • ML Ensemble (LogReg + RF) → 89.6% accuracy
   • SHAP word-level attribution for risk flags
   • LLaMA 3 via Groq for clause simplification (RAG)
   • Stack: Scikit-Learn, FastAPI, SHAP | Jan–Mar 2025

**2. Stock MLOps — Drift-Aware Pipeline** *(Live)*
   • MLflow experiment registry + Walk-Forward Validation
   • Evidently AI real-time drift dashboard
   • Automated retraining triggers
   • Stack: XGBoost, MLflow, Docker | Apr–May 2025

**3. Scientific RAG — GenAI Copilot** *(Research Preview)*
   • Hybrid Search: FAISS + BM25 with cross-encoder reranking
   • Mistral-7B generation with citation tracing
   • Hallucination risk scoring via RAGAS
   • Stack: LangChain, FAISS, Mistral-7B | Jan–Feb 2026`,

      experience: `💼 **Work Experience:**

**Software Developer Intern @ Owision** *(Sep–Dec 2025)*
   • Built scalable FastAPI backends + Stripe APIs
   • Increased reporting efficiency by 25%
   • Reduced production integration errors by 30%
   • Containerized services with Docker

**AI/ML Research Intern @ NIT Bhopal** *(Jun–Jul 2025)*
   • Vision Transformer (ViT) for satellite imagery
   • Trained on 10,000+ samples → 93.6% accuracy
   • Optimized inference by 20% via Semi-Supervised Learning
   • Authored XAI documentation with attention map visualizations`,

      skills: `🧠 **Technical Skills:**

**Programming & Core:** Python, SQL, C, MongoDB, Git, REST APIs

**Generative AI & LLMs:** LLaMA 3.x, Mistral, GPT-4o, Claude 3.5, RAG Pipelines, LangChain, LlamaIndex, FAISS, RAGAS

**Deep Learning & CV:** PyTorch, TensorFlow, Vision Transformers (ViT), CNNs, Transfer Learning, OpenCV

**MLOps & Infrastructure:** MLflow, Docker, AWS (EC2, S3), FastAPI, Streamlit, CI/CD Pipelines

**Data Science:** Pandas, NumPy, Scikit-learn, XGBoost, Feature Engineering, Matplotlib, Seaborn

**Domains:** GeoSpatial AI, Explainable AI (XAI), Legal Tech NLP, Semantic Search, Prompt Engineering`,

      achievements: `🏆 **Achievements & Leadership:**

🥈 **Runner-Up – ECOHACK Hackathon 2026** (120+ teams)
🎓 **Aspire Leadership Program** (Harvard-founded, fully funded)
💡 **Herbalife Scholar 2025** – Merit-based scholarship (top 5% cohort)
🇮🇳 **Smart India Hackathon 2025** – Round 1 Cleared
📋 **Event Lead** – Developer Summit 2.0 & Circus of Clues (200+ participants)
💻 **500+ DSA Problems** solved on LeetCode & GeeksforGeeks`,

      education: `🎓 **Education:**

**B.Tech — Computer Science & Engineering**
   Silicon University · Bhubaneswar, Odisha
   Sep 2023 – Present (3rd Year)
   CGPA: **9.25 / 10.0** 🌟

Relevant Coursework: Machine Learning, Data Structures & Algorithms, Database Management, Statistics & Probability, Deep Learning, Natural Language Processing`,

      contact: `📬 **Contact & Profiles:**

📧 Email: kumarisnehlata2005@gmail.com
💼 LinkedIn: linkedin.com/in/snehlata-kumari-b68285299
🐙 GitHub: github.com/Snehlata826
💻 LeetCode: leetcode.com/u/23bced40
🟢 GeeksforGeeks: geeksforgeeks.org/profile/kumarisneh1ryw

📍 Based in Bhubaneswar, India
🗓️ Available from **July 2026** for full-time roles (open to remote)`,

      availability: `🗓️ Snehlata is **available from July 2026** for full-time roles as a Data Scientist or ML Engineer. She's based in Bhubaneswar, India and open to remote opportunities worldwide. Feel free to reach out at kumarisnehlata2005@gmail.com!`,

      about: `👩‍💻 **About Snehlata Kumari:**

She's a 3rd-year B.Tech CSE student at Silicon University with a CGPA of 9.25/10, specializing in Generative AI, Computer Vision, and MLOps.

Key highlights:
• Built a 93.6%-accurate satellite imagery classifier using Vision Transformers at NIT Bhopal
• Interned as Software Developer at Owision, building production FastAPI backends
• Runner-Up at ECOHACK Hackathon 2026
• Selected for the Aspire Leadership Program (Harvard-founded)
• 500+ DSA problems solved

She turns research into deployable, production-grade ML systems! 🚀`,

      fallback: `I can tell you about Snehlata's **projects**, **experience**, **skills**, **education**, **achievements**, and **contact info**. What would you like to know? You can also ask things like:
   • "What's her best project?"
   • "Where can I find her resume?"
   • "Is she available for hire?"`,
    };

    /* ── Match user query to KB ── */
    function getResponse(q) {
      const lq = q.toLowerCase();
      if (/proj|lexanalyz|stock|mlops|rag|scientific|legal|legal ai/i.test(lq)) return KB.projects;
      if (/skill|tech|stack|language|tool|pytorch|python|llm|genai|ml|ai|framework/i.test(lq)) return KB.skills;
      if (/exp|intern|work|job|owision|nit|bhopal|role|career/i.test(lq)) return KB.experience;
      if (/achiev|award|hack|ecohack|aspire|herbalife|sia|sih|dsa|leetcode|gfg/i.test(lq)) return KB.achievements;
      if (/edu|study|college|universit|silicon|cgpa|grade|course/i.test(lq)) return KB.education;
      if (/contact|email|linkedin|github|reach|hire|message|dm|social/i.test(lq)) return KB.contact;
      if (/availab|when|start|hire|open|full.?time|remote|relocat/i.test(lq)) return KB.availability;
      if (/who|about|yourself|introduc|tell me about her|overview/i.test(lq)) return KB.about;
      if (/resum|cv|download/i.test(lq)) return '📄 You can download Snehlata\'s resume directly from the portfolio! Click the **"Download Resume"** button in the hero section or contact section. It\'s also linked at: snehlata826.github.io';
      if (/hello|hi|hey|greet|good morning|good afternoon|good evening/i.test(lq)) return '👋 Hello! Great to meet you! I\'m here to help you learn all about Snehlata Kumari — AI/ML Engineer, hackathon winner, and all-round tech powerhouse. What would you like to know?';
      if (/thank|thanks|appreciate|awesome|great|cool|nice/i.test(lq)) return '😊 You\'re welcome! Feel free to ask anything else about Snehlata. I\'m always here to help!';
      return KB.fallback;
    }

    /* ── Render markdown-style text as HTML ── */
    function renderMarkdown(text) {
      // Convert **bold** to <strong>
      let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Convert *italic* to <em>
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Convert lines starting with • or - to list items
      const lines = html.split('\n');
      let result = '';
      let inList = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isBullet = /^[\s]*[•\-]\s/.test(line);
        if (isBullet) {
          if (!inList) { result += '<ul class="ai-list">'; inList = true; }
          result += '<li>' + line.replace(/^[\s]*[•\-]\s/, '') + '</li>';
        } else {
          if (inList) { result += '</ul>'; inList = false; }
          if (line.trim() === '') {
            result += '<br>';
          } else if (/^\d+\.\s/.test(line)) {
            result += '<p class="ai-num-item">' + line + '</p>';
          } else if (line.trim().startsWith('🚀') || line.trim().startsWith('💼') || line.trim().startsWith('🧠') || line.trim().startsWith('🏆') || line.trim().startsWith('🎓') || line.trim().startsWith('📬') || line.trim().startsWith('👩') || line.trim().startsWith('👋') || line.trim().startsWith('😊') || line.trim().startsWith('📄') || line.trim().startsWith('🗓️')) {
            result += '<p class="ai-header-line">' + line + '</p>';
          } else {
            result += '<p>' + line + '</p>';
          }
        }
      }
      if (inList) result += '</ul>';
      return result;
    }

    /* ── Append message ── */
    function appendMessage(text, role) {
      const div = document.createElement('div');
      div.className = `ai-msg ai-msg-${role}`;
      const bubble = document.createElement('div');
      bubble.className = 'ai-msg-bubble';
      if (role === 'bot') {
        bubble.innerHTML = renderMarkdown(text);
      } else {
        bubble.textContent = text;
      }
      div.appendChild(bubble);
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    }

    /* ── Typing indicator ── */
    function showTyping() {
      const div = document.createElement('div');
      div.className = 'ai-msg ai-msg-bot';
      div.id = 'aiTypingIndicator';
      div.innerHTML = '<div class="ai-msg-bubble"><div class="ai-typing-dots"><span></span><span></span><span></span></div></div>';
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
    function hideTyping() {
      const el = document.getElementById('aiTypingIndicator');
      if (el) el.remove();
    }

    /* ── Send message flow ── */
    function sendMessage(text) {
      const q = (text || (input && input.value) || '').trim();
      if (!q) return;
      if (input) input.value = '';
      if (sendBtn) sendBtn.disabled = true;

      // Hide suggestion chips after first interaction
      if (suggestions) suggestions.style.display = 'none';

      appendMessage(q, 'user');
      showTyping();

      const delay = 700 + Math.random() * 800;
      setTimeout(() => {
        hideTyping();
        const response = getResponse(q);
        appendMessage(response, 'bot');
        if (sendBtn) sendBtn.disabled = false;
        if (input) input.focus();
      }, delay);
    }

    /* ── Wire up inputs ── */
    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage());
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
      });
    }

    /* ── Suggestion chips ── */
    const chipMap = {
      'chip-projects':     '🚀 Tell me about her projects',
      'chip-experience':   '💼 What is her work experience?',
      'chip-skills':       '🧠 What are her technical skills?',
      'chip-achievements': '🏆 What are her achievements?',
      'chip-contact':      '📬 How can I contact her?',
    };
    Object.entries(chipMap).forEach(([id, question]) => {
      const chip = document.getElementById(id);
      if (chip) chip.addEventListener('click', () => sendMessage(question));
    });

  })();

})();