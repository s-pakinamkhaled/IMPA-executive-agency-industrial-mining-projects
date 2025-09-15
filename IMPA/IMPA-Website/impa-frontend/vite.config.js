import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    // 👇 Ensure all routes fallback to index.html
    fs: {
      strict: false,
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  preview: {
    port: 3000,
    host: true,
    // 👇 Add SPA fallback for preview
    proxy: {},
  },
  // 👇 This ensures correct fallback in production too
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 👇 Most important: fallback for history API
  esbuild: {},
})
