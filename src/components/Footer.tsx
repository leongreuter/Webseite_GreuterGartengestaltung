import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, navItems } from '../data/site'
import { Brand } from './Brand'
import { LegalDialog, type LegalKind } from './LegalDialog'

export function Footer() {
  const [legal, setLegal] = useState<LegalKind | null>(null)

  return (
    <footer className="wrap site-footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            Mit der Natur. Für Ihr Zuhause.
            <br />
            Gartengestaltung und Pflege aus {company.city}.
          </p>
        </div>
        <div>
          <h2>Entdecken</h2>
          <nav className="links" aria-label="Footer-Navigation">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Wir sind für Sie da</h2>
          <a href={company.phoneHref}>{company.phone}</a>
          <br />
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <p>
            {company.street} · {company.zip} {company.city}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <span>
          <button type="button" onClick={() => setLegal('privacy')}>
            Datenschutz
          </button>
          {' · '}
          <button type="button" onClick={() => setLegal('imprint')}>
            Impressum
          </button>
        </span>
        <span>Natürlich. Persönlich. Greuter.</span>
      </div>
      <LegalDialog kind={legal} onClose={() => setLegal(null)} />
    </footer>
  )
}
