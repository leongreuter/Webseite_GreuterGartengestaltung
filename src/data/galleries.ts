// Service galleries ("Gartenwelten") on /dienstleistungen/.
//
// Each chapter has exactly GALLERY_SLOTS positions. To add a photo, put the
// original into assets-src/original, run `npm run images` and replace the
// next `null` below with { src: '/assets/<name>.webp', alt: '…' }.
// `null` renders a clearly marked placeholder ("Bild folgt").

export const GALLERY_SLOTS = 8

export interface GalleryImage {
  src: string
  alt: string
}

export interface ServiceChapter {
  id: string
  number: string
  title: string
  text: string
  closing: string
  /** Word used in the footer count when the gallery is complete. */
  unit: string
  /** Extra anchor ids (deep links from the home page). */
  anchors?: string[]
  /** Drawings are shown uncropped on a light background. */
  contain?: boolean
  images: (GalleryImage | null)[]
}

export const chapters: ServiceChapter[] = [
  {
    id: 'holz',
    number: '01',
    title: 'Holz',
    text: 'Holz bringt Natürlichkeit in den Garten. Als Sichtschutz, Gestaltungselement oder Platz zum Verweilen.',
    closing: 'Wärme, die bleibt.',
    unit: 'Impressionen',
    anchors: ['gestaltung'],
    images: [
      { src: '/assets/story-home-14.webp', alt: 'Sichtschutz aus Rundholz mit Sukkulenten-Bepflanzung' },
      { src: '/assets/story-home-5.webp', alt: 'Brennholzwände als Sichtschutz an einer Rasenfläche' },
      { src: '/assets/story-home-2.webp', alt: 'Kiesgarten mit Findlingen, Allium und blühenden Stauden' },
      { src: '/assets/story-home-13.webp', alt: 'Holzsteg an einem naturnahen Wasserbecken' },
      { src: '/assets/story-home-8.webp', alt: 'Steingarten mit Sukkulenten, Gräsern und Mauersteinen' },
      { src: '/assets/story-home-7.webp', alt: 'Wasserbecken mit Einfassung und Gräsern in einem Innenhof' },
      { src: '/assets/story-home-6.webp', alt: 'Kiesgarten mit Kugelsträuchern vor einer Hausfassade' },
      { src: '/assets/story-home-15.webp', alt: 'Moosbepflanzung um einen Baumstamm neben einem Plattenbelag' },
    ],
  },
  {
    id: 'stein',
    number: '02',
    title: 'Stein',
    text: 'Formen, Oberflächen und Farben mit Charakter. Stein verbindet Beständigkeit mit lebendiger Gestaltung.',
    closing: 'Von Natur aus einzigartig.',
    unit: 'Fotos',
    images: [
      { src: '/assets/greuter-stein-01.webp', alt: 'Natursteine mit bodendeckenden Pflanzen und gelben Blüten' },
      { src: '/assets/greuter-stein-02.webp', alt: 'Steingarten mit Kies, Findling und Gräsern' },
      { src: '/assets/greuter-stein-03.webp', alt: 'Natursteinpflaster mit begrünten Fugen' },
      { src: '/assets/greuter-stein-04.webp', alt: 'Kiesbeet mit Naturstein und Gräsern' },
      { src: '/assets/greuter-stein-05.webp', alt: 'Gartenweg und Treppen aus Naturstein' },
      { src: '/assets/greuter-stein-06.webp', alt: 'Kiesbepflanzung entlang eines Natursteinbelags' },
      { src: '/assets/greuter-stein-07.webp', alt: 'Kräuterspirale aus Naturstein mit Bepflanzung und kleinem Wasserbecken' },
      null,
    ],
  },
  {
    id: 'wasser',
    number: '03',
    title: 'Wasser',
    text: 'Wasser bringt Ruhe und Bewegung zusammen und wird zu einem besonderen Mittelpunkt im Garten.',
    closing: 'Ein Moment zum Ankommen.',
    unit: 'Fotos',
    images: [
      { src: '/assets/greuter-wasser-01.webp', alt: 'Wasserlauf zwischen Natursteinen mit japanischem Ahorn' },
      { src: '/assets/greuter-wasser-02.webp', alt: 'Gartenteich mit Holzsteg und naturnaher Einfassung' },
      { src: '/assets/greuter-wasser-03.webp', alt: 'Gartenteich mit Fischen und Holzterrasse' },
      { src: '/assets/greuter-wasser-04.webp', alt: 'Wasserspiel im Garten mit Natursteinen und Pflanzen' },
      { src: '/assets/greuter-wasser-05.webp', alt: 'Naturnaher Gartenteich mit vielfältiger Bepflanzung' },
      { src: '/assets/greuter-wasser-06.webp', alt: 'Teichpflanzen und Seerosen zwischen Natursteinen' },
      null,
      null,
    ],
  },
  {
    id: 'licht',
    number: '04',
    title: 'Licht',
    text: 'Licht lenkt den Blick auf Details und lässt am Abend eine neue Gartenstimmung entstehen.',
    closing: 'Wenn der Garten weiterlebt.',
    unit: 'Fotos',
    images: [
      { src: '/assets/greuter-licht-01.webp', alt: 'Beleuchtete Holzwand und Gartenpflanzen am Abend' },
      { src: '/assets/greuter-licht-02.webp', alt: 'Gartenbeleuchtung an Wasserbecken und Bäumen' },
      { src: '/assets/greuter-licht-03.webp', alt: 'Beleuchteter Baum und Spiegelungen im Gartenteich' },
      { src: '/assets/greuter-licht-04.webp', alt: 'Abendstimmung mit beleuchteter Bepflanzung am Wasser' },
      { src: '/assets/greuter-licht-05.webp', alt: 'Mit Licht inszenierter Baum und Naturstein im Garten' },
      null,
      null,
      null,
    ],
  },
  {
    id: 'mauern',
    number: '05',
    title: 'Mauern',
    text: 'Mauern geben Halt, gliedern den Garten und verbinden klare Linien mit natürlichem Material.',
    closing: 'Räume schaffen. Natur verbinden.',
    unit: 'Fotos',
    images: [
      { src: '/assets/greuter-mauern-01.webp', alt: 'Gartenmauer aus Steinblöcken mit Holzabschluss' },
      { src: '/assets/greuter-mauern-02.webp', alt: 'Geschwungene Sandsteinmauern mit Treppe' },
      { src: '/assets/greuter-mauern-03.webp', alt: 'Natursteinmauer entlang eines Kiesgartens' },
      { src: '/assets/greuter-mauern-04.webp', alt: 'Natursteintreppe mit angrenzender Trockenmauer' },
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 'belaege',
    number: '06',
    title: 'Beläge',
    text: 'Wege und Plätze verbinden die einzelnen Gartenräume. Material und Form geben den passenden Rhythmus vor.',
    closing: 'Wege zu Ihren Lieblingsplätzen.',
    unit: 'Fotos',
    images: [
      { src: '/assets/greuter-belaege-01.webp', alt: 'Plattenbelag im Garten mit Naturstein und Bepflanzung' },
      { src: '/assets/greuter-belaege-02.webp', alt: 'Grossformatiger Plattenbelag auf einem Gartensitzplatz' },
      { src: '/assets/greuter-belaege-03.webp', alt: 'Gartenweg und Sitzplatz aus Luserna-Naturstein' },
      { src: '/assets/greuter-belaege-04.webp', alt: 'Sandsteinmosaik mit angrenzenden Mauern und Treppe' },
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 'plaene',
    number: '07',
    title: 'Pläne',
    text: 'Wir denken Möglichkeiten weiter und bringen Materialien, Pflanzen und Ihre Vorstellungen in ein stimmiges Konzept.',
    closing: 'Am Anfang steht Ihre Idee.',
    unit: 'Pläne',
    anchors: ['planung'],
    contain: true,
    images: [
      { src: '/assets/greuter-plaene-01.webp', alt: 'Gartenentwurf als kolorierter Grundriss' },
      { src: '/assets/greuter-plaene-02.webp', alt: 'Perspektivischer Gartenentwurf für einen Eingangsbereich' },
      { src: '/assets/greuter-plaene-03.webp', alt: 'Entwurfsskizzen für Sichtschutz und Pflanzgefässe' },
      { src: '/assets/greuter-plaene-04.webp', alt: 'Perspektivische Planung für einen Garten zwischen Gebäuden' },
      { src: '/assets/greuter-plaene-05.webp', alt: 'Gartenplanung mit Holzterrasse und Bepflanzung' },
      { src: '/assets/greuter-plaene-06.webp', alt: 'Grundriss und Ansichten einer naturnahen Gartenplanung' },
      { src: '/assets/greuter-plaene-07.webp', alt: 'Gestaltungsentwurf für Garten mit Schwimmbecken' },
      { src: '/assets/greuter-plaene-08.webp', alt: 'Perspektivische Gartenplanung mit Terrasse und Natursteinmauer' },
    ],
  },
]

/** Always returns exactly GALLERY_SLOTS entries (missing ones become null). */
export function gallerySlots(chapter: ServiceChapter): (GalleryImage | null)[] {
  return Array.from({ length: GALLERY_SLOTS }, (_, i) => chapter.images[i] ?? null)
}

export function chapterFootLabel(chapter: ServiceChapter): string {
  const slots = gallerySlots(chapter)
  const photos = slots.filter(Boolean).length
  const missing = slots.length - photos
  const nn = String(photos).padStart(2, '0')
  return missing > 0 ? `${nn} Fotos · ${missing} Platzhalter` : `${nn} ${chapter.unit}`
}
