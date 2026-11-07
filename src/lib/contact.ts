import { company } from '../data/site'

export interface ContactRequest {
  topic: string
  name: string
  email: string
  phone: string
  place: string
  message: string
  reply: 'E-Mail' | 'Telefon'
}

export const MESSAGE_MAX = 1500

export type ContactErrors = Partial<Record<keyof ContactRequest, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()0-9\s/.-]{7,}$/

export function validateContact(data: ContactRequest): ContactErrors {
  const errors: ContactErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.'
  if (!data.email.trim()) errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.'
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Bitte prüfen Sie die E-Mail-Adresse.'
  if (data.reply === 'Telefon' && !data.phone.trim()) errors.phone = 'Für einen Rückruf benötigen wir Ihre Telefonnummer.'
  else if (data.phone.trim() && !PHONE_RE.test(data.phone.trim())) errors.phone = 'Bitte prüfen Sie die Telefonnummer.'
  if (!data.message.trim()) errors.message = 'Bitte beschreiben Sie kurz Ihr Anliegen.'
  else if (data.message.length > MESSAGE_MAX) errors.message = `Maximal ${MESSAGE_MAX} Zeichen.`
  return errors
}

function mailtoUrl(data: ContactRequest): string {
  const body = [
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || '–'}`,
    `Ort des Gartens: ${data.place || '–'}`,
    `Gewünschte Kontaktaufnahme: ${data.reply}`,
    '',
    data.message,
  ].join('\n')
  return `mailto:${company.email}?subject=${encodeURIComponent(`Gartenanfrage: ${data.topic}`)}&body=${encodeURIComponent(body)}`
}

/**
 * Delivers a contact request.
 *
 * Today (as on the existing website) it opens the visitor's e-mail program
 * with a prepared message – nothing is stored or sent by this website.
 * For server-side delivery later, set VITE_CONTACT_ENDPOINT at build time to
 * a URL accepting a JSON POST; the form then sends there instead.
 */
export async function sendContactRequest(data: ContactRequest): Promise<'mailto' | 'sent'> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`)
    return 'sent'
  }
  window.location.href = mailtoUrl(data)
  return 'mailto'
}
