import { Link } from 'react-router-dom'
import { ArrowIcon } from './ArrowIcon'
import { Words } from './Motion'

export function CtaSection() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap cta-inner">
        <div>
          <div className="eyebrow">Ihr Garten beginnt mit einer Idee</div>
          <h2 id="cta-title">
            <Words lines={['Was darf in Ihrem', 'Garten wachsen?']} />
          </h2>
        </div>
        <Link className="button" to="/kontakt/">
          Lernen wir uns kennen
          <span className="arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  )
}
