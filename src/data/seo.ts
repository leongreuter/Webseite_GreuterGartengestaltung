import { SITE_URL, company } from './site'

export interface PageMeta {
  path: string
  title: string
  description: string
}

// Per-page titles and descriptions. Used by the client (on navigation) and
// by scripts/prerender.mjs (static HTML for search engines).
export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Gartengestaltung Greifensee · Greuter Gartengestaltung',
    description:
      'Naturnahe Gartengestaltung, Gartenplanung und Gartenpflege aus Greifensee – seit 2005 im Zürcher Oberland. Persönlich geplant, sorgfältig umgesetzt.',
  },
  {
    path: '/ueber-uns/',
    title: 'Über uns · Greuter Gartengestaltung Greifensee',
    description:
      'Lernen Sie das Team von Greuter Gartengestaltung kennen: Gartenbau und naturnahe Gartengestaltung aus Greifensee, seit 2005.',
  },
  {
    path: '/dienstleistungen/',
    title: 'Dienstleistungen · Gartenbau, Gartenplanung & Gartenpflege · Greuter',
    description:
      'Holz, Stein, Wasser, Licht, Mauern, Beläge und Pläne: Gartenbau, Gartenplanung und Gartenpflege von Greuter Gartengestaltung in Greifensee und im Zürcher Oberland.',
  },
  {
    path: '/kontakt/',
    title: 'Kontakt · Greuter Gartengestaltung Greifensee',
    description:
      'Gartenprojekt besprechen: Greuter Gartengestaltung, Zur Säge 25, 8606 Greifensee. Telefon +41 79 403 28 54, tgreuter@greutergarten.ch.',
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Seite nicht gefunden · Greuter Gartengestaltung',
  description: 'Diese Seite existiert nicht. Zurück zu Greuter Gartengestaltung in Greifensee.',
}

export function metaFor(pathname: string): PageMeta {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return pages.find((p) => p.path === normalized) ?? notFoundMeta
}

// LocalBusiness structured data – confirmed facts only.
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.name,
  url: SITE_URL,
  image: `${SITE_URL}/assets/greuter-home-feuerplatz.webp`,
  logo: `${SITE_URL}/assets/greuter-logo.png`,
  telephone: company.phone.replace(/\s/g, ''),
  email: company.email,
  foundingDate: String(company.foundingYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.zip,
    addressLocality: company.city,
    addressCountry: company.countryCode,
  },
  description:
    'Naturnahe Gartengestaltung, Gartenplanung und Gartenpflege aus Greifensee.',
}
