import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon'

export default function NotFound() {
  return (
    <section className="section wrap" aria-labelledby="nf-title">
      <div className="eyebrow">Fehler 404</div>
      <h1 id="nf-title" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
        Diese Seite gibt es nicht.
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: 480 }}>
        Vielleicht wurde sie verschoben. Hier geht es zurück zu unseren Gärten.
      </p>
      <Link className="button" to="/">
        Zur Startseite
        <span className="arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      </Link>
    </section>
  )
}
