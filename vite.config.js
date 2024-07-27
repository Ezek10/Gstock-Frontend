import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80, // Este es el puerto que usaremos en Docker
    watch: {
      usePolling: true, // Agrega esto si estás en Windows y el hot reload no funciona correctamente
    },
  },
})
