import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'

const delay = (i: number) => ({ '--i': i }) as CSSProperties

/**
 * Heading lines that slide up out of a mask on page load
 * (used for the page titles). Each array entry is one line.
 */
export function Lines({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((line, i) => (
        <span className="line" key={i} style={delay(i)}>
          <span>{line}</span>
        </span>
      ))}
    </>
  )
}

/**
 * Heading text that appears word by word once it scrolls into view. Each
 * array entry is one line. The page activates it via
 * useInViewClass(root, '.words', 'is-in').
 */
export function Words({ lines }: { lines: string[] }) {
  let n = 0
  return (
    <span className="words">
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(' ').map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="w" style={delay(n++)}>
                {word}
              </span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </span>
  )
}

/**
 * Opens every `.reveal-img` inside `root` like a curtain once it scrolls into
 * view. The parent is observed, because a fully clipped element never counts
 * as intersecting.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const targets = [...el.querySelectorAll<HTMLElement>('.reveal-img')]
    const reveal = (t: HTMLElement) => t.classList.add('is-revealed')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return targets.forEach(reveal)

    const byParent = new Map(targets.map((t) => [t.parentElement ?? t, t]))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = byParent.get(entry.target as HTMLElement)
          if (target) reveal(target)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    byParent.forEach((_, parent) => observer.observe(parent))
    return () => observer.disconnect()
  }, [root])
}

/**
 * Moves the image inside the returned element slightly slower than the page
 * scrolls. The element needs the `parallax` class (see base.css); the image
 * is 24% taller than its frame, so `strength` must stay below ~9.6 (%).
 */
export function useParallax<T extends HTMLElement>(strength = 9) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const frame = ref.current
    const img = frame?.querySelector('img')
    if (!frame || !img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < 0 || r.top > vh) return
      const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh))
      img.style.transform = `translate3d(0, ${(progress * -strength).toFixed(2)}%, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [strength])

  return ref
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Calls `update` on scroll and resize, at most once per frame. */
function useScrollFrame(update: () => void) {
  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      update()
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

/**
 * Scales `bar` horizontally (0..1) by how far the page has scrolled through
 * `track`. Counting starts when the track reaches the bar and ends when its
 * last line enters the viewport. Also reports the id of the child of `track`
 * that is currently being read (null before the first and after the last).
 */
export function useScrollProgress(
  track: RefObject<HTMLElement | null>,
  bar: RefObject<HTMLElement | null>,
  onCurrent: (id: string | null) => void,
) {
  useScrollFrame(() => {
    if (!track.current || !bar.current) return
    const r = track.current.getBoundingClientRect()
    const start = bar.current.getBoundingClientRect().bottom
    const distance = r.height - (window.innerHeight - start)
    bar.current.style.transform = `scaleX(${clamp01(distance > 0 ? (start - r.top) / distance : 1).toFixed(4)})`

    // The current child is the last one whose top has passed just below the bar.
    let current: string | null = null
    for (const child of track.current.children) {
      if (child.getBoundingClientRect().top <= start + 110) current = child.id
    }
    onCurrent(r.bottom > start ? current : null)
  })
}

const TWIG = [
  'M60 410 C 120 330, 150 260, 200 200 S 290 80, 340 20',
  'M110 336 C 70 330, 40 305, 28 268 C 66 270, 98 296, 110 336 Z',
  'M150 268 C 110 250, 80 215, 72 170 C 115 180, 145 215, 150 268 Z',
  'M188 214 C 225 190, 262 190, 296 210 C 262 236, 222 238, 188 214 Z',
  'M232 140 C 200 110, 190 72, 200 32 C 232 60, 244 100, 232 140 Z',
  'M272 96 C 305 84, 338 92, 362 116 C 330 132, 296 126, 272 96 Z',
]

/**
 * Decorative twig whose stem and leaves draw themselves as it scrolls through
 * the viewport. Fully drawn without JavaScript or with reduced motion.
 */
export function Twig() {
  const ref = useRef<SVGSVGElement>(null)

  useScrollFrame(() => {
    const svg = ref.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = svg.getBoundingClientRect()
    const vh = window.innerHeight
    if (r.bottom < 0 || r.top > vh) return
    // 0 when the twig enters at the bottom, 1 once its centre passes mid-screen.
    const p = clamp01((vh - r.top) / (vh / 2 + r.height / 2))
    svg.querySelectorAll('path').forEach((path, i) => {
      path.style.strokeDashoffset = String(1 - clamp01(p * 1.6 - i * 0.12))
    })
  })

  return (
    <svg ref={ref} className="twig" viewBox="0 0 400 420" aria-hidden="true">
      {TWIG.map((d) => (
        <path key={d} d={d} pathLength={1} strokeDasharray={1} />
      ))}
    </svg>
  )
}
