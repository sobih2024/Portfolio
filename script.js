/* ═══════════════════════════════════════════
   AHMAD SOBIH — PORTFOLIO SCRIPT
═══════════════════════════════════════════ */

// ── CUSTOM CURSOR ──────────────────────────
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring || !window.matchMedia('(pointer: fine)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let visible = false;

  dot.style.opacity = ring.style.opacity = '0';

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    if (!visible) {
      rx = mx; ry = my;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      dot.style.opacity = ring.style.opacity = '1';
      visible = true;
    }
  });

  (function tick() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(tick);
  })();

  const hoverSel = 'a, button, .tag-cloud span, .project-card, .insp-card, .cta-card, .skill-block';
  document.querySelectorAll(hoverSel).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
    setTimeout(() => document.body.classList.remove('cursor-click'), 150);
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { if (visible) dot.style.opacity = ring.style.opacity = '1'; });
})();


// ── MOBILE MENU ────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    const open = navbar.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on nav link click
  navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


// ── STICKY HEADER & ACTIVE NAV ────────────
const header   = document.querySelector('.header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Sticky
  header.classList.toggle('sticky', window.scrollY > 80);

  // Close mobile menu on scroll
  if (navbar.classList.contains('open')) {
    navbar.classList.remove('open');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Active link highlight
  const scrollY = window.scrollY + 160;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { passive: true });


// ── TYPED TEXT ─────────────────────────────
const typedEl = document.querySelector('.typed-text');
if (typedEl && typeof Typed !== 'undefined') {
  new Typed('.typed-text', {
    strings: [
      'Software',
      'Web Applications',
      'Digital Experiences'
      
    ],
    typeSpeed:  70,
    backSpeed:  45,
    backDelay: 1800,
    loop:       true
  });
}


// ── SCROLL REVEAL ──────────────────────────
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    reset:    false,
    distance: '36px',
    duration: 750,
    delay:    80,
    easing:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  });

  sr.reveal('.hero-content',          { origin: 'left',   delay: 150 });
  sr.reveal('.hero-visual',           { origin: 'right',  delay: 250 });
  sr.reveal('.about-photo-side',      { origin: 'left',   delay: 150 });
  sr.reveal('.about-text-side',       { origin: 'right',  delay: 250 });
  sr.reveal('.section-eyebrow',       { origin: 'top',    delay:  80 });
  sr.reveal('.section-title',         { origin: 'top',    delay: 160 });
  sr.reveal('.skill-block',           { origin: 'bottom', delay: 80,  interval: 100 });
  sr.reveal('.project-card',          { origin: 'bottom', delay: 80,  interval: 120 });
  sr.reveal('.insp-card',             { origin: 'bottom', delay: 80,  interval: 100 });
  sr.reveal('.big-quote',             { origin: 'bottom', delay: 200 });
  sr.reveal('.cta-card',              { origin: 'bottom', delay: 100, interval: 120 });
}


// ── TAG CLOUD HOVER ────────────────────────
document.querySelectorAll('.tag-cloud span').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform  = 'translateY(-3px)';
    tag.style.transition = 'transform 0.2s ease';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'translateY(0)';
  });
});
