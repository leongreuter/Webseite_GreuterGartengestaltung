import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import './styles/base.css'
import { App } from './App'
import { metaFor } from './data/seo'
import { BASE, stripBase } from './lib/base'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename={BASE || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are pre-rendered (scripts/prerender.mjs) and hydrated.
// If a host serves markup of a different route (e.g. index.html as fallback
// for an unknown URL) or in dev, render from scratch instead.
if (container.dataset.path === metaFor(stripBase(window.location.pathname)).path) {
  hydrateRoot(container, app)
} else {
  container.innerHTML = ''
  createRoot(container).render(app)
}
