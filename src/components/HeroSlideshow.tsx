import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pause, Play } from 'lucide-react'
import { heroSlides } from '../data/content'
import { ArrowIcon } from './ArrowIcon'
import { Img } from './Img'
import { Lines } from './Motion'

const INTERVAL = 6000
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Full-bleed cross-fading slideshow (original "home-cinema"). Auto-advances
 * every 6 s and pauses while it is off-screen, the tab is hidden, a control
 * has keyboard focus, the user paused it or prefers reduced motion.
 */
export function HeroSlideshow() {
  const ref = useRef<HTMLElement>(null)
  const touchX = useRef<number | null>(null)
  const [index, setIndex] = useState(0)
  // The outgoing slide keeps zooming while it fades out (no jump back).
  const [previous, setPrevious] = useState<number | null>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const [hasFocus, setHasFocus] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const count = heroSlides.length

  const show = useCallback(
    (next: number) =>
      setIndex((current) => {
        const target = (next + count) % count
        if (target !== current) setPrevious(current)
        return target
      }),
    [count],
  )

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) setUserPaused(true)
    const onMotion = (e: MediaQueryListEvent) => e.matches && setUserPaused(true)
    motion.addEventListener('change', onMotion)

    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    let observer: IntersectionObserver | undefined
    if (ref.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting), { threshold: 0.05 })
      observer.observe(ref.current)
    }
    return () => {
      motion.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
      observer?.disconnect()
    }
  }, [])

  // Restart the timer whenever the slide changes or a pause condition flips.
  useEffect(() => {
    if (userPaused || !inView || hasFocus || !pageVisible) return
    const timer = window.setTimeout(() => show(index + 1), INTERVAL)
    return () => window.clearTimeout(timer)
  }, [index, userPaused, inView, hasFocus, pageVisible, show])

  return (
    <section
      ref={ref}
      className="home-cinema"
      aria-label="Gartenimpressionen von Greuter"
      aria-roledescription="Diashow"
      onFocus={(e) => e.target.matches(':focus-visible') && setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false)
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      <div className="cinema-images">
        {heroSlides.map((slide, i) => (
          <Img
            key={slide.src}
            className={`cinema-slide${i === index ? ' is-active' : i === previous ? ' is-leaving' : ''}`}
            src={slide.src}
            alt={slide.alt}
            position={slide.position}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            aria-hidden={i !== index}
          />
        ))}
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="wrap cinema-content">
        <div className="eyebrow">Mit der Natur. Seit 2005.</div>
        <h1>
          <Lines>
            {[
              'Hier beginnt',
              <>
                Ihr <em>Lieblingsplatz.</em>
              </>,
            ]}
          </Lines>
        </h1>
        <p>
          Gartengestaltung und Pflege aus Greifensee.
          <br />
          Persönlich geplant, sorgfältig umgesetzt.
        </p>
        <Link className="button" to="/dienstleistungen/">
          Gartenwelten entdecken
          <span className="arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </div>
      <div className="wrap cinema-controls">
        <div className="cinema-selection" role="group" aria-label="Bildauswahl">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className="cinema-dot"
              aria-label={`Bild ${i + 1} anzeigen`}
              aria-pressed={i === index}
              onClick={() => show(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="cinema-actions">
          <span className="cinema-count" aria-hidden="true">
            {pad(index + 1)} / {pad(count)}
          </span>
          <button
            type="button"
            className="cinema-pause"
            aria-label={userPaused ? 'Automatische Diashow starten' : 'Automatische Diashow pausieren'}
            aria-pressed={userPaused}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  )
}
