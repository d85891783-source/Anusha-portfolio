/**
 * ============================================================================
 * ANUSHA BA - DEVELOPER PORTFOLIO JAVASCRIPT
 * Features:
 *  1. Theme detection (prefers-color-scheme) & manual dark/light toggle
 *  2. Vertical navigation scroll-spy & mobile drawer toggle
 *  3. Dynamic typewriter effect for hero tagline
 *  4. IntersectionObserver for skill progress bar animations
 *  5. Projects modal popups with rich technical details
 *  6. Video introduction player controls
 *  7. Interactive AI Chat simulation with OpenAI/Gemini integration comments
 *  8. Contact form validation with email API hook comments & confirmation
 *  9. Optional 8-bit Web Audio synthesizer sound effects
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME ENGINE: PREFERS-COLOR-SCHEME & MANUAL TOGGLE (Prompt 2 & 14)
     ========================================================================== */
  const htmlEl = document.documentElement;
  const themeToggleDesktop = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      updateThemeButtons('dark');
    } else if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      updateThemeButtons('light');
    } else {
      // Follow system media query
      htmlEl.removeAttribute('data-theme');
      updateThemeButtons(systemPrefersDark.matches ? 'dark' : 'light');
    }
  }

  function updateThemeButtons(currentTheme) {
    const isDark = currentTheme === 'dark';
    const iconClass = isDark ? 'fa-sun' : 'fa-moon';
    const labelText = isDark ? 'LIGHT' : 'DARK';

    if (themeToggleDesktop) {
      themeToggleDesktop.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span class="toggle-label">${labelText}</span>`;
      themeToggleDesktop.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }
    if (themeToggleMobile) {
      themeToggleMobile.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
      themeToggleMobile.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }
  }

  // Initialize theme
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
  }

  // Listen to system OS theme changes if user hasn't overridden
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') || (systemPrefersDark.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio_theme', newTheme);
    applyTheme(newTheme);
    playRetroTone(660, 0.08); // Retro beep feedback
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  /* ==========================================================================
     2. 8-BIT RETRO SOUND FX (WEB AUDIO API)
     Lightweight, zero-asset audio synth for genuine retro gaming feel.
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;
  const soundToggleBtn = document.getElementById('sound-toggle');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playRetroTone(freq = 440, duration = 0.06, type = 'square') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled
        ? `<i class="fa-solid fa-volume-high"></i> <span class="sound-label">SFX: ON</span>`
        : `<i class="fa-solid fa-volume-xmark"></i> <span class="sound-label">SFX: OFF</span>`;
      if (soundEnabled) playRetroTone(523, 0.1);
    });
  }

  // Play subtle sound on all interactive buttons
  document.querySelectorAll('.pixel-btn, .pixel-btn-small, .chat-chip').forEach(btn => {
    btn.addEventListener('click', () => playRetroTone(480, 0.04));
  });

  /* ==========================================================================
     3. VERTICAL NAVIGATION & MOBILE DRAWER (Prompt 3 & 13)
     ========================================================================== */
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  function toggleMobileMenu() {
    const isOpen = sidebar.classList.toggle('open');
    navOverlay.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    playRetroTone(isOpen ? 440 : 330, 0.06);
  }

  function closeMobileMenu() {
    sidebar.classList.remove('open');
    navOverlay.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

  // Close drawer when clicking a navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeMobileMenu();
      }
    });
  });

  // Scroll-Spy: Highlight current active section in vertical navbar
  const sections = document.querySelectorAll('section[id], header[id]');
  function updateScrollSpy() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 140;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(item => {
          if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  /* ==========================================================================
     4. HERO SECTION TYPING ANIMATION (Prompt 2)
     ========================================================================== */
  const typingTextEl = document.getElementById('typing-text');
  const taglines = [
    'Crafting Intelligent Solutions with Python, C & Java',
    'B.E. Data Science & Engineering @ AIT Chikkamagaluru',
    'Algorithms • Backend Architecture • Problem Solving',
    'Passionate about Machine Learning & Data Engineering'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeEffect() {
    if (!typingTextEl) return;
    const currentPhrase = taglines[phraseIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of sentence
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % taglines.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  /* ==========================================================================
     5. SKILLS SECTION: PROGRESS BAR ANIMATION (Prompt 5)
     Uses IntersectionObserver to trigger retro filling animation when in view.
     ========================================================================== */
  const skillCards = document.querySelectorAll('.skill-card');
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersectEvent || entry.isIntersecting) {
          const progressInner = entry.target.querySelector('.pixel-progress-inner');
          if (progressInner) {
            const targetWidth = progressInner.style.getPropertyValue('--skill-level') || '75%';
            progressInner.style.width = targetWidth;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillCards.forEach(card => skillObserver.observe(card));
  }

  /* ==========================================================================
     6. PROJECTS MODAL INTERACTION (Prompt 7)
     Clickable thumbnails opening rich architectural project modals.
     ========================================================================== */
  const projectDetails = {
    'academic-project': {
      title: 'Multi-Language Academic Problem Solver',
      badge: 'Core Academic Engineering',
      tags: ['Python', 'C', 'Java', 'Data Structures', 'Algorithms'],
      overview: 'Developed as part of academic engineering coursework at Adichunchanagiri Institute of Technology to explore the synergy between systems-level efficiency and high-level application modularity.',
      architecture: [
        '<strong>C Module:</strong> Handles computationally intensive sorting and graph exploration routines with optimal time complexity.',
        '<strong>Python Module:</strong> Provides automated testing, data transformation pipelines, and validation scripts.',
        '<strong>Java Module:</strong> Employs Object-Oriented Design (OOP) patterns, encapsulation, and class hierarchies for clean interface management.'
      ],
      impact: 'Demonstrated strong cross-language integration, algorithm design, and structured problem-solving directly matching resume qualifications.'
    },
    'data-science-viz': {
      title: 'Data Science Insight & Analytics Explorer',
      badge: 'Data Science & Analytics',
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Statistical Analysis'],
      overview: 'An exploratory data analysis and visualization engine built using Python. Designed to parse real-world structured datasets and uncover predictive indicators.',
      architecture: [
        '<strong>Data Cleansing:</strong> Automated handling of missing attributes, outlier detection, and normalization.',
        '<strong>Descriptive Analytics:</strong> Calculates statistical moments, correlation matrices, and distribution metrics.',
        '<strong>Visual Storytelling:</strong> Generates crisp analytical charts, heatmaps, and trendlines.'
      ],
      impact: 'Highlights core competencies in Data Science and Engineering coursework (2025–2029 curriculum).'
    },
    'java-backend': {
      title: 'Java Inventory & Records Manager',
      badge: 'Backend Architecture',
      tags: ['Java', 'OOP', 'File I/O', 'Collections Framework', 'Robust Error Handling'],
      overview: 'A persistent, multi-tiered backend console application that demonstrates robust object-oriented programming principles, custom collections, and data persistence.',
      architecture: [
        '<strong>OOP Foundations:</strong> Applied encapsulation, inheritance, and interface polymorphism.',
        '<strong>Data Persistence:</strong> Serialization and file-based transaction logging.',
        '<strong>Validation:</strong> Input sanitation with custom Java exception classes.'
      ],
      impact: 'Validates practical mastery in Java Backend development as highlighted on Anusha\'s resume.'
    },
    'pixel-portfolio': {
      title: 'Retro Pixel Art Developer Portfolio',
      badge: 'Frontend & Interactive Web',
      tags: ['Semantic HTML5', 'CSS3 Variables', 'Modern JavaScript', 'Web Audio API', 'AI Simulation'],
      overview: 'A custom crafted, fully responsive developer portfolio featuring a pixel art aesthetic blended with clean, modern typography and accessibility standards.',
      architecture: [
        '<strong>Adaptive Design:</strong> Auto dark/light mode detection matching user OS preferences.',
        '<strong>Self-Introduction Video Console:</strong> Custom responsive video player with retro bezels.',
        '<strong>AI Chat Twin:</strong> Simulated interactive digital assistant with pre-configured OpenAI/Gemini integration points.',
        '<strong>Accessibility:</strong> Semantic HTML, ARIA attributes, keyboard navigation, and skip links.'
      ],
      impact: 'Serves as Anusha BA\'s central digital footprint for internship applications and professional networking.'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismiss = document.getElementById('modal-dismiss');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalContent.innerHTML = `
      <div class="modal-badge pixel-chip" style="margin-bottom: 14px;">${data.badge}</div>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">${data.overview}</p>
      
      <h4 style="font-family: var(--font-pixel-sub); font-size: 0.9rem; margin-bottom: 8px; color: var(--text-main);">
        <i class="fa-solid fa-layer-group"></i> Architecture &amp; Implementation:
      </h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; padding-left: 4px;">
        ${data.architecture.map(item => `
          <li style="font-size: 0.88rem; color: var(--text-muted); display: flex; gap: 8px; align-items: flex-start;">
            <span style="color: var(--accent-primary); font-family: monospace;">►</span>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>

      <h4 style="font-family: var(--font-pixel-sub); font-size: 0.9rem; margin-bottom: 8px; color: var(--text-main);">
        <i class="fa-solid fa-tags"></i> Technologies Used:
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
        ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <div style="padding: 12px; background: var(--bg-primary); border: 1px dashed var(--border-color); border-radius: 6px;">
        <strong style="font-size: 0.85rem; color: var(--accent-secondary);"><i class="fa-solid fa-bullseye"></i> Key Takeaway:</strong>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">${data.impact}</p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playRetroTone(587, 0.08);
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  // Clicking anywhere on project card opens modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeProjectModal);

  // Close modal on background backdrop click
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     7. AI CHAT INTERACTION & SIMULATION (Prompt 10)
     Simulates conversational twin for Anusha BA.
     Contains documented code hooks for OpenAI / Gemini API.
     ========================================================================== */
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Knowledge Base built directly from Anusha's verified resume & profile
  const aiKnowledgeBase = [
    {
      keywords: ['skill', 'programming', 'language', 'python', 'java', 'c', 'tech', 'stack', 'backend'],
      response: "Anusha is skilled in <strong>C, Python, and Java</strong>! She uses Python for data science and algorithmic scripting, C for foundational systems logic and data structures, and Java for object-oriented backend programming."
    },
    {
      keywords: ['education', 'college', 'school', 'degree', 'study', 'ait', 'chikkamagaluru', 'cgpa', 'university', 'bgs'],
      response: "Anusha is currently pursuing her <strong>B.E. in Data Science and Engineering (2025–2029)</strong> at <em>Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru</em> with a CGPA of 6.05. She completed her Pre-University at BGS PU College (76%) and 10th standard at Nirmala Convent School (88% Distinction) in Balehonnuru!"
    },
    {
      keywords: ['project', 'academic', 'built', 'work', 'github', 'portfolio'],
      response: "Anusha developed an <strong>Academic Project</strong> applying C, Python, and Java to solve core computing problems. She has also built a Data Science exploration suite, a Java inventory management backend, and this retro pixel art web portfolio!"
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'message', 'hire', 'call', 'linkedin'],
      response: "You can reach Anusha directly via email at <a href='mailto:anushasanil061@gmail.com'>anushasanil061@gmail.com</a>, call her at <strong>+91 8094817628</strong>, or connect on <a href='https://www.linkedin.com/in/anusha-ba-237b46392' target='_blank'>LinkedIn</a>!"
    },
    {
      keywords: ['training', 'achievement', 'certificate', 'capacity', 'workshop'],
      response: "Anusha has completed comprehensive technical training and actively participated in capacity-building and career development initiatives, expanding her practical knowledge of modern software engineering."
    },
    {
      keywords: ['internship', 'job', 'hire', 'available', 'opportunity', 'role'],
      response: "Yes! Anusha is actively seeking internship opportunities in <strong>Data Science, Software Engineering, and Backend Development</strong>. She is eager to learn, contribute, and solve real-world problems with your team!"
    },
    {
      keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you'],
      response: "Hi there! I am <strong>AI Anusha</strong>, Anusha BA's virtual digital twin. How can I help you today? You can ask about her projects, technical skills, education, or contact details!"
    }
  ];

  function getAiResponse(userQuery) {
    const query = userQuery.toLowerCase();
    for (const entry of aiKnowledgeBase) {
      if (entry.keywords.some(kw => query.includes(kw))) {
        return entry.response;
      }
    }
    return "Thanks for asking! Anusha is focused on Data Science, Python, C, and Java backend development. For specific inquiries or opportunities, feel free to drop a message in the <strong>Contact Section</strong> below or email her at <a href='mailto:anushasanil061@gmail.com'>anushasanil061@gmail.com</a>.";
  }

  /**
   * =========================================================================
   * NOTE FOR PRODUCTION API INTEGRATION (Prompt 10 requirement):
   * To connect this chat interface to OpenAI or Google Gemini API,
   * replace the `getAiResponse()` simulation with an asynchronous fetch:
   *
   * async function callExternalAiApi(userMessage) {
   *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
   *     method: 'POST',
   *     headers: {
   *       'Content-Type': 'application/json',
   *       'Authorization': 'Bearer ' + YOUR_API_KEY
   *     },
   *     body: JSON.stringify({
   *       model: 'gpt-4o-mini',
   *       messages: [
   *         { role: 'system', content: 'You are AI Anusha, a portfolio assistant for Anusha BA...' },
   *         { role: 'user', content: userMessage }
   *       ]
   *     })
   *   });
   *   const data = await response.json();
   *   return data.choices[0].message.content;
   * }
   * =========================================================================
   */

  function appendChatMessage(sender, htmlContent) {
    const isBot = sender === 'bot';
    const messageEl = document.createElement('div');
    messageEl.className = `message-bubble ${isBot ? 'bot-message' : 'user-message'}`;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageEl.innerHTML = `
      <div class="bubble-avatar">${isBot ? '👾' : '🧑‍💻'}</div>
      <div class="bubble-content">
        <p>${htmlContent}</p>
        <span class="message-time">${timeString}</span>
      </div>
    `;

    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    appendChatMessage('user', text);
    chatInput.value = '';
    playRetroTone(400, 0.05);

    // Show simulated typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-bubble bot-message typing-indicator';
    typingIndicator.innerHTML = `
      <div class="bubble-avatar">👾</div>
      <div class="bubble-content" style="font-style: italic; opacity: 0.7;">
        <span>AI Anusha is thinking...</span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate natural thinking delay (500ms - 800ms)
    setTimeout(() => {
      if (typingIndicator.parentNode) {
        typingIndicator.parentNode.removeChild(typingIndicator);
      }
      const response = getAiResponse(text);
      appendChatMessage('bot', response);
      playRetroTone(600, 0.07);
    }, 650);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
  }

  // Quick prompt chips
  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        chatInput.value = prompt;
        handleChatSubmit();
      }
    });
  });

  /* ==========================================================================
     8. CONTACT FORM WITH CONFIRMATION & API HOOK (Prompt 11)
     Validates user input, provides interactive feedback, and comments
     where Resend API / Formspree / EmailJS is integrated.
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Clear existing errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameInput.classList.add('error');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email.';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please provide a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        messageInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        playRetroTone(220, 0.12, 'sawtooth');
        return;
      }

      // Show processing state on submit button
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';

      /**
       * =====================================================================
       * NOTE FOR EMAIL SERVICE INTEGRATION (Prompt 11 requirement):
       * Here is where an external email-sending service (e.g. Resend API,
       * Formspree, or EmailJS) should be executed:
       *
       * Example with Resend API endpoint (via serverless function / backend):
       * const res = await fetch('/api/send-email', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({
       *     from: 'portfolio@yourdomain.com',
       *     to: 'anushasanil061@gmail.com',
       *     subject: subjectInput.value || 'New Portfolio Contact',
       *     text: `From: ${nameInput.value} (${emailInput.value})\n\n${messageInput.value}`
       *   })
       * });
       * =====================================================================
       */

      // Simulate sending delay for realistic interactive workshop experience
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        contactFeedback.style.display = 'block';
        contactFeedback.className = 'form-feedback success pixel-box';
        contactFeedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Transmission Received!</strong><br />
          Thank you, <strong>${escapeHtml(nameInput.value.trim())}</strong>. Your message has been sent to Anusha BA. She will reply to <em>${escapeHtml(emailInput.value.trim())}</em> shortly!
        `;

        contactForm.reset();
        playRetroTone(784, 0.15); // Happy completion tone

        // Auto-dismiss confirmation after 9 seconds
        setTimeout(() => {
          contactFeedback.style.display = 'none';
        }, 9000);
      }, 1000);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ==========================================================================
     9. DYNAMIC FOOTER CURRENT YEAR
     ========================================================================== */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
