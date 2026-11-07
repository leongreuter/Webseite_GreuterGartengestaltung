import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { ArrowIcon } from '../components/ArrowIcon'
import { CtaSection } from '../components/CtaSection'
import { HeroSlideshow } from '../components/HeroSlideshow'
import { Img } from '../components/Img'
import { useLightbox } from '../components/Lightbox'
import { useParallax, useReveal, Words } from '../components/Motion'
import { homeProjects, homeServices } from '../data/content'
import { useInViewClass } from '../hooks/useInViewClass'

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  const openLightbox = useLightbox()
  const ethosPhoto = useParallax<HTMLDivElement>()
  useInViewClass(root, '.section-heading p, .service-card, .ethos-photo, .ethos > div:last-child, .project-tile, .cta .button', 'scroll-enter')
  useInViewClass(root, '.words', 'is-in', 0.3)
  useReveal(root)

  return (
    <div ref={root}>
      <HeroSlideshow />
      <div className="wrap">
        <div className="hero-bottom">
          <span>Planen · Gestalten · Pflegen</span>
          <span>
            Verwurzelt in Greifensee <ArrowIcon direction="down-right" />
          </span>
        </div>
      </div>

      <section className="section wrap" aria-labelledby="services-title">
        <div className="eyebrow">Was wir für Sie tun</div>
        <div className="section-heading">
          <h2 id="services-title">
            <Words lines={['Von der ersten Idee', 'bis zum Gartenleben.']} />
          </h2>
          <p>Ein Garten ist nie einfach fertig. Wir begleiten ihn – von der Planung und Gestaltung bis zur sorgfältigen Pflege.</p>
        </div>
        <div className="service-grid">
          {homeServices.map((s, i) => (
            <Link key={s.number} className="service-card" to={s.to}>
              <div className="photo reveal-img" style={{ '--d': i } as CSSProperties}>
                <Img src={s.img} alt={s.alt} position={s.position} sizes="(max-width: 650px) 100vw, 33vw" />
              </div>
              <span className="number">{s.number}</span>
              <h3>
                {s.title}
                <span className="arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </h3>
              <p>{s.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="projects-title">
        <div className="eyebrow">Einblicke in unsere Arbeit</div>
        <div className="section-heading">
          <h2 id="projects-title">
            <Words lines={['Jeder Garten', 'hat seine eigene Art.']} />
          </h2>
          <p>
            Entdecken Sie Materialien, Stimmungen und lebendige Details aus unseren Gärten. Lassen Sie sich von unseren
            Gärten inspirieren.
          </p>
        </div>
        <div className="project-grid">
          {homeProjects.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className="project-tile"
              aria-label={`${p.alt} – Bild vergrössern`}
              onClick={() => openLightbox(homeProjects, i)}
            >
              <div className="photo reveal-img" style={{ '--d': i } as CSSProperties}>
                <Img src={p.src} alt={p.alt} sizes="(max-width: 650px) 100vw, 55vw" />
              </div>
              <span className="caption">
                <span>{p.alt}</span>
                <span>
                  Bild ansehen <ArrowIcon />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section dark" aria-labelledby="ethos-title">
        <div className="wrap ethos">
          <div className="ethos-photo parallax" ref={ethosPhoto}>
            <Img src="/assets/home-6.webp" alt="Natürliche Gartenanlage mit Pflanzen und Stein" sizes="(max-width: 650px) 100vw, 45vw" />
          </div>
          <div>
            <div className="eyebrow">Unsere Haltung</div>
            <h2 id="ethos-title">
              <Words lines={['Schöne Gärten.', 'Lebendige Natur.']} />
            </h2>
            <p>
              Wir verbinden Gestaltung mit ökologischer Verantwortung. Standortgerechte Pflanzen, natürliche Materialien
              und eine Pflege, die natürliche Kreisläufe stärkt.
            </p>
            <p>So entstehen persönliche Freiräume – und wertvolle Lebensräume für Pflanzen und Tiere.</p>
            <Link className="button" to="/ueber-uns/">
              Mehr über uns
              <span className="arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
            <div className="values">
              <span>Naturnah gedacht</span>
              <span>Persönlich begleitet</span>
              <span>Sorgfältig umgesetzt</span>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
