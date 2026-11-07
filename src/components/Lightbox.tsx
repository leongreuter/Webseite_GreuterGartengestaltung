import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { imageInfo } from '../data/images'
import { asset } from '../lib/base'

export interface LightboxImage {
  src: string
  alt: string
}

interface LightboxState {
  images: LightboxImage[]
  index: number
  contain: boolean
}

type OpenLightbox = (images: LightboxImage[], index: number, options?: { contain?: boolean }) => void

const LightboxContext = createContext<OpenLightbox>(() => {})

export const useLightbox = () => useContext(LightboxContext)

const pad = (n: number) => String(n).padStart(2, '0')

/** Shared modal image viewer: buttons, arrow keys, Escape and swipe. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const [state, setState] = useState<LightboxState | null>(null)

  const open = useCallback<OpenLightbox>((images, index, options) => {
    setState({ images, index, contain: Boolean(options?.contain) })
  }, [])

  const step = useCallback((delta: number) => {
    setState((s) => (s ? { ...s, index: (s.index + delta + s.images.length) % s.images.length } : s))
  }, [])

  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const dialog = dialogRef.current
    if (state && dialog && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [state])

  const current = state?.images[state.index]
  const many = (state?.images.length ?? 0) > 1

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="dialog lightbox"
        aria-label="Bildansicht"
        onClose={() => {
          document.documentElement.style.overflow = ''
          setState(null)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onKeyDown={(e) => {
          if (!many) return
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        <button type="button" className="dialog-close" aria-label="Schliessen" onClick={close}>
          <X aria-hidden="true" />
        </button>
        {state && current && (
          <>
            <div
              className={`lightbox-stage${state.contain ? ' is-contain' : ''}`}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null || !many) return
                const dx = e.changedTouches[0].clientX - touchX.current
                if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1)
                touchX.current = null
              }}
            >
              <img
                key={current.src}
                src={asset(current.src)}
                alt={current.alt}
                width={imageInfo(current.src)?.width}
                height={imageInfo(current.src)?.height}
              />
              {many && (
                <>
                  <button type="button" className="lightbox-nav prev" aria-label="Vorheriges Bild" onClick={() => step(-1)}>
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="lightbox-nav next" aria-label="Nächstes Bild" onClick={() => step(1)}>
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <div className="lightbox-bar">
              <span>{current.alt}</span>
              {many && (
                <span aria-live="polite">
                  {pad(state.index + 1)} / {pad(state.images.length)}
                </span>
              )}
            </div>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  )
}
