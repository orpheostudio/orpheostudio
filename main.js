// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = 'https://onyhbarnwvoqpwveyvhc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueWhiYXJud3ZvcXB3dmV5dmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTY0NDQsImV4cCI6MjA3MzE3MjQ0NH0.2zqN73ZxkqxlWLp49Kmrg1CUau0YAi7dee2EIyhodoI';

// Inicializa o cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ========================================
// WAITLIST FORM HANDLING
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const waitlistForm = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('email-input');
  const waitlistMsg = document.getElementById('waitlist-msg');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      // Validação básica
      if (!validateEmail(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
      }
      
      // Mostra loading
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      waitlistMsg.textContent = '';
      waitlistMsg.className = 'form-message';
      
      try {
        // Salva no Supabase
        const { data, error } = await supabase
          .from('waitlist')
          .insert([
            { 
              email: email,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) {
          // Verifica se é erro de email duplicado
          if (error.code === '23505') {
            throw new Error('Este email já está cadastrado na waitlist!');
          }
          throw error;
        }
        
        // Sucesso
        showMessage('🎉 Você foi adicionado à waitlist! Verifique seu email.', 'success');
        emailInput.value = '';
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'waitlist_signup', {
            'event_category': 'engagement',
            'event_label': 'Waitlist Form'
          });
        }
        
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        showMessage(error.message || 'Erro ao cadastrar. Tente novamente.', 'error');
      } finally {
        // Esconde loading
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
      }
    });
  }
});

// ========================================
// HELPER FUNCTIONS
// ========================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(message, type) {
  const waitlistMsg = document.getElementById('waitlist-msg');
  waitlistMsg.textContent = message;
  waitlistMsg.className = `form-message ${type}`;
}

// ========================================
// CONTACT MODAL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const contactBtn = document.getElementById('contact-btn');
  const modal = document.getElementById('contact-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = modal?.querySelector('.modal-overlay');
  const contactForm = document.getElementById('contact-form');
  
  // Abre modal
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Fecha modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
  
  // Fecha modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Formulário de contato
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('contact-name').value.trim(),
        email: document.getElementById('contact-email').value.trim(),
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value.trim()
      };
      
      const btnText = document.getElementById('contact-btn-text');
      const btnLoading = document.getElementById('contact-btn-loading');
      const contactMsg = document.getElementById('contact-msg');
      
      // Validação
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showContactMessage('Por favor, preencha todos os campos.', 'error');
        return;
      }
      
      // Mostra loading
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      contactMsg.textContent = '';
      
      try {
        // Salva no Supabase
        const { data, error } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) throw error;
        
        // Envia email usando mailto como fallback
        const mailtoLink = `mailto:contato@claudinei.ia.br?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
        )}`;
        
        // Abre cliente de email
        window.location.href = mailtoLink;
        
        // Sucesso
        showContactMessage('✓ Mensagem enviada! Abrindo seu cliente de email...', 'success');
        contactForm.reset();
        
        // Fecha modal após 2 segundos
        setTimeout(() => {
          closeModal();
        }, 2000);
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'contact_form_submit', {
            'event_category': 'engagement',
            'event_label': 'Contact Form'
          });
        }
        
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        showContactMessage('Erro ao enviar. Tente novamente.', 'error');
      } finally {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
      }
    });
  }
});

function showContactMessage(message, type) {
  const contactMsg = document.getElementById('contact-msg');
  contactMsg.textContent = message;
  contactMsg.className = `form-message ${type}`;
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignora links vazios
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Adiciona sombra quando rola
  if (currentScroll > 100) {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ========================================
// INTERSECTION OBSERVER - ANIMATIONS
// ========================================

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

// Observa seções para animar quando aparecem
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// ========================================
// FEATURE CARDS STAGGER ANIMATION
// ========================================

const featureCards = document.querySelectorAll('.feature-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100); // Delay progressivo
    }
  });
}, observerOptions);

featureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

// ========================================
// PARTICLES ANIMATION (Subtle)
// ========================================

const particlesBg = document.getElementById('particles-bg');

if (particlesBg) {
  // Cria partículas sutis
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = `rgba(255, 107, 53, ${Math.random() * 0.3})`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    particlesBg.appendChild(particle);
  }
}

// Adiciona animação de partícula ao CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(20px, -30px);
    }
    50% {
      transform: translate(-15px, -60px);
    }
    75% {
      transform: translate(15px, -30px);
    }
  }
`;
document.head.appendChild(style);

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Efeito especial quando o código Konami é ativado
  document.body.style.animation = 'rainbow 2s ease-in-out';
  
  const easterEggStyle = document.createElement('style');
  easterEggStyle.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(easterEggStyle);
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 2000);
  
  console.log('🎮 Easter egg ativado! Você encontrou o segredo do Claudinei!');
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('PerformanceObserver' in window) {
  // Monitora Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  });
  
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}

// ========================================
// COPY TO CLIPBOARD (para compartilhar)
// ========================================

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copiado para área de transferência');
    });
  } else {
    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Adiciona indicador de foco visível para navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
  body.keyboard-nav *:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }
`;
document.head.appendChild(a11yStyle);

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🤖 Claudinei', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cA IA que resolve. Sem frescura.', 'font-size: 14px; color: #004E89;');
console.log('%c\nDesenvolvido por S.ai+ Apps', 'font-size: 12px; color: #666;');
console.log('%c\nCurioso? Estamos contratando! 🚀', 'font-size: 12px; color: #F7B801;'); 