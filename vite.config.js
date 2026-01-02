import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'pages/about.html'),
                solutions: resolve(__dirname, 'pages/solutions.html'),
                projects: resolve(__dirname, 'pages/projects.html'),
                blog: resolve(__dirname, 'pages/blog.html'),
                contact: resolve(__dirname, 'pages/contact.html')
            }
        },
        minify: 'terser',
        sourcemap: true
    },
    server: {
        port: 3000,
        open: true
    },
    css: {
        postcss: './postcss.config.js'
    }
});