/**
 * ====================================
 * JS para Microinterações e Transições
 * Arquivo: js/main.js
 * ====================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------
    // 1. Efeito de Aparecimento (Fade-In-Up) ao Rolar a Página
    // ------------------------------------
    
    // Configurações do observador
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    // Callback para quando um elemento entra ou sai da viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento estiver visível, adiciona a classe de visibilidade
                entry.target.classList.add('is-visible');
                // Parar de observar depois de aparecer
                observer.unobserve(entry.target);
            }
        });
    };

    // Inicializa o Intersection Observer
    const sectionsToAnimate = document.querySelectorAll('.highlight-card, .solution-card, .footer-col');
    
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionsToAnimate.forEach(element => {
            // Adiciona a classe base para o estado inicial (opacity: 0, translateY(20px))
            element.classList.add('fade-in-up');
            // Começa a observar
            observer.observe(element);
        });
    }

    // ------------------------------------
    // 2. Microinteração do Menu Ativo (Opcional, mas útil para fluidez)
    // ------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Verifica se o href do link corresponde ao arquivo atual
        if (linkPath === currentPath) {
            // Adiciona um estilo neon ou cor de destaque ao link ativo
            link.classList.add('active-neon');
            link.style.color = 'var(--color-neon-purple)';
            link.style.textShadow = '0 0 8px var(--color-neon-purple)';
        }
    });

});

// Instrução: Certifique-se de que as variáveis CSS (--color-neon-purple, etc.) estão definidas em style.css
