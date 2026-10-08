import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// User site (ron997.github.io), so assets resolve from the domain root.
// https://vite.dev/guide/static-deploy#github-pages
export default defineConfig({
  base: '/',
  plugins: [react()],
})
