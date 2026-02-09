// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', activeNavLink);

// MOBILE MENU TOGGLE
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });
}

// TYPING EFFECT
const typingText = document.getElementById('typing-text');
const texts = [
  'Ensino',
  'Programação',
  'Japonês',
  'Cultura Japonesa',
  'Idiomas'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

if (typingText) {
  typeEffect();
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#login' && href !== '#waitlist') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ANIMATED PARTICLES BACKGROUND
const particlesBg = document.getElementById('particles-bg');

function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = Math.random() * 4 + 1 + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = `rgba(${99 + Math.random() * 40}, ${102 + Math.random() * 40}, ${241}, ${Math.random() * 0.5})`;
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.pointerEvents = 'none';
  
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  particle.style.animation = `particleFloat ${duration}s ${delay}s infinite ease-in-out`;
  
  particlesBg.appendChild(particle);
}

// Add particle float animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
      opacity: 0.8;
    }
    90% {
      opacity: 0.5;
    }
  }
`;
document.head.appendChild(style);

// Create initial particles
for (let i = 0; i < 30; i++) {
  createParticle();
}

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// FLOATING WINDOWS ANIMATION
const floatingWindows = document.querySelectorAll('.floating-window');

floatingWindows.forEach((window, index) => {
  const randomX = (Math.random() - 0.5) * 20;
  const randomY = (Math.random() - 0.5) * 20;
  const randomRotate = (Math.random() - 0.5) * 5;
  
  window.style.setProperty('--random-x', `${randomX}px`);
  window.style.setProperty('--random-y', `${randomY}px`);
  window.style.setProperty('--random-rotate', `${randomRotate}deg`);
});

// Add custom float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(var(--random-x, 10px), var(--random-y, -10px)) rotate(var(--random-rotate, 2deg));
    }
    66% {
      transform: translate(calc(var(--random-x, 10px) * -1), var(--random-y, 10px)) rotate(calc(var(--random-rotate, 2deg) * -1));
    }
  }
`;
document.head.appendChild(floatStyle);

// FEATURE CARDS HOVER EFFECT
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.setProperty('--mouse-x', '50%');
    this.style.setProperty('--mouse-y', '50%');
  });

  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.style.setProperty('--mouse-x', `${x}%`);
    this.style.setProperty('--mouse-y', `${y}%`);
  });
});

// STATS COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const number = entry.target.querySelector('.stat-number');
      const target = number.textContent;
      
      if (!isNaN(target)) {
        animateCounter(number, parseInt(target));
        entry.target.classList.add('counted');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// GRADIENT CURSOR EFFECT (Desktop only)
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// PERFORMANCE OPTIMIZATION: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
  // Press '/' to focus on search (if implemented)
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    // Focus search input if exists
  }

  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  }
});

// SCROLL TO TOP BUTTON (appears after scrolling down)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 15l-6-6-6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
  z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'translateY(-4px)';
  scrollTopBtn.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'translateY(0)';
  scrollTopBtn.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.4)';
});

// CONSOLE EASTER EGG
console.log(
  '%cClaudinei IA 🤖',
  'color: #6366f1; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(99, 102, 241, 0.3);'
);
console.log(
  '%cDesenvolvido pela AmplaAI Platforms',
  'color: #8b5cf6; font-size: 14px;'
);
console.log(
  '%cCurioso? Estamos contratando! 🚀',
  'color: #ec4899; font-size: 12px;'
);

// PERFORMANCE MONITORING
if (window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
  });
}