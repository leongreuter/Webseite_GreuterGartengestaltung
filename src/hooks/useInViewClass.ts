import { useEffect, type RefObject } from 'react'

/**
 * Adds `className` to every element matching `selector` inside `root` once it
 * scrolls into view (same behaviour as the original site scripts). Content is
 * fully visible without JavaScript; motion is skipped for reduced-motion users.
 */
export function useInViewClass(
  root: RefObject<HTMLElement | null>,
  selector: string,
  className: string,
  threshold = 0.08,
) {
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(className)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold },
    )
    el.querySelectorAll(selector).forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [root, selector, className, threshold])
}
