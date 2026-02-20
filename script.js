/* ═══════════════════════════════════════════════════════════════
CLAUDINEI · AmplaAI Platforms — script.js
═══════════════════════════════════════════════════════════════ */

‘use strict’;

// ── Cookie Consent ──────────────────────────────────────────────
const COOKIE_KEY = ‘claudinei_cookie_consent’;
const COOKIE_VERSION = ‘1’;

function getCookieConsent() {
try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch { return null; }
}

function setCookieConsent(data) {
data.version = COOKIE_VERSION;
data.date = new Date().toISOString();
localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
}

function hideCookieBanner() {
const banner = document.getElementById(‘cookie-banner’);
if (banner) banner.classList.add(‘hidden’);
}

window.acceptCookies = function() {
setCookieConsent({ essential: true, analytics: true, ads: true, functional: true, all: true });
hideCookieBanner();
loadAnalytics();
loadAds();
};

window.rejectCookies = function() {
setCookieConsent({ essential: true, analytics: false, ads: false, functional: false, all: false });
hideCookieBanner();
};

window.openCookieSettings = function() {
const consent = getCookieConsent();
if (consent) {
document.getElementById(‘ck-analytics’).checked = !!consent.analytics;
document.getElementById(‘ck-ads’).checked = !!consent.ads;
document.getElementById(‘ck-func’).checked = !!consent.functional;
}
document.getElementById(‘cookie-modal’).classList.remove(‘hidden’);
document.getElementById(‘cookie-banner’).classList.add(‘hidden’);
};

window.closeCookieSettings = function() {
document.getElementById(‘cookie-modal’).classList.add(‘hidden’);
};

window.saveCustomCookies = function() {
const analytics = document.getElementById(‘ck-analytics’).checked;
const ads = document.getElementById(‘ck-ads’).checked;
const func = document.getElementById(‘ck-func’).checked;
setCookieConsent({ essential: true, analytics, ads, functional: func, all: analytics && ads && func });
document.getElementById(‘cookie-modal’).classList.add(‘hidden’);
if (analytics) loadAnalytics();
if (ads) loadAds();
};

function loadAnalytics() {
// Trigger Google Analytics if consent given
if (typeof gtag !== ‘undefined’) {
gtag(‘consent’, ‘update’, { analytics_storage: ‘granted’ });
}
}

function loadAds() {
// Trigger AdSense if consent given
if (typeof gtag !== ‘undefined’) {
gtag(‘consent’, ‘update’, { ad_storage: ‘granted’, ad_user_data: ‘granted’, ad_personalization: ‘granted’ });
}
}

// Close cookie modal on overlay click
document.addEventListener(‘click’, function(e) {
const modal = document.getElementById(‘cookie-modal’);
if (modal && e.target === modal) window.closeCookieSettings();
});

// Init cookie consent on load
(function initCookies() {
const consent = getCookieConsent();
if (!consent) {
// Show banner after 800ms
setTimeout(() => {
const banner = document.getElementById(‘cookie-banner’);
if (banner) banner.classList.remove(‘hidden-init’);
}, 800);
} else {
hideCookieBanner();
if (consent.analytics) loadAnalytics();
if (consent.ads) loadAds();
}
})();

// ── Navbar ──────────────────────────────────────────────────────
const navbar = document.getElementById(‘navbar’);
const mobileToggle = document.getElementById(‘mobile-toggle’);
const navMenu = document.getElementById(‘nav-menu’);

window.addEventListener(‘scroll’, () => {
if (navbar) navbar.classList.toggle(‘scrolled’, window.scrollY > 30);
}, { passive: true });

if (mobileToggle && navMenu) {
mobileToggle.addEventListener(‘click’, () => {
const isOpen = navMenu.classList.toggle(‘open’);
mobileToggle.classList.toggle(‘open’, isOpen);
mobileToggle.setAttribute(‘aria-expanded’, isOpen);
mobileToggle.setAttribute(‘aria-label’, isOpen ? ‘Fechar menu’ : ‘Abrir menu’);
});
}

// Active nav link on scroll
const sections = document.querySelectorAll(‘section[id]’);
const navLinks = document.querySelectorAll(’.nav-link[href^=”#”]’);

const sectionObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
navLinks.forEach(link => {
link.classList.toggle(‘active’, link.getAttribute(‘href’) === ‘#’ + entry.target.id);
});
}
});
}, { rootMargin: ‘-30% 0px -60% 0px’ });

sections.forEach(sec => sectionObserver.observe(sec));

// Close mobile menu on link click
navLinks.forEach(link => {
link.addEventListener(‘click’, () => {
navMenu.classList.remove(‘open’);
mobileToggle.classList.remove(‘open’);
mobileToggle.setAttribute(‘aria-expanded’, ‘false’);
});
});

// Dropdown keyboard accessibility
document.querySelectorAll(’.nav-dropdown-btn’).forEach(btn => {
btn.addEventListener(‘click’, (e) => {
e.stopPropagation();
const isExpanded = btn.getAttribute(‘aria-expanded’) === ‘true’;
btn.setAttribute(‘aria-expanded’, !isExpanded);
});
});

document.addEventListener(‘click’, () => {
document.querySelectorAll(’.nav-dropdown-btn’).forEach(btn => btn.setAttribute(‘aria-expanded’, ‘false’));
});

// ── Typing Text Animation ───────────────────────────────────────
const typingEl = document.getElementById(‘typing-text’);
const phrases = [
‘Programação’,
‘Japonês’,
‘Matemática’,
‘Cultura Japonesa’,
‘Idiomas’,
‘Lógica de Programação’,
‘Inteligência Artificial’,
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer = null;

function typeWriter() {
if (!typingEl) return;
const current = phrases[phraseIdx];

if (isDeleting) {
charIdx–;
typingEl.textContent = current.slice(0, charIdx);
typingTimer = setTimeout(typeWriter, 60);
} else {
charIdx++;
typingEl.textContent = current.slice(0, charIdx);
typingTimer = setTimeout(typeWriter, charIdx < current.length ? 90 : 1800);
}

if (!isDeleting && charIdx === current.length) {
isDeleting = true;
clearTimeout(typingTimer);
typingTimer = setTimeout(typeWriter, 1800);
return;
}

if (isDeleting && charIdx === 0) {
isDeleting = false;
phraseIdx = (phraseIdx + 1) % phrases.length;
}
}

// Start typing after fonts load
document.fonts.ready.then(() => {
setTimeout(typeWriter, 600);
});

// ── Scroll Reveal ───────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
setTimeout(() => entry.target.classList.add(‘visible’), i * 60);
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

document.querySelectorAll(’.feature-card, .value-card, .about-grid > *, .faq-item’).forEach(el => {
el.classList.add(‘reveal’);
revealObserver.observe(el);
});

// ── FAQ Accordion ───────────────────────────────────────────────
document.querySelectorAll(’.faq-question’).forEach(btn => {
btn.addEventListener(‘click’, () => {
const isExpanded = btn.getAttribute(‘aria-expanded’) === ‘true’;
const answerId = btn.getAttribute(‘aria-controls’);
const answer = document.getElementById(answerId);

```
// Close all
document.querySelectorAll('.faq-question').forEach(other => {
  other.setAttribute('aria-expanded', 'false');
  const id = other.getAttribute('aria-controls');
  const el = document.getElementById(id);
  if (el) el.hidden = true;
});

// Toggle current
if (!isExpanded) {
  btn.setAttribute('aria-expanded', 'true');
  if (answer) answer.hidden = false;
}
```

});
});

// ── Smooth scroll for anchor links ─────────────────────────────
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function(e) {
const target = document.querySelector(this.getAttribute(‘href’));
if (target) {
e.preventDefault();
const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue(’–navbar-h’)) || 70;
const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
window.scrollTo({ top, behavior: ‘smooth’ });
}
});
});

// ── Animated Counter ────────────────────────────────────────────
function animateCounter(el, end, suffix = ‘’) {
let start = 0;
const duration = 1600;
let startTime = null;

function step(ts) {
if (!startTime) startTime = ts;
const progress = Math.min((ts - startTime) / duration, 1);
const eased = 1 - Math.pow(1 - progress, 3);
const val = Math.floor(eased * end);
el.textContent = (val >= 1000 ? Math.floor(val / 1000) + ‘K’ : val) + suffix;
if (progress < 1) requestAnimationFrame(step);
else el.textContent = (end >= 1000 ? Math.floor(end / 1000) + ‘K’ : end) + suffix;
}
requestAnimationFrame(step);
}

const statsObs = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const nums = entry.target.querySelectorAll(’.stat-number’);
const data = [10000, 5000, 3000];
nums.forEach((el, i) => animateCounter(el, data[i] || 0, ‘+’));
statsObs.disconnect();
}
});
}, { threshold: 0.5 });

const heroStats = document.querySelector(’.hero-stats’);
if (heroStats) statsObs.observe(heroStats);

// ── Particles (canvas) ──────────────────────────────────────────
(function initParticles() {
const container = document.getElementById(‘particles-bg’);
if (!container) return;

const canvas = document.createElement(‘canvas’);
canvas.style.cssText = ‘position:absolute;inset:0;width:100%;height:100%;opacity:0.35’;
container.appendChild(canvas);
const ctx = canvas.getContext(‘2d’);

let W, H, particles = [];
const N = 55;

function resize() {
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
}

function Particle() {
this.x = Math.random() * W;
this.y = Math.random() * H;
this.r = Math.random() * 1.5 + 0.4;
this.vx = (Math.random() - 0.5) * 0.3;
this.vy = (Math.random() - 0.5) * 0.3;
this.alpha = Math.random() * 0.6 + 0.2;
this.color = Math.random() > 0.5 ? ‘108,60,225’ : ‘168,85,247’;
}

function init() {
resize();
particles = Array.from({ length: N }, () => new Particle());
}

function draw() {
ctx.clearRect(0, 0, W, H);
particles.forEach(p => {
p.x += p.vx; p.y += p.vy;
if (p.x < 0 || p.x > W) p.vx *= -1;
if (p.y < 0 || p.y > H) p.vy *= -1;
ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
ctx.fill();
});
requestAnimationFrame(draw);
}

window.addEventListener(‘resize’, resize, { passive: true });
init();
draw();
})();

// ── Keyboard trap for modals ────────────────────────────────────
document.addEventListener(‘keydown’, e => {
if (e.key === ‘Escape’) {
window.closeCookieSettings && window.closeCookieSettings();
}
});

// ── 404 redirect guard (for SPA-like navigation) ────────────────
// If user navigates to unknown pages, handled by 404.html