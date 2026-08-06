/* ============================================================
   HumanKind HR Solutions — interactions + icon set
   ============================================================ */

/* ---- Hand-built SVG icons (no emojis) ---- */
const _S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
const _E = '</svg>';
const ICONS = {
  /* primary / nav / page heroes */
  support:   _S + '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="12.5" width="4.5" height="6.5" rx="1.4"/><rect x="17" y="12.5" width="4.5" height="6.5" rx="1.4"/><path d="M19 19v.3a3 3 0 0 1-3 2.7h-2.2"/>' + _E,
  chart:     _S + '<line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/>' + _E,
  shield:    _S + '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>' + _E,
  sprout:    _S + '<path d="M12 21v-8"/><path d="M12 13c0-3.3 2.2-5.5 6-5.5 0 3.3-2.2 5.5-6 5.5z"/><path d="M12 14.5C12 11.7 10 10 6.5 10c0 2.8 2 4.5 5.5 4.5z"/>' + _E,
  building:  _S + '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M3 21h18"/>' + _E,
  users:     _S + '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19v-1a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v1"/><path d="M16 5.1a3.2 3.2 0 0 1 0 5.8"/><path d="M20.5 19v-1a4 4 0 0 0-3-3.9"/>' + _E,

  /* feature icons */
  doc:       _S + '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 16.5h4"/>' + _E,
  target:    _S + '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>' + _E,
  compass:   _S + '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>' + _E,
  userplus:  _S + '<path d="M14 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="8.5" cy="8" r="3.3"/><path d="M18 8v5M20.5 10.5h-5"/>' + _E,
  heart:     _S + '<path d="M12 20s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8.2 3.6 3.6 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9z"/>' + _E,
  phone:     _S + '<path d="M6.5 3H10l1.5 5-2.2 1.4a12 12 0 0 0 5.3 5.3L16 12.5l5 1.5v3.5a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 3z"/>' + _E,
  database:  _S + '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>' + _E,
  trend:     _S + '<polyline points="3 16 9 10 13 14 21 6"/><polyline points="15 6 21 6 21 12"/>' + _E,
  gear:      _S + '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M5.1 5.1l1.8 1.8M17.1 17.1l1.8 1.8M18.9 5.1l-1.8 1.8M6.9 17.1l-1.8 1.8"/>' + _E,
  globe:     _S + '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/>' + _E,
  lock:      _S + '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2"/>' + _E,
  link:      _S + '<path d="M9.5 13.5a3.6 3.6 0 0 0 5.4.4l2.2-2.2a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2"/><path d="M14.5 10.5a3.6 3.6 0 0 0-5.4-.4l-2.2 2.2a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2"/>' + _E,
  heartpulse:_S + '<path d="M12 20s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8.2 3.6 3.6 0 0 1 18.5 11c0 1-.3 2-.8 2.9"/><path d="M6 12.5h2.5L10 9.5l2 5 1.4-2.8H18"/>' + _E,
  brain:     _S + '<path d="M12 6.2A3 3 0 0 0 6.5 7.8 2.6 2.6 0 0 0 5 12.4 3 3 0 0 0 8.2 17H12z"/><path d="M12 6.2A3 3 0 0 1 17.5 7.8 2.6 2.6 0 0 1 19 12.4 3 3 0 0 1 15.8 17H12z"/><path d="M12 6.2V17"/>' + _E,
  dollar:    _S + '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9a2.6 2 0 0 0-2.5-1.4c-1.5 0-2.6.8-2.6 2s1.1 1.6 2.6 2 2.6.9 2.6 2.1-1.1 2-2.6 2A2.6 2 0 0 1 9.5 16.4"/><path d="M12 6v12"/>' + _E,
  columns:   _S + '<rect x="4" y="4" width="7" height="16" rx="1.5"/><rect x="13" y="4" width="7" height="16" rx="1.5"/>' + _E,
  refresh:   _S + '<path d="M20.5 11A8.5 8.5 0 0 0 6 6.5L3.5 9"/><path d="M3.5 4v5h5"/><path d="M3.5 13A8.5 8.5 0 0 0 18 17.5L20.5 15"/><path d="M20.5 20v-5h-5"/>' + _E,
  book:      _S + '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 1 6.5 18H19v3H6.5A1.5 1.5 0 0 1 5 19.5z"/>' + _E,
  award:     _S + '<circle cx="12" cy="9" r="5"/><path d="M9 13.2L7.8 21l4.2-2.2L16.2 21 15 13.2"/>' + _E,
  message:   _S + '<path d="M4 5h16v11H9l-4 3.5V16H4z"/><path d="M12 13s-2.3-1.4-2.3-3A1.4 1.4 0 0 1 12 8.7a1.4 1.4 0 0 1 2.3 1.3C14.3 11.6 12 13 12 13z"/>' + _E,
  activity:  _S + '<path d="M3 12h4l2.5 7 4-14L16 12h5"/>' + _E,
  mic:       _S + '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21M9 21h6"/>' + _E,
  search:    _S + '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>' + _E,
  plus:      _S + '<path d="M12 5v14M5 12h14"/>' + _E,
  tooth:     _S + '<path d="M12 5.5c-2-1.8-5-2-6.5-.3C3.8 7 4.3 10 5 13c.5 2.2.8 6 2.2 6s1.3-3.2 2.3-5c.6-1.1 1.6-1.1 2.2 0 1 1.8 1 5 2.3 5s1.7-3.8 2.2-6c.7-3 1.2-6-.5-7.8-1.5-1.7-4.5-1.5-6.5.3z"/>' + _E,
  smile:     _S + '<circle cx="12" cy="12" r="9"/><path d="M8 13.5c1 1.5 2.5 2.3 4 2.3s3-.8 4-2.3"/><path d="M9 9.3h.01M15 9.3h.01"/>' + _E,
  siren:     _S + '<path d="M7 18a5 5 0 0 1 10 0"/><path d="M4.5 18h15"/><path d="M3.5 21h17"/><path d="M12 5.5V3"/><path d="m18.6 7.4 1.5-1.5"/><path d="M5.4 7.4 3.9 5.9"/>' + _E,

  check:     _S + '<polyline points="20 6 9 17 4 12"/>' + _E,
  sun:       _S + '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.9 1.9M17.5 17.5l1.9 1.9M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.9-1.9M17.5 6.5l1.9-1.9"/>' + _E,
  moon:      _S + '<path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z"/>' + _E,
  video:     _S + '<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="M15.5 10l6-3.2v10.4l-6-3.2z"/>' + _E,
  clock:     _S + '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' + _E,

  /* contact */
  mail:      _S + '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>' + _E,
  pin:       _S + '<path d="M12 21s-6.5-5.3-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.7 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.5"/>' + _E,

  /* social brand marks */
  linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24h-4.5zM8.25 8.25h4.3v2.15h.06a4.7 4.7 0 0 1 4.24-2.33c4.53 0 5.37 2.98 5.37 6.86V24h-4.5v-6.16c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.36 1.6-2.36 3.25V24h-4.5z"/></svg>',
  facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.25" fill="currentColor"/></svg>'
};

function injectIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    if (ICONS[name] && !el.firstElementChild) el.innerHTML = ICONS[name];
  });
}

(function () {
  injectIcons();

  const header = document.getElementById('header');
  let lastY = window.scrollY;
  let ticking = false;

  /* ---- Header: hide on scroll down, reveal on scroll up ---- */
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (y > lastY && y > 220) {
      header.classList.add('hidden');
    } else if (y < lastY - 4) {
      header.classList.remove('hidden');
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    '.service-card, .process-step, .team-card, .quote-card, .about-copy, .about-media, .section-head, .contact-form, .contact-info, .feature-card, .svc-copy, .svc-media, .outcome-grid > div, .check-item, .stat'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  // directional reveals keep their own transform — observe without forcing fade-up
  const dirEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-zoom');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || (i % 4) * 70) + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
  dirEls.forEach(el => io.observe(el));

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ---- Contact form → /api/send-contact ---- */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const btn = form.querySelector('button[type="submit"]');
  const data = new FormData(form);

  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending…';
  if (note) note.hidden = true;

  fetch('/api/send-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: (data.get('name') || '').trim(),
      email: (data.get('email') || '').trim(),
      company: (data.get('company') || '').trim(),
      message: (data.get('message') || '').trim(),
    }),
  })
    .then((res) => { if (!res.ok) throw new Error('Request failed'); return res.json().catch(() => ({})); })
    .then(() => {
      if (note) {
        note.textContent = "Thanks! We'll be in touch within one business day.";
        note.style.color = '';
        note.hidden = false;
      }
      btn.textContent = 'Message Sent ✓';
      form.reset();
    })
    .catch(() => {
      if (note) {
        note.innerHTML = "Sorry — that didn't send. Please email us directly at <strong>info@humankindhrsolutions.com</strong>.";
        note.style.color = '#ffb4b4';
        note.hidden = false;
      }
      btn.disabled = false;
      btn.textContent = original;
    });

  return false;
}

/* ============================================================
   Interactive process steps
   ============================================================ */
(function () {
  const wrap = document.querySelector('.steps');
  if (!wrap) return;
  const steps = [...wrap.querySelectorAll('.step')];
  const fill = wrap.querySelector('.steps-fill');
  let active = 0, timer;

  function setActive(i) {
    active = i;
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    if (fill) fill.style.width = (steps.length > 1 ? (i / (steps.length - 1)) * (100 - 24) : 0) + '%';
  }
  function play() { stop(); timer = setInterval(() => setActive((active + 1) % steps.length), 2800); }
  function stop() { clearInterval(timer); }

  steps.forEach((s, i) => {
    s.addEventListener('mouseenter', () => { stop(); setActive(i); });
    s.addEventListener('mouseleave', play);
    s.addEventListener('click', () => { setActive(i); });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { setActive(0); play(); } else { stop(); } });
  }, { threshold: 0.3 });
  io.observe(wrap);
})();

/* ============================================================
   Testimonials carousel
   ============================================================ */
(function () {
  const car = document.getElementById('tcar');
  if (!car) return;
  const track = car.querySelector('#tcarTrack');
  const slides = [...track.children];
  const dotsWrap = car.querySelector('#tcarDots');
  let i = 0, timer;

  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.className = 'tcar-dot' + (idx === 0 ? ' active' : '');
    b.setAttribute('aria-label', 'Go to testimonial ' + (idx + 1));
    b.addEventListener('click', () => { go(idx); reset(); });
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }
  function next() { go(i + 1); }
  function play() { timer = setInterval(next, 6000); }
  function reset() { clearInterval(timer); play(); }

  car.querySelector('.next').addEventListener('click', () => { next(); reset(); });
  car.querySelector('.prev').addEventListener('click', () => { go(i - 1); reset(); });
  car.addEventListener('mouseenter', () => clearInterval(timer));
  car.addEventListener('mouseleave', play);
  play();
})();

/* ============================================================
   Stats count-up
   ============================================================ */
(function () {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;
  const fmt = (n) => n >= 1000 ? n.toLocaleString() : String(n);
  function run(el) {
    const target = parseFloat(el.dataset.count);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const dur = 1500; const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = pre + fmt(Math.round(target * eased)) + '<span class="accent">' + suf + '</span>';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  nums.forEach(n => io.observe(n));
})();

/* ============================================================
   Lead-capture modal ("Let's Talk")
   ============================================================ */
(function () {
  const AREAS = {
    'Dedicated HR': ['Ongoing HR advice & support', 'Policies & employee handbook', 'Employee relations / conflict', 'Performance management', 'Hiring & onboarding', 'Compliance & employment standards'],
    'Employee Benefits': ['A new benefits plan', 'Benefits review / renewal', 'Cost optimization', 'Group RRSP / pension', 'Employee benefits education'],
    'Specific HR Projects': ['HR audit / health check', 'Restructuring or change', 'Job descriptions & leveling', 'Compensation review', 'HR documents & templates'],
    'Wellness / Wellness Kits': ['Wellness program design', 'Wellness kits / care packages', 'Mental health support', 'Wellness workshops'],
    'SIY / Training / Workshops': ['Leadership development', 'Search Inside Yourself (SIY)', 'Team workshops', 'Manager training', 'Custom facilitation'],
    'OH&S': ['OH&S program setup', 'Workplace safety policies', 'Joint Health & Safety Committee', 'Incident / WCB support', 'Safety training'],
    'Accessibility': ['Accessibility audit', 'Accommodation processes', 'IDEA strategy', 'Inclusive hiring', 'Accessibility training'],
    'Other': ["I'm not sure yet — let's chat", 'Something else'],
  };
  const STEPS = 3;
  let step = 0;

  const overlay = document.createElement('div');
  overlay.className = 'lead-overlay';
  overlay.innerHTML =
    '<div class="lead-modal" role="dialog" aria-modal="true" aria-label="Tell us how we can help">' +
      '<div class="lead-head">' +
        '<div><span class="eyebrow">Let\'s Talk</span><h3>How can we help your team?</h3><p>A few quick questions so we come prepared.</p></div>' +
        '<button class="lead-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="lead-progress"><div class="lead-progress-bar" id="leadBar"></div></div>' +
      '<div class="lead-body">' +
        '<div class="lead-step" data-step="0">' +
          '<p class="lead-q">What area do you need help with?</p>' +
          '<p class="lead-hint">Select all that apply.</p>' +
          '<div class="opt-grid" id="leadAreas"></div>' +
        '</div>' +
        '<div class="lead-step" data-step="1">' +
          '<p class="lead-q">What are you looking for specifically?</p>' +
          '<p class="lead-hint">Pick whatever fits — this just helps us prepare.</p>' +
          '<div id="leadNeeds"></div>' +
        '</div>' +
        '<div class="lead-step" data-step="2">' +
          '<p class="lead-q">When\'s a good time to reach you?</p>' +
          '<p class="lead-hint">Pick a day and window that works — we\'ll call or email you then.</p>' +
          '<span class="meet-badge"><span data-icon="phone"></span> Phone or email · your choice</span>' +
          '<div class="book-days" id="bookDays"></div>' +
          '<div class="slot-label"><span data-icon="clock" class="sl-ic"></span> Best time on <span id="slotDayLabel"></span></div>' +
          '<div class="slot-grid" id="bookSlots"></div>' +
          '<div class="lead-fields" style="margin-top:24px">' +
            '<div class="row2">' +
              '<label>Name<input type="text" id="leadName" placeholder="Jane Doe" /></label>' +
              '<label>Email<input type="email" id="leadEmail" placeholder="jane@company.com" /></label>' +
            '</div>' +
            '<label>Phone <span style="font-weight:400;color:var(--muted)">(optional)</span><input type="tel" id="leadPhone" placeholder="(902) 555-0100" /></label>' +
          '</div>' +
          '<div class="lead-note"><span data-icon="phone"></span><span>We\'ll reach out by phone or email during that window to confirm a time.</span></div>' +
        '</div>' +
        '<div class="lead-step" data-step="3">' +
          '<div class="lead-success"><div class="check" data-icon="check"></div><h3 id="leadSuccessTitle">You\'re all set!</h3><p id="leadSuccessMsg">We\'ll be in touch shortly.</p></div>' +
        '</div>' +
        '<div class="lead-foot" id="leadFoot"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  const modal = overlay.querySelector('.lead-modal');
  const bar = overlay.querySelector('#leadBar');
  const foot = overlay.querySelector('#leadFoot');
  const areasWrap = overlay.querySelector('#leadAreas');
  const needsWrap = overlay.querySelector('#leadNeeds');
  const bookDaysWrap = overlay.querySelector('#bookDays');
  const bookSlotsWrap = overlay.querySelector('#bookSlots');
  const slotDayLabel = overlay.querySelector('#slotDayLabel');
  const SLOTS = [
    { label: 'Morning', hint: '8 – 11am' },
    { label: 'Afternoon', hint: '11am – 4pm' },
    { label: 'Evening', hint: '4 – 7pm' },
  ];
  let bookingDays = [], selDay = 0, selSlot = null;

  function optHTML(label, group) {
    return '<label class="opt"><input type="checkbox" name="' + group + '" value="' + label.replace(/"/g, '&quot;') + '"><span class="box"></span>' + label + '</label>';
  }

  // build area options once
  areasWrap.innerHTML = Object.keys(AREAS).map(a => optHTML(a, 'area')).join('');

  function selectedAreas() {
    return [...areasWrap.querySelectorAll('input:checked')].map(i => i.value);
  }
  function buildNeeds() {
    const sel = selectedAreas();
    needsWrap.innerHTML = sel.map(a =>
      '<p class="lead-hint" style="font-weight:700;color:var(--navy);margin:18px 0 10px">' + a + '</p>' +
      '<div class="opt-grid">' + AREAS[a].map(n => optHTML(n, 'need')).join('') + '</div>'
    ).join('');
  }

  function buildBooking() {
    const days = []; const cur = new Date();
    while (days.length < 5) {
      cur.setDate(cur.getDate() + 1);
      const wd = cur.getDay();
      if (wd !== 0 && wd !== 6) days.push(new Date(cur));
    }
    bookingDays = days; selDay = 0; selSlot = null;
    bookDaysWrap.innerHTML = days.map((dt, i) =>
      '<button type="button" class="day-chip' + (i === 0 ? ' active' : '') + '" data-day="' + i + '">' +
        '<span class="dc-wd">' + dt.toLocaleDateString('en-US', { weekday: 'short' }) + '</span>' +
        '<span class="dc-dn">' + dt.getDate() + '</span>' +
        '<span class="dc-mo">' + dt.toLocaleDateString('en-US', { month: 'short' }) + '</span>' +
      '</button>'
    ).join('');
    renderSlots();
  }
  function renderSlots() {
    const dt = bookingDays[selDay];
    slotDayLabel.textContent = dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    bookSlotsWrap.innerHTML = SLOTS.map((s) =>
      '<button type="button" class="slot" data-slot="' + s.label + '"><span class="slot-window">' + s.label + '</span><span class="slot-hint">' + s.hint + '</span></button>'
    ).join('');
    selSlot = null;
  }
  bookDaysWrap.addEventListener('click', (e) => {
    const c = e.target.closest('.day-chip'); if (!c) return;
    selDay = +c.dataset.day;
    [...bookDaysWrap.children].forEach(x => x.classList.toggle('active', x === c));
    renderSlots();
  });
  bookSlotsWrap.addEventListener('click', (e) => {
    const s = e.target.closest('.slot'); if (!s || s.disabled) return;
    selSlot = s.dataset.slot;
    [...bookSlotsWrap.children].forEach(x => x.classList.toggle('active', x === s));
  });

  function render() {
    overlay.querySelectorAll('.lead-step').forEach(s => s.classList.toggle('active', +s.dataset.step === step));
    bar.style.width = Math.min(((step + 1) / STEPS) * 100, 100) + '%';
    overlay.querySelector('.lead-progress').style.display = step >= STEPS ? 'none' : 'block';
    let html = '';
    if (step === 0) html = '<span></span><button class="btn btn-primary" data-act="next">Continue</button>';
    else if (step === 1) html = '<button class="btn-text" data-act="back">← Back</button><button class="btn btn-primary" data-act="next">Continue</button>';
    else if (step === 2) html = '<button class="btn-text" data-act="back">← Back</button><button class="btn btn-primary" data-act="submit">Confirm</button>';
    else html = '<span></span><button class="btn btn-primary" data-act="close">Done</button>';
    foot.innerHTML = html;
    injectIcons(overlay);
  }

  function open() {
    step = 0; buildBooking(); render();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  foot.addEventListener('click', (e) => {
    const act = e.target.getAttribute('data-act');
    if (!act) return;
    if (act === 'close') return close();
    if (act === 'back') { step--; return render(); }
    if (act === 'next') {
      if (step === 0) {
        if (!selectedAreas().length) { areasWrap.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'none' }], 250); return; }
        buildNeeds();
      }
      step++; return render();
    }
    if (act === 'submit') {
      const name = overlay.querySelector('#leadName');
      const email = overlay.querySelector('#leadEmail');
      const phone = overlay.querySelector('#leadPhone');
      let ok = true;
      [name, email].forEach(f => { if (!f.value.trim()) { f.style.borderColor = '#e03b3b'; ok = false; } else { f.style.borderColor = ''; } });
      if (!selSlot) { bookSlotsWrap.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'none' }], 250); ok = false; }
      if (!ok) return;

      const dt = bookingDays[selDay];
      const dayLong = dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      const needs = [...needsWrap.querySelectorAll('input:checked')].map(i => i.value);
      const submitBtn = e.target;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          areas: selectedAreas(),
          needs: needs,
          preferredDay: dayLong,
          preferredWindow: selSlot,
        }),
      })
        .then(res => { if (!res.ok) throw new Error('Request failed'); return res.json().catch(() => ({})); })
        .then(() => {
          const title = overlay.querySelector('#leadSuccessTitle');
          const msg = overlay.querySelector('#leadSuccessMsg');
          if (title) title.textContent = "You're all set!";
          if (msg) msg.innerHTML = 'Thanks, ' + name.value.trim().split(' ')[0] + ' — we\'ll reach out <strong>' + dayLong + '</strong>, ' + selSlot.toLowerCase() + ', by phone or email.';
          step = 3; render();
        })
        .catch(() => {
          const title = overlay.querySelector('#leadSuccessTitle');
          const msg = overlay.querySelector('#leadSuccessMsg');
          if (title) title.textContent = 'Something went wrong';
          if (msg) msg.innerHTML = 'We couldn\'t send your request. Please email us directly at <strong>info@humankindhrsolutions.com</strong>.';
          step = 3; render();
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Confirm';
        });
    }
  });

  overlay.querySelector('.lead-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  // triggers: any "Let's Talk" button + [data-lead]
  document.querySelectorAll('.header-cta, .mm-cta, [data-lead]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mm = document.getElementById('mobileMenu');
      const hb = document.getElementById('hamburger');
      if (mm && mm.classList.contains('open')) { mm.classList.remove('open'); if (hb) hb.classList.remove('open'); }
      open();
    });
  });
})();

/* ============================================================
   OH&S interactive pillars
   ============================================================ */
(function () {
  const orbit = document.getElementById('ohsOrbit');
  if (!orbit) return;
  const nodes = [...orbit.querySelectorAll('.ohs-node')];
  const badge = document.getElementById('ohsBadge');
  const label = document.getElementById('ohsCoreLabel');
  const sub = document.getElementById('ohsCoreSub');
  let active = -1, timer;

  function setActive(i) {
    active = i;
    nodes.forEach((n, idx) => n.classList.toggle('active', idx === i));
    const node = nodes[i];
    const ic = node.querySelector('.ohs-node-ic');
    if (badge) { badge.innerHTML = ic ? ic.innerHTML : ''; badge.classList.add('show'); }
    if (label) label.textContent = node.dataset.label;
    if (sub) sub.textContent = 'We\'ve got this covered';
  }
  function play() { stop(); timer = setInterval(() => setActive((active + 1) % nodes.length), 3200); }
  function stop() { clearInterval(timer); }

  nodes.forEach((n, i) => {
    n.addEventListener('mouseenter', () => { stop(); setActive(i); });
    n.addEventListener('mouseleave', play);
    n.addEventListener('click', () => { stop(); setActive(i); });
    n.addEventListener('focus', () => { stop(); setActive(i); });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { if (active < 0) setActive(0); play(); } else { stop(); } });
  }, { threshold: 0.25 });
  io.observe(orbit);
})();

/* ============================================================
   MyPersonalHealthPlan testimonials carousel
   ============================================================ */
(function () {
  const root = document.getElementById('mphpTcar');
  if (!root) return;
  const feature = document.getElementById('mphpFeature');
  const tabs = document.getElementById('mphpTabs');
  const data = [...document.querySelectorAll('#mphpData figure')].map(f => ({
    name: f.dataset.name,
    role: f.dataset.role,
    img: f.dataset.img,
    quote: f.textContent.trim(),
    initials: f.dataset.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
  }));
  if (!data.length) return;
  let cur = 0, timer;

  // initials show by default; a real photo reveals itself only once it loads (no broken-image flash)
  function photo(p, wrapCls, initCls) {
    return '<span class="' + wrapCls + '">' +
      '<span class="' + initCls + '">' + p.initials + '</span>' +
      '<img src="' + p.img + '" alt="' + p.name + '" style="display:none">' +
    '</span>';
  }
  // reveal each photo only after it successfully loads (handlers attached in JS, not inline)
  function wireImages() {
    root.querySelectorAll('img').forEach(img => {
      const reveal = () => {
        img.style.display = 'block';
        const init = img.previousElementSibling;
        if (init) init.style.display = 'none';
      };
      if (img.complete && img.naturalWidth > 0) reveal();
      else img.addEventListener('load', reveal);
    });
  }
  // Render ALL slides once into the stage; switching just toggles .active (smooth crossfade,
  // and the card stays sized to the tallest review so it never resizes).
  function renderSlides() {
    feature.innerHTML = data.map(p =>
      '<div class="mphp-slide">' +
        photo(p, 'mf-photo', 'mf-initials') +
        '<figure class="mf-body"><blockquote>' + p.quote + '</blockquote>' +
        '<figcaption><strong>' + p.name + '</strong><span>' + p.role + '</span></figcaption></figure>' +
      '</div>'
    ).join('');
  }
  function renderTabs() {
    tabs.innerHTML = data.map((p, i) =>
      '<button class="mphp-tab' + (i === cur ? ' active' : '') + '" type="button" data-i="' + i + '">' +
        photo(p, 'mt-av', 'mt-initials') +
        '<span class="mt-tx"><strong>' + p.name + '</strong><span>' + p.role + '</span></span>' +
      '</button>'
    ).join('');
  }
  function set(i) {
    cur = (i + data.length) % data.length;
    [...feature.children].forEach((s, idx) => s.classList.toggle('active', idx === cur));
    [...tabs.children].forEach((t, idx) => t.classList.toggle('active', idx === cur));
  }
  function play() { stop(); timer = setInterval(() => set(cur + 1), 7000); }
  function stop() { clearInterval(timer); }

  renderSlides();
  renderTabs();
  wireImages();
  set(0);
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.mphp-tab'); if (!b) return;
    stop(); set(+b.dataset.i); play();
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) play(); else stop(); });
  }, { threshold: 0.3 });
  io.observe(root);
})();

/* ============================================================
   Process — rail of steps + detail panel
   ============================================================ */
(function () {
  const rail  = document.getElementById('procRail');
  const stage = document.getElementById('procStage');
  if (!rail || !stage) return;

  const STEPS = [
    {
      icon: 'compass', sub: 'Discovery & diagnosis', title: 'Hear the Whole Story',
      body: 'We start by deeply understanding your organization, goals, and challenges — grounded in listening, curiosity, and psychological safety to surface the real root issues.',
      do: ['Discovery sessions with leadership and staff', 'Review of current policies, data, and pain points', 'Surface the root issues, not just the symptoms'],
      get: 'A clear, honest picture of where you stand — and what to tackle first.'
    },
    {
      icon: 'target', sub: 'Strategy & planning', title: 'Shape the Path Together',
      body: 'Using our expertise in HR, benefits, performance, and IDEA, we co-create practical strategies tailored to your context and culture.',
      do: ['Co-design options that fit your size and budget', 'Prioritize for impact and quick wins', 'Map a clear, realistic roadmap'],
      get: 'A tailored action plan you actually understand and believe in.'
    },
    {
      icon: 'gear', sub: 'Implementation', title: 'Do the Work',
      body: 'Our team becomes an extension of yours — taking ownership and delivering consistent, high-quality execution. We do the heavy lifting.',
      do: ['Build the policies, systems, and programs', 'Handle the documentation and rollout', 'Keep you updated at every milestone'],
      get: 'Done-for-you HR infrastructure, implemented and ready to use.'
    },
    {
      icon: 'sprout', sub: 'Adoption & sustainability', title: 'Make It Stick',
      body: "Change isn't a one-time fix. We support adoption, integration, and long-term resilience so your people thrive well beyond our engagement.",
      do: ['Train managers and staff for real adoption', 'Measure, refine, and adjust over time', 'Build internal capacity to self-sustain'],
      get: 'Lasting change that sticks — and a team confident to carry it forward.'
    }
  ];

  const DUR = 5500;
  let cur = 0, autoTimer, restartTimer;

  const icon = (key) => (typeof ICONS !== 'undefined' && ICONS[key]) ? ICONS[key] : '';

  STEPS.forEach((s, i) => {
    const step = document.createElement('button');
    step.className = 'proc-step' + (i === 0 ? ' active' : '');
    step.type = 'button';
    step.innerHTML =
      '<span class="ps-num">0' + (i + 1) + '</span>' +
      '<span class="ps-tx"><strong>' + s.title + '</strong><em>' + s.sub + '</em></span>' +
      '<span class="ps-prog"><i></i></span>';
    step.addEventListener('click', () => goManual(i));
    rail.appendChild(step);

    const card = document.createElement('div');
    card.className = 'proc-card' + (i === 0 ? ' active' : '');
    card.innerHTML =
      '<div class="pc-top"><div class="pc-ic">' + icon(s.icon) + '</div><span class="pc-step">Step 0' + (i + 1) + '</span></div>' +
      '<h3>' + s.title + '</h3>' +
      '<p>' + s.body + '</p>' +
      '<div class="pc-cols">' +
        '<div class="pc-do"><h4>What We Do</h4><ul>' + s.do.map(t => '<li>' + t + '</li>').join('') + '</ul></div>' +
        '<div class="pc-get"><h4>What You Get</h4><p>' + s.get + '</p></div>' +
      '</div>';
    stage.appendChild(card);
  });

  const steps = [...rail.children];
  const cards = [...stage.children];

  function applyStep(i) {
    steps.forEach((el, idx) => el.classList.toggle('active', idx === i));
    cards.forEach((el, idx) => el.classList.toggle('active', idx === i));
  }

  function setProgress(duration) {
    steps.forEach(el => {
      const fill = el.querySelector('.ps-prog i');
      fill.style.animation = 'none';
      clearTimeout(fill._pt);
      fill.style.width = '0';
    });
    if (duration > 0) {
      const fill = steps[cur].querySelector('.ps-prog i');
      fill._pt = setTimeout(function () {
        fill.style.animation = 'railFill ' + duration + 'ms linear forwards';
      }, 32);
    }
  }

  function go(i) {
    cur = (i + STEPS.length) % STEPS.length;
    applyStep(cur);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
    setProgress(DUR);
    autoTimer = setInterval(function () {
      go((cur + 1) % STEPS.length);
      setProgress(DUR);
    }, DUR);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    clearTimeout(restartTimer);
    autoTimer = null;
    restartTimer = null;
    setProgress(0);
  }

  function goManual(i) {
    stopAuto();
    go(i);
    restartTimer = setTimeout(startAuto, 6000);
  }

  applyStep(0);
  startAuto();
})();

/* ============================================================
   Faded photo backdrops on dark bands — fade in on scroll
   ============================================================ */
(function () {
  const photos = document.querySelectorAll('.band-photo');
  if (!photos.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  photos.forEach(p => io.observe(p));
})();

/* ============================================================
   MyPersonalHealthPlan — "Other Individual Options" tabs
   ============================================================ */
(function () {
  const tabsWrap = document.getElementById('optTabs');
  const stage = document.getElementById('optStage');
  if (!tabsWrap || !stage) return;
  const tabs = [...tabsWrap.querySelectorAll('.opt-tab')];
  const cards = [...stage.querySelectorAll('.opt-card')];

  function set(key) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.opt === key));
    cards.forEach(c => c.classList.toggle('active', c.dataset.opt === key));
  }
  tabs.forEach(t => t.addEventListener('click', () => set(t.dataset.opt)));
  set('life'); // default

  // plan-card "Learn more" deep links: open the matching tab when jumping here
  document.querySelectorAll('[data-open]').forEach(a => {
    a.addEventListener('click', () => set(a.dataset.open));
  });
})();

/* ============================================================
   Homepage hero — rotating carousel + typewriter + icon tabs
   ============================================================ */
(function () {
  const hero = document.querySelector('.hero-carousel');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const tabsWrap = document.getElementById('heroDots');
  if (slides.length < 2 || !tabsWrap) return;

  const wordEl   = document.getElementById('heroWord');
  const cursorEl = document.getElementById('heroCursor');
  const taglineEl = document.getElementById('heroTagline');
  let i = 0, timer, twTimer;

  /* Build icon + name tabs */
  slides.forEach((slide, n) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hero-tab' + (n === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    const ic = document.createElement('span');
    ic.setAttribute('data-icon', slide.dataset.svcIcon || '');
    const lbl = document.createElement('span');
    lbl.textContent = slide.dataset.svcShort || '';
    btn.appendChild(ic); btn.appendChild(lbl);
    btn.addEventListener('click', () => { go(n); restart(); });
    tabsWrap.appendChild(btn);
  });
  injectIcons(tabsWrap);
  const tabs = [...tabsWrap.children];

  /* Typewriter */
  function typewrite(word, onDone) {
    clearTimeout(twTimer);
    if (!wordEl) { onDone && onDone(); return; }
    if (taglineEl) { taglineEl.classList.remove('visible'); }
    if (cursorEl)  { cursorEl.classList.remove('done'); }
    wordEl.textContent = '';
    let idx = 0;
    function tick() {
      wordEl.textContent = word.slice(0, idx++);
      if (idx <= word.length) { twTimer = setTimeout(tick, 85); }
      else { if (cursorEl) cursorEl.classList.add('done'); onDone && onDone(); }
    }
    tick();
  }

  function showTagline(text) {
    if (!taglineEl) return;
    taglineEl.textContent = text;
    setTimeout(() => taglineEl.classList.add('visible'), 60);
  }

  function go(n) {
    slides[i].classList.remove('active'); tabs[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active'); tabs[i].classList.add('active');
    const d = slides[i].dataset;
    typewrite(d.svcWord || '', () => showTagline(d.svcTagline || ''));
  }

  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 5500); }

  /* Kick off */
  const d0 = slides[0].dataset;
  typewrite(d0.svcWord || '', () => showTagline(d0.svcTagline || ''));
  restart();
})();

/* ============================================================
   HRIS dashboard carousel — HR Systems page
   ============================================================ */
(function () {
  const stage = document.getElementById('hrisStage');
  const nav = document.getElementById('hrisNav');
  const dotsWrap = document.getElementById('hrisDots');
  if (!stage || !nav || !dotsWrap) return;

  const screens = [...stage.querySelectorAll('.hris-screen')];
  const navItems = [...nav.querySelectorAll('.hris-nav-item')];
  const DELAY = 6000;
  let idx = 0, timer = null;

  screens.forEach((_, n) => {
    const d = document.createElement('button');
    d.className = 'hris-cdot' + (n === 0 ? ' active' : '');
    d.setAttribute('aria-label', navItems[n] ? navItems[n].textContent.trim() : 'Screen ' + (n + 1));
    d.addEventListener('click', () => go(n, true));
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];

  function apply(n) {
    idx = n;
    screens.forEach((el, k) => el.classList.toggle('active', k === n));
    navItems.forEach((el, k) => el.classList.toggle('active', k === n));
    dots.forEach((el, k) => el.classList.toggle('active', k === n));
  }
  function next() { apply((idx + 1) % screens.length); }
  function start() { clearInterval(timer); timer = setInterval(next, DELAY); }
  function go(n, manual) { apply(n); if (manual) start(); }

  navItems.forEach((btn, n) => btn.addEventListener('click', () => go(n, true)));
  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', start);
  start();
})();
