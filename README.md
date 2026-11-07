# Greuter Gartengestaltung – Website

Originalgetreue Reproduktion der bestehenden Website
(Referenz: `greuter-gartengestaltung-neu.leongreuter.chatgpt.site`) als
React-/TypeScript-Anwendung mit statischem Pre-Rendering.

## Schnellstart

```bash
npm install
npm run dev        # Entwicklung: http://localhost:5173
npm run build      # Produktion: erzeugt dist/
npm run preview    # dist/ lokal ansehen: http://localhost:4173
```

## Veröffentlichen

`npm run build` erzeugt in `dist/` fertige HTML-Dateien pro Seite
(`/`, `/ueber-uns/`, `/dienstleistungen/`, `/kontakt/`, `404.html`) sowie
`sitemap.xml` und `robots.txt`. Den Inhalt von `dist/` auf einen beliebigen
Webhost hochladen (Apache, Nginx, Netlify, Cloudflare Pages, Hostpoint, …).
Es sind weder ein Server noch Rewrite-Regeln nötig.

**Mit GitHub Pages (automatisch):** siehe [GITHUB-ANLEITUNG.md](GITHUB-ANLEITUNG.md).
Für eine Unteradresse wie `…github.io/greuter-website/` beim Build die
Variable `BASE_PATH=greuter-website` setzen. Der GitHub-Workflow macht das
automatisch.

Die Domain ist zentral in `src/data/site.ts` (`SITE_URL`) hinterlegt
(Canonical-URLs, Sitemap, Strukturdaten).

## Aufbau

```
assets-src/original/    Originalbilder der Referenz (unverändert, Quelle)
public/assets/          optimierte WebP-Bilder (+ 960px-Varianten), generiert
scripts/
  optimize-images.mjs   npm run images – erzeugt public/assets + image-meta.json
  prerender.mjs         statisches HTML pro Seite, Sitemap, robots.txt
src/
  data/
    site.ts             Firmendaten, Navigation (eine Quelle für alle Seiten)
    content.ts          Texte, Hero-Slides, Team, Werte, Abläufe
    galleries.ts        die 7 Dienstleistungsgalerien mit je 8 Bildpositionen
    seo.ts              Seitentitel, Meta-Descriptions, LocalBusiness-JSON-LD
  components/           Header, Footer, HeroSlideshow, Lightbox, LegalDialog …
  pages/                Home, About, Services, Contact, NotFound
  styles/               CSS 1:1 aus der Referenz übernommen (pro Seite gekapselt)
  lib/contact.ts        Formularvalidierung und -versand
```

## Bilder ergänzen oder austauschen

1. Originalfoto in `assets-src/original/` ablegen (JPG, PNG oder WebP).
2. `npm run images` ausführen.
3. In `src/data/galleries.ts` die nächste `null`-Position ersetzen:
   `{ src: '/assets/<dateiname>.webp', alt: 'Beschreibung des Bildes' }`.

Jede Galerie hat immer genau 8 Positionen. Eine `null`-Position wird als
Platzhalter „Bild folgt“ angezeigt. Der Zähler unter der Galerie (z. B.
„07 Fotos · 1 Platzhalter“) passt sich automatisch an.

Porträts für Zoe Rechsteiner und Lina Kunz: Foto ablegen, `npm run images`,
dann in `src/data/content.ts` beim Teammitglied `photo: '/assets/<name>.webp'`
ergänzen.

## Kontaktformular

Wie im Original öffnet das Formular nach erfolgreicher Prüfung das
E-Mail-Programm des Besuchers mit einer vorbereiteten Anfrage. Die Website
speichert und versendet keine Daten.

Für einen späteren serverseitigen Versand beim Build die Variable
`VITE_CONTACT_ENDPOINT` setzen (z. B. in `.env`). Das Formular sendet die
Anfrage dann als JSON-POST an diese URL. Felder: `topic, name, email, phone,
place, message, reply`. Bitte dann auch den Datenschutztext anpassen.

## Technische Entscheidungen

- **React + TypeScript + Vite + React Router + Lucide**, wie gewünscht.
- **Kein Tailwind und kein Framer Motion**: Die Referenz basiert auf
  handgeschriebenem CSS mit CSS-Animationen. Das CSS wurde 1:1 übernommen. So
  entsprechen Abstände, Schriftgrössen und Animationen exakt dem Original
  (per Messung im Browser verglichen). Eine Übersetzung in Tailwind-Klassen
  oder Motion-Komponenten hätte nur Abweichungen und Abhängigkeiten gebracht.
- **Schriften selbst gehostet** (`@fontsource`, DM Sans + Manrope): keine
  Verbindung zu Google Fonts.
- **Pre-Rendering** statt reiner Single-Page-App: Jede Seite ist als HTML
  indexierbar und funktioniert auf jedem statischen Host.

## Hinweise zur Originaltreue

- Die Referenz-Website hat einen **dunkelgrünen Hintergrund (#0f2204)** mit
  **weissem Greuter-Logo**. Das wurde so übernommen. Die Angabe
  „greutergarten.ch“ unter dem Logo gibt es in der Referenz nicht und wurde
  deshalb nicht ergänzt.
- Das **Bioterra-Logo** steht in der Referenz neben dem Greuter-Logo (Header
  und Footer) und wurde übernommen.
- Ergänzt gegenüber der Referenz (gemäss Auftrag): Lightbox mit
  Vor/Zurück, Tastatur und Wischgeste in allen Dienstleistungsgalerien,
  Wischgeste in der Hero-Slideshow, SVG-Icons statt Textsymbolen (☰, Ⅱ, ×),
  Fehlermeldungen direkt am Formularfeld.
- Die Holz-Galerie hatte im Original nur generische Alt-Texte. Sie wurden
  durch Bildbeschreibungen ersetzt.

## Vor dem Livegang prüfen

- **Datenschutz / Impressum** (`src/components/LegalDialog.tsx`): Die Texte
  stammen aus der Referenz. Angepasst wurde nur der Abschnitt zu Hosting und
  Schriften, weil Hosting-Anbieter und Schriftquelle sich ändern. Bitte den
  endgültigen Wortlaut prüfen lassen.
- `SITE_URL` in `src/data/site.ts` auf die endgültige Domain setzen.
