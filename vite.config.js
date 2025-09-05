import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace "Notiva" with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  base: '/Notiva/', // 👈 Important for GitHub Pages
})

