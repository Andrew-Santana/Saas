import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
  // Detectar ambiente de deploy
  // GitHub Pages usa /Saas/, Vercel e local usam /
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
  const base = command === 'build' && isGitHubPages ? '/Saas/' : '/';
  
  return {
  plugins: [react()],
  // Base path dinâmico: '/Saas/' apenas no GitHub Pages
  base,
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
    // Usar esbuild para minificação (padrão do Vite, mais rápido)
    minify: 'esbuild',
    // Configurações de otimização
    target: 'es2015',
    cssMinify: true,
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
}});
