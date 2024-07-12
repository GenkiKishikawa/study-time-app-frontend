import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-cookie'],
  },
  server: {
    port: 3001,
    host: true,
    fs: {
      cachedChecks: false
    },
  },
})
