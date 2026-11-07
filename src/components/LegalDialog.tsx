import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { company } from '../data/site'

export type LegalKind = 'privacy' | 'imprint'

// Texts taken from the existing website. Only the hosting / font passage was
// adapted: fonts are now self-hosted, the hosting provider is not yet known.
// ⚠ Please have the final wording checked before going live.
function Imprint() {
  return (
    <div className="legal">
      <h2>Impressum</h2>
      <p>
        {company.legalName}
        <br />
        {company.owner}
        <br />
        {company.street}
        <br />
        {company.zip} {company.city}
        <br />
        Telefon: <a href={company.phoneHref}>{company.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
      <p>
        Fotografien: Greuter Gartengestaltung.
        <br />
        Inhalte und Originalbilder basieren auf greutergarten.ch.
      </p>
    </div>
  )
}

function Privacy() {
  return (
    <div className="legal">
      <h2>Datenschutz</h2>
      <p>
        Verantwortlich für diese Website: {company.legalName}, {company.owner}, {company.street}, {company.zip}{' '}
        {company.city}. Kontakt: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
      <p>
        Diese Website verwendet keine Analyse- oder Werbetracker und speichert keine Kontaktformulare. Das
        Anfrageformular öffnet Ihr E-Mail-Programm. Die Übermittlung erfolgt erst, wenn Sie die E-Mail selbst
        versenden. Ihre Angaben werden zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
      <p>
        Beim Aufruf der Website können durch den Hostinganbieter technische Zugriffsdaten verarbeitet werden,
        beispielsweise IP-Adresse, Zeitpunkt und aufgerufene Seite. Schriftarten werden direkt von dieser Website
        geladen; es wird keine Verbindung zu Drittanbietern hergestellt. Die Karte wird erst nach Klick als externe
        Seite (Google Maps) geöffnet.
      </p>
      <p>Für Auskunft, Berichtigung oder Löschung Ihrer bei uns gespeicherten Angaben kontaktieren Sie uns bitte per E-Mail.</p>
    </div>
  )
}

export function LegalDialog({ kind, onClose }: { kind: LegalKind | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (kind && dialog && !dialog.open) dialog.showModal()
  }, [kind])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-label={kind === 'imprint' ? 'Impressum' : 'Datenschutz'}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close()
      }}
    >
      <button type="button" className="dialog-close" aria-label="Schliessen" onClick={() => ref.current?.close()}>
        <X aria-hidden="true" />
      </button>
      {kind === 'imprint' && <Imprint />}
      {kind === 'privacy' && <Privacy />}
    </dialog>
  )
}
