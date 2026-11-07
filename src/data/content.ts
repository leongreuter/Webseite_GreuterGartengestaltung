// Page content taken from the existing website.

export const heroSlides = [
  { src: '/assets/greuter-home-feuerplatz.webp', alt: 'Feuerschale mit Grillplatte und beleuchtetem Garten', position: '50% 60%' },
  { src: '/assets/greuter-home-steingarten.webp', alt: 'Gartenanlage mit Naturstein, Wasser und japanischem Ahorn', position: '50% 55%' },
  { src: '/assets/greuter-home-dachgarten.webp', alt: 'Naturnah bepflanzte Dachbegrünung mit Blüten und Gräsern', position: '50% 50%' },
  { src: '/assets/greuter-home-sauna.webp', alt: 'Gartenlounge, Sauna und Wasserbecken auf einer Holzterrasse', position: '50% 50%' },
  { src: '/assets/greuter-home-wasserbecken.webp', alt: 'Wasserbecken mit Natursteineinfassung und Bepflanzung', position: '50% 55%' },
]

export const homeServices = [
  {
    number: '01',
    title: 'Gartenplanung',
    text: 'Ihre Wünsche, klare Ideen und ein Konzept, das zu Ihrem Zuhause passt.',
    to: '/dienstleistungen/#planung',
    img: '/assets/build-1.webp',
    alt: 'Gartenplanung und Gestaltung mit natürlichen Materialien',
  },
  {
    number: '02',
    title: 'Gartengestaltung',
    text: 'Stein, Holz, Wasser und Pflanzen. Sorgfältig zusammengebracht.',
    to: '/dienstleistungen/#gestaltung',
    img: '/assets/greuter-gartengestaltung-ahorn.webp',
    alt: 'Gartengestaltung mit japanischem Ahorn, Natursteinmauer und üppiger Bepflanzung',
    position: '60% 55%',
  },
  {
    number: '03',
    title: 'Gartenpflege',
    text: 'Fachkundige Pflege, damit Ihr Garten sich natürlich entfalten kann.',
    to: '/dienstleistungen/#pflege',
    img: '/assets/care-1.webp',
    alt: 'Fachkundig gepflegter Garten',
  },
]

export const homeProjects = [
  { src: '/assets/home-13.webp', alt: 'Natur & Struktur' },
  { src: '/assets/home-9.webp', alt: 'Raum zum Aufblühen' },
]

export interface TeamMember {
  name: string
  role: string
  text?: string
  photo?: string
}

// No additional people. Members without a photo show a marked placeholder.
export const team: TeamMember[] = [
  {
    name: 'Tobias Greuter',
    role: 'Inhaber · Planung & Gestaltung',
    text: 'Seit 2005 baut Tobias Greuter den Betrieb auf. Seine Stärke: kreative Lösungen, die zum Menschen und zum Garten passen.',
    photo: '/assets/team-1.webp',
  },
  {
    name: 'Oliver Jaggi',
    role: 'Gartengestaltung & Pflanzen',
    text: 'Seit 2010 im Team. Mit einem besonderen Gespür für Pflanzen, Tiere und die naturnahe Gestaltung.',
    photo: '/assets/team-2.webp',
  },
  {
    name: 'Jelena Lehmann',
    role: 'Gartenbau & Pflege',
    text: 'Mit Freude beim Gestalten und Pflegen dabei. Begeistert von Kräutern, Vögeln und Naturschutz.',
    photo: '/assets/team-3.webp',
  },
  { name: 'Zoe Rechsteiner', role: 'Team Greuter' },
  { name: 'Lina Kunz', role: 'Team Greuter' },
]

export const values = [
  { number: '01', title: 'Naturnah', text: 'Mit Pflanzen und Materialien, die zum Standort passen.' },
  { number: '02', title: 'Persönlich', text: 'Mit einem offenen Ohr für Ihre Wünsche.' },
  { number: '03', title: 'Sorgfältig', text: 'Mit Freude am Gestalten und am Handwerk.' },
]

export const serviceSteps = [
  { label: '01 / KENNENLERNEN', title: 'Wir hören zu.', text: 'Sie erzählen uns von Ihrem Garten, Ihren Wünschen und Ihren Vorstellungen.' },
  { label: '02 / ENTWICKELN', title: 'Wir denken mit.', text: 'Wir betrachten die Möglichkeiten und entwickeln passende Lösungen mit Ihnen.' },
  { label: '03 / UMSETZEN', title: 'Wir packen an.', text: 'Wir bringen die Ideen in Ihren Garten und begleiten auf Wunsch seine weitere Entwicklung.' },
]

export const contactSteps = [
  { label: '01 / Erzählen', text: 'Sie schildern Ihre Idee.' },
  { label: '02 / Kennenlernen', text: 'Wir besprechen Ihr Vorhaben.' },
  { label: '03 / Weiterdenken', text: 'Wir klären das Vorgehen.' },
]

export const contactTopics = ['Gartengestaltung', 'Gartenpflege', 'Gartenplanung', 'Etwas anderes'] as const
export type ContactTopic = (typeof contactTopics)[number]
