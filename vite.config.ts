import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the site run below a sub-path, e.g. "/greuter-website/" on
// GitHub Pages. Leave it unset for the domain root (www.greutergarten.ch).
const subPath = (process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')

export default defineConfig({
  base: subPath ? `/${subPath}/` : '/',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
})
