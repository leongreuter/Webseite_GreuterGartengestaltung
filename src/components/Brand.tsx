import { Link } from 'react-router-dom'
import { partner } from '../data/site'
import { asset } from '../lib/base'

/** Greuter logo plus the Bioterra partner logo, as in the original header and footer. */
export function Brand() {
  return (
    <div className="brand-group">
      <Link className="brand" to="/" aria-label="Greuter Gartengestaltung – Home">
        <img src={asset('/assets/greuter-logo.png')} alt="Greuter Gartengestaltung" width={693} height={323} />
      </Link>
      <a
        className="bioterra-brand"
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} – Website öffnen`}
      >
        <img src={asset(partner.logo)} alt={partner.name} width={120} height={60} />
      </a>
    </div>
  )
}
