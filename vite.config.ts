import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Base path para GitHub Pages - ajuste 'Saas' para o nome do seu repositório
  base: process.env.NODE_ENV === 'production' ? '/Saas/' : '/',
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
    }
  },
  build: {
    // Desabilitar source maps em produção por segurança
    sourcemap: false,
    // Otimizações para produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
          i18n: ['react-i18next', 'i18next'],
          analytics: ['react-helmet-async'],
        }
      }
    }
  }
});
