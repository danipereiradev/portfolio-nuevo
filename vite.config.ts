import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    historyApiFallback: true,
    // En local, reenvía las functions a producción para poder probar el popup.
    proxy: {
      '/.netlify/functions': {
        target: 'https://36web.es',
        changeOrigin: true,
      },
    },
  },
});
