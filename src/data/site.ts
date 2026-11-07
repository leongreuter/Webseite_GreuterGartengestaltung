// Confirmed business information (source: existing website / greutergarten.ch).
// Change company details here only – header, footer, contact page, legal
// texts and structured data all read from this file.

export const SITE_URL = 'https://www.greutergarten.ch'

export const company = {
  name: 'Greuter Gartengestaltung',
  legalName: 'Greuter Gartenbau & -pflege',
  owner: 'Tobias Greuter',
  foundingYear: 2005,
  street: 'Zur Säge 25',
  zip: '8606',
  city: 'Greifensee',
  country: 'Schweiz',
  countryCode: 'CH',
  phone: '+41 79 403 28 54',
  phoneHref: 'tel:+41794032854',
  email: 'tgreuter@greutergarten.ch',
  web: 'www.greutergarten.ch',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Zur+S%C3%A4ge+25+8606+Greifensee',
} as const

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/ueber-uns/', label: 'Über uns' },
  { to: '/dienstleistungen/', label: 'Dienstleistungen' },
  { to: '/kontakt/', label: 'Kontakt' },
] as const

export const partner = {
  name: 'Bioterra',
  url: 'https://www.bioterra.ch/',
  logo: '/assets/bioterra-logo.webp',
} as const
