import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['three']
  },
  build: {
    commonjsOptions: {
      include: [/three/, /node_modules/]
    },
    rollupOptions: {
      external: []  // Retirez 'three' d'ici
    }
  },
  resolve: {
    alias: {
      'three': 'three'
    }
  }
});