// Main Application Entry Point
import { initNavigation } from './navigation.js';
import { loadComponents } from './components.js';
import { initAnimations } from './animations.js';
import { initForms } from './form-handler.js';
import { Analytics } from './analytics.js';

class AmplaAIApp {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize core modules
        this.initializeModules();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial content
        await this.loadInitialContent();
        
        // Initialize analytics
        this.analytics = new Analytics();
        
        console.log('AmplaAI Application initialized');
    }

    initializeModules() {
        initNavigation();
        loadComponents();
        initAnimations();
        initForms();
    }

    setupEventListeners() {
        // Global event listeners
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    async loadInitialContent() {
        const page = window.location.hash.substring(1) || 'home';
        await this.loadPage(page);
    }

    async loadPage(pageId) {
        try {
            // Show loading state
            document.getElementById('main-content').classList.add('loading');
            
            // Fetch page content
            const response = await fetch(`/pages/${pageId}.html`);
            const html = await response.text();
            
            // Update main content
            document.getElementById('main-content').innerHTML = html;
            
            // Remove loading state
            document.getElementById('main-content').classList.remove('loading');
            
            // Initialize page-specific scripts
            this.initializePageScripts(pageId);
            
            // Track page view
            if (this.analytics) {
                this.analytics.trackPageView(pageId);
            }
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page content');
        }
    }

    initializePageScripts(pageId) {
        // Page-specific initialization
        switch(pageId) {
            case 'home':
                this.initHomePage();
                break;
            case 'projects':
                this.initProjectsPage();
                break;
            // Add more cases as needed
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleResize() {
        // Handle responsive behavior
    }

    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        document.getElementById('main-content').appendChild(errorEl);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AmplaAIApp();
});