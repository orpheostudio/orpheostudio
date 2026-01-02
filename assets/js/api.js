// API Service
const API_BASE_URL = 'https://api.amplai.com/v1';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('auth_token');
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        const config = {
            ...options,
            headers
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Contact endpoints
    async submitContactForm(data) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async getProjects() {
        return this.request('/projects');
    }

    async getBlogPosts(page = 1, limit = 10) {
        return this.request(`/blog?page=${page}&limit=${limit}`);
    }

    async subscribeNewsletter(email) {
        return this.request('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    }

    // Analytics
    async trackEvent(eventName, data = {}) {
        return this.request('/analytics/event', {
            method: 'POST',
            body: JSON.stringify({
                event: eventName,
                ...data,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            })
        });
    }
}

// Singleton instance
export const api = new ApiService();