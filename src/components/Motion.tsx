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
