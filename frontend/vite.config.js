// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': '/src',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@assets': '/src/assets'
    }
  },

  server: {
    port: 5173
  }
});
