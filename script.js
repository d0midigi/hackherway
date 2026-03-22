/* === HACKHERWAY SECURITY — script.js === */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initAccordion();
  initCopyButtons();
  initTerminal();
  initCounters();
  initScrollAnimations();
  initMobileMenu();
  initScrollSpy();
});

/* --- Sidebar Toggle --- */
function initSidebar() {
  document.querySelectorAll('.sidebar__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const isOpen = submenu.classList.contains('open');

      // Close all
      document.querySelectorAll('.sidebar__submenu.open').forEach(s => {
        s.classList.remove('open');
        s.style.maxHeight = null; // IMPORTANT
        s.previousElementSibling.classList.remove('active');
      });

      if (!isOpen) {
        submenu.classList.add('open');
        btn.classList.add('active');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });
}

/* --- Accordion --- */
function initAccordion() {
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion__body');
      const inner = body.querySelector('.accordion__body-inner');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion__item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion__body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}

/* --- Copy to Clipboard --- */
function initCopyButtons() {
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

/* --- Terminal Typing Effect --- */
function initTerminal() {
  const termBody = document.querySelector('.terminal__body');
  if (!termBody || termBody.dataset.animated === 'true') return;
  termBody.dataset.animated = 'true';

  const lines = [
      { text: '╔══════════════════════════════════════════════╗', cls: 't-pink' },
    { text: '║     HELIX KITTEN SECURITY FRAMEWORK          ║', cls: 't-pink' },
    { text: '║     Offensive Security Research Lab           ║', cls: 't-grey' },
    { text: '╚══════════════════════════════════════════════╝', cls: 't-pink' },
  { text: '', cls: '' },
    { text: '[*] Initializing threat intelligence modules...', cls: 't-green' },
    { text: '[*] Loading MITRE ATT&CK knowledge base...', cls: 't-green' },
    { text: '[*] Connecting to vulnerability database...', cls: 't-green' },
    { text: '[+] 2,847 techniques cataloged', cls: 't-white' },
    { text: '[+] 156 tool profiles loaded', cls: 't-white' },
    { text: '[+] System ready.', cls: 't-green' },
    { text: '', cls: '' },
    { text: 'mindhackdiva@hackherway:~$ ', cls: 't-pink', cursor: true },
  ];

  termBody.innerHTML = '';
  let i = 0;

  function typeLine() {
    if (i >= lines.length) return;
    const line = lines[i];
    const div = document.createElement('div');
    if (line.text === '') {
      div.innerHTML = '&nbsp;';
    } else {
      div.innerHTML = `<span class="${line.cls}">${escapeHTML(line.text)}</span>`;
      if (line.cursor) {
        div.innerHTML += '<span class="terminal__cursor"></span>';
      }
    }
    div.style.opacity = '0';
    termBody.appendChild(div);
    requestAnimationFrame(() => {
      div.style.transition = 'opacity 0.15s ease';
      div.style.opacity = '1';
    });
    i++;
    setTimeout(typeLine, line.text === '' ? 50 : 80 + Math.random() * 60);
  }

  // Start when visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      setTimeout(typeLine, 300);
    }
  }, { threshold: 0.3 });
  observer.observe(termBody);
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* --- Animated Counters --- */
function initCounters() {
  const counters = document.querySelectorAll('.stat__number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, 0, target, 1500, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, start, end, duration, suffix) {
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  if (!hamburger || !sidebar) return;

  function toggleMenu() {
    sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('active');
  }
  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);
}

/* --- Blog Scroll Spy --- */
function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc a');
  if (!tocLinks.length) return;

  const sections = [];
  tocLinks.forEach(link => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      const section = document.querySelector(id);
      if (section) sections.push({ el: section, link: link });
    }
  });

  function onScroll() {
    const scrollY = window.scrollY + 100;
    let current = sections[0];
    for (const s of sections) {
      if (s.el.offsetTop <= scrollY) current = s;
    }
    tocLinks.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
