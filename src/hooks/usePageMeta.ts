import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor } from '../data/seo'
import { SITE_URL } from '../data/site'

/** Keeps title, description and canonical in sync on client-side navigation. */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + meta.path)
  }, [pathname])
}
