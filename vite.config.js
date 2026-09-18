import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://fazal305.github.io/cinescope/, a project (not user/org) Pages site.
  base: '/cinescope/',
  plugins: [react()],
})
