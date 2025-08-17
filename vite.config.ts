import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // allow external access
    port: 5173,
    allowedHosts: [
      '.ngrok-free.app',   // allow any ngrok subdomain
    ],
    proxy: {
      // 👇 optional: proxy /api requests to Flask backend
      '/api': {
        target: 'http://localhost:4933',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
