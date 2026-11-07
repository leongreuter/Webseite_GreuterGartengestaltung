import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Footer } from './Footer'
import { Header } from './Header'
import { LightboxProvider } from './Lightbox'

/** Scroll to the top on page change, or to the #anchor if the URL has one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

export function Layout() {
  usePageMeta()
  const { pathname } = useLocation()

  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        Zum Inhalt
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        {/* Remounting per path replays the soft page fade-in. */}
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </LightboxProvider>
  )
}
