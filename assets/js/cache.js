// Cache Manager
class CacheManager {
    constructor() {
        this.cacheName = 'amplai-cache-v1';
        this.maxAge = 24 * 60 * 60 * 1000; // 24 hours
    }

    async get(key) {
        try {
            const cache = await caches.open(this.cacheName);
            const response = await cache.match(key);
            
            if (!response) return null;
            
            const data = await response.json();
            
            // Check if cache is stale
            if (Date.now() - data.timestamp > this.maxAge) {
                await this.delete(key);
                return null;
            }
            
            return data.value;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    async set(key, value) {
        try {
            const cache = await caches.open(this.cacheName);
            const data = {
                value,
                timestamp: Date.now()
            };
            
            const response = new Response(JSON.stringify(data));
            await cache.put(key, response);
        } catch (error) {
            console.error('Cache set error:', error);
        }
    }

    async delete(key) {
        try {
            const cache = await caches.open(this.cacheName);
            await cache.delete(key);
        } catch (error) {
            console.error('Cache delete error:', error);
        }
    }

    async clear() {
        try {
            await caches.delete(this.cacheName);
        } catch (error) {
            console.error('Cache clear error:', error);
        }
    }
}

export const cache = new CacheManager();