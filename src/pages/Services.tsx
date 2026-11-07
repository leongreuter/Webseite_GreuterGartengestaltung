import { useEffect, useRef, useState, type CSSProperties } from 'react'
import '../styles/services.css'
import { ArrowIcon } from '../components/ArrowIcon'
import { CtaSection } from '../components/CtaSection'
import { Img } from '../components/Img'
import { useLightbox } from '../components/Lightbox'
import { Lines, Words } from '../components/Motion'
import { serviceSteps } from '../data/content'
import { chapterFootLabel, chapters, gallerySlots, type GalleryImage, type ServiceChapter } from '../data/galleries'
import { useInViewClass } from '../hooks/useInViewClass'

function Chapter({ chapter }: { chapter: ServiceChapter }) {
  const openLightbox = useLightbox()
  const slots = gallerySlots(chapter)
  const photos = slots.filter((s): s is GalleryImage => s !== null)

  return (
    <section className={`chapter${chapter.contain ? ' is-contain' : ''}`} id={chapter.id} aria-labelledby={`story-${chapter.id}`}>
      {chapter.anchors?.map((anchor) => <span key={anchor} id={anchor} className="chapter-anchor" />)}
      <div className="chapter-line" aria-hidden="true" />
      <div className="chapter-heading">
        <div className="chapter-title">
          <span className="chapter-index">{chapter.number}</span>
          <h2 id={`story-${chapter.id}`}>{chapter.title}</h2>
        </div>
        <p>{chapter.text}</p>
      </div>

      <div className="photos">
        {slots.map((image, i) => {
          const nn = String(i + 1).padStart(2, '0')
          const style = { '--photo-order': i } as CSSProperties
          if (!image) {
            return (
              <figure key={i} className="gallery-placeholder" style={style}>
                <div>
                  <span className="placeholder-index" aria-hidden="true">
                    {nn}
                  </span>
                  <p>Bild folgt</p>
                </div>
              </figure>
            )
          }
          return (
            <figure key={image.src} style={style}>
              <button
                type="button"
                className="photo-button"
                aria-label={`${image.alt} – Bild vergrössern`}
                onClick={() => openLightbox(photos, photos.indexOf(image), { contain: chapter.contain })}
              >
                <Img src={image.src} alt={image.alt} sizes={i === 0 ? '(max-width: 520px) 100vw, 50vw' : '(max-width: 520px) 50vw, 25vw'} />
              </button>
              <span className="image-number" aria-hidden="true">
                {nn}
              </span>
            </figure>
          )
        })}
      </div>

      <div className="chapter-foot">
        <span>{chapter.closing}</span>
        <span>{chapterFootLabel(chapter)}</span>
      </div>
    </section>
  )
}

export default function Services() {
  const root = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<string | null>(null)

  useInViewClass(root, '.chapter', 'is-entering', 0.06)
  useInViewClass(root, '.section-heading p, .steps article, .cta .button', 'scroll-enter')
  useInViewClass(root, '.words', 'is-in', 0.3)

  // Highlight the chapter currently in view in the sticky topic navigation.
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-90px 0px -55% 0px', threshold: 0 },
    )
    el.querySelectorAll('.chapter').forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={root}>
      <div id="greuter-story">
        <div className="story-intro">
          <div className="story-kicker">Greuter Gartengestaltung · Gartenbau</div>
          <h1>
            <Lines>{['Gärten entstehen', 'aus guten Details.']}</Lines>
          </h1>
          <p>
            Holz, Stein, Wasser und Licht. Wege, Mauern und neue Ideen. Entdecken Sie die Elemente, die Ihren Garten zu
            Ihrem Garten machen.
          </p>
          <a className="story-scroll" href="#holz">
            <span />
            Unsere Gartenwelten <ArrowIcon direction="down" />
          </a>
        </div>

        <nav className="story-navigation" aria-label="Gartenbau-Themen">
          {chapters.map((c) => (
            <a key={c.id} href={`#${c.id}`} aria-current={current === c.id ? 'location' : undefined}>
              <span>{c.number}</span>
              {c.title}
            </a>
          ))}
        </nav>

        <div className="chapters">
          {chapters.map((chapter) => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>

      <section className="section dark care-section" aria-label="Gartenpflege und Biodiversität">
        <div className="wrap section-heading">
          <div id="pflege">
            <div className="eyebrow">Gartenpflege</div>
            <h2>
              <Words lines={['Damit Ihr Garten aufblüht.']} />
            </h2>
            <p>Wir pflegen Ihre Umgebung fachkundig und mit Blick auf die Jahreszeiten.</p>
          </div>
          <div id="natur">
            <div className="eyebrow">Biodiversität</div>
            <h2>
              <Words lines={['Mehr Leben im Garten.']} />
            </h2>
            <p>Standortgerechte Pflanzen und vielfältige Strukturen schaffen wertvolle Lebensräume für Tiere und Insekten.</p>
          </div>
        </div>
      </section>

      <section className="section dark" aria-labelledby="steps-title">
        <div className="wrap">
          <div className="eyebrow">So gehen wir gemeinsam vor</div>
          <h2 id="steps-title">
            <Words lines={['Von Mensch zu Mensch.', 'Von Idee zu Garten.']} />
          </h2>
          <div className="steps">
            {serviceSteps.map((s) => (
              <article key={s.label}>
                <span className="number">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
