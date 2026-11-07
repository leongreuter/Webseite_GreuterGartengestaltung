import { useRef, useState, type FormEvent } from 'react'
import '../styles/contact.css'
import { ArrowIcon } from '../components/ArrowIcon'
import { Img } from '../components/Img'
import { Lines, useReveal, Words } from '../components/Motion'
import { contactSteps, contactTopics, type ContactTopic } from '../data/content'
import { company } from '../data/site'
import { useInViewClass } from '../hooks/useInViewClass'
import { MESSAGE_MAX, sendContactRequest, validateContact, type ContactErrors, type ContactRequest } from '../lib/contact'

const usesEndpoint = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT)

const empty = { name: '', email: '', phone: '', place: '', message: '' }

export default function Contact() {
  const root = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [topic, setTopic] = useState<ContactTopic>('Gartengestaltung')
  const [fields, setFields] = useState(empty)
  const [reply, setReply] = useState<ContactRequest['reply']>('E-Mail')
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<{ text: string; error?: boolean }>({ text: '' })
  const [busy, setBusy] = useState(false)

  useInViewClass(root, '.gc-body, .gc-after', 'gc-seen')
  useInViewClass(root, '.words', 'is-in', 0.3)
  useReveal(root)

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
    setStatus({ text: '' })
  }

  const messageLabel = topic === 'Etwas anderes' ? 'Ihre Nachricht *' : `Ihre Idee zur ${topic} *`

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const data: ContactRequest = { topic, reply, ...fields }
    const found = validateContact(data)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      setStatus({ text: 'Bitte prüfen Sie die markierten Felder.', error: true })
      return
    }
    setBusy(true)
    try {
      const result = await sendContactRequest(data)
      if (result === 'sent') {
        setFields(empty)
        setStatus({ text: 'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns bei Ihnen.' })
      } else {
        setStatus({
          text: `Ihre E-Mail ist vorbereitet. Bitte senden Sie sie in Ihrem E-Mail-Programm ab. Falls es sich nicht öffnet, schreiben Sie direkt an ${company.email}.`,
        })
      }
    } catch {
      setStatus({ text: `Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie direkt an ${company.email}.`, error: true })
    } finally {
      setBusy(false)
    }
  }

  const fieldProps = (key: keyof ContactErrors) => ({
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })
  const errorText = (key: keyof ContactErrors) =>
    errors[key] && (
      <span className="gc-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    )

  return (
    <div id="contact-presence" ref={root}>
      <div className="gc-page">
        <section className="gc-hero">
          <div className="gc-intro">
            <div className="gc-kicker">Greuter Gartengestaltung / Kontakt</div>
            <h1>
              <Lines>{['Lernen wir', <em key="em">uns kennen.</em>]}</Lines>
            </h1>
            <p>Ob erste Idee oder konkretes Vorhaben: Wir freuen uns darauf, Ihren Garten kennenzulernen.</p>
          </div>
          <figure className="gc-photo reveal-img">
            <Img src="/assets/home-13.webp" alt="Naturnahe Gartengestaltung von Greuter" loading="eager" />
            <figcaption className="gc-caption">Persönlich. Natürlich. Greuter.</figcaption>
          </figure>
        </section>

        <section className="gc-body" aria-label="Kontaktmöglichkeiten">
          <address className="gc-direct" style={{ fontStyle: 'normal' }}>
            <span className="visually-hidden">
              {company.name}, {company.street}, {company.zip} {company.city}, {company.country}. Web: {company.web}
            </span>
            <div className="gc-actions">
              <a className="gc-link" href={company.phoneHref}>
                <span>
                  Anrufen<small>{company.phone}</small>
                </span>
                <ArrowIcon />
              </a>
              <a className="gc-link" href={`mailto:${company.email}`}>
                <span>
                  E-Mail schreiben<small>{company.email}</small>
                </span>
                <ArrowIcon />
              </a>
              <a className="gc-link" href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                <span>
                  Anfahrt
                  <small>
                    {company.street} · {company.zip} {company.city}
                  </small>
                </span>
                <ArrowIcon />
              </a>
            </div>
          </address>

          <form className="gc-form" ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="form-title">
            <div className="gc-kicker">Ihre Gartenidee</div>
            <h2 id="form-title">Worüber sprechen wir?</h2>

            <fieldset className="gc-topics">
              <legend>Das interessiert mich</legend>
              <div className="gc-topic-list">
                {contactTopics.map((t) => (
                  <button key={t} type="button" className="gc-topic" aria-pressed={topic === t} onClick={() => setTopic(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="gc-fields">
              <label className="gc-field">
                Name *
                <input {...fieldProps('name')} autoComplete="name" placeholder="Vorname und Nachname" required value={fields.name} onChange={set('name')} />
                {errorText('name')}
              </label>
              <label className="gc-field">
                E-Mail *
                <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="Ihre E-Mail-Adresse" required value={fields.email} onChange={set('email')} />
                {errorText('email')}
              </label>
              <label className="gc-field">
                {reply === 'Telefon' ? 'Telefon *' : 'Telefon'}
                <input
                  {...fieldProps('phone')}
                  type="tel"
                  autoComplete="tel"
                  placeholder={reply === 'Telefon' ? 'Telefonnummer für den Rückruf *' : 'Für einen Rückruf'}
                  required={reply === 'Telefon'}
                  value={fields.phone}
                  onChange={set('phone')}
                />
                {errorText('phone')}
              </label>
              <label className="gc-field">
                Ort des Gartens
                <input name="place" autoComplete="address-level2" placeholder="PLZ / Ort" value={fields.place} onChange={set('place')} />
              </label>
              <label className="gc-field gc-full">
                <span>{messageLabel}</span>
                <textarea
                  {...fieldProps('message')}
                  placeholder="Was wünschen Sie sich für Ihren Garten?"
                  maxLength={MESSAGE_MAX}
                  required
                  value={fields.message}
                  onChange={set('message')}
                />
                {errorText('message')}
                <span className="gc-counter" aria-live="polite">
                  {fields.message.length} / {MESSAGE_MAX}
                </span>
              </label>
            </div>

            <fieldset className="gc-preference">
              <legend>Wie erreichen wir Sie am besten?</legend>
              <label>
                <input type="radio" name="reply" value="E-Mail" checked={reply === 'E-Mail'} onChange={() => setReply('E-Mail')} />
                Per E-Mail
              </label>
              <label>
                <input type="radio" name="reply" value="Telefon" checked={reply === 'Telefon'} onChange={() => setReply('Telefon')} />
                Telefonisch
              </label>
            </fieldset>

            <button className="gc-submit" type="submit" disabled={busy}>
              {usesEndpoint ? 'Anfrage senden' : 'Anfrage als E-Mail öffnen'} <ArrowIcon />
            </button>
            <p className="gc-note">
              {usesEndpoint
                ? 'Ihre Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage an uns übermittelt.'
                : 'Öffnet Ihr E-Mail-Programm mit Ihrer vorbereiteten Anfrage. Bitte prüfen und versenden Sie die E-Mail dort. Auf dieser Website werden keine Formulardaten gespeichert.'}
            </p>
            <p className={`gc-status${status.error ? ' is-error' : ''}`} role="status" aria-live="polite">
              {status.text}
            </p>
          </form>
        </section>

        <section className="gc-after" aria-labelledby="after-title">
          <div>
            <div className="gc-kicker">Vom Gespräch zum Garten</div>
            <h2 id="after-title">
              <Words lines={['Einfach ins Gespräch kommen.']} />
            </h2>
            <p>Gemeinsam klären wir Wünsche, Möglichkeiten und den nächsten sinnvollen Schritt.</p>
            <div className="gc-steps">
              {contactSteps.map((s) => (
                <div className="gc-step" key={s.label}>
                  <span>{s.label}</span>
                  {s.text}
                </div>
              ))}
            </div>
          </div>
          <figure className="gc-photo reveal-img">
            <Img src="/assets/home-1.webp" alt="Einblick in eine Gartengestaltung" sizes="(max-width: 620px) 100vw, 345px" />
          </figure>
        </section>
      </div>
    </div>
  )
}
