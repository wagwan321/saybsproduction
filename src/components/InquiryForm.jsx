import { useId, useState } from 'react'
import { CONTACT, waLink } from '../data.js'
import { IconWhatsApp, IconMail } from './Icons.jsx'

const today = () => new Date().toISOString().slice(0, 10)
const pretty = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-').map(Number)
  return new Date(y, m - 1, day).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

// No server: the inquiry is written out for the couple and sent through their own
// WhatsApp or email, so it lands straight in the studio's inbox.
export default function InquiryForm({ quick = false }) {
  const uid = useId()
  const [f, setF] = useState({ names: '', date: '', venue: '', cover: 'Photography & film', note: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: null }) }

  const message = () => {
    const lines = [
      `Hello SAYBS, we would like to check our date.`,
      `Names: ${f.names.trim()}`,
      `Wedding date: ${pretty(f.date)}`,
    ]
    if (f.venue.trim()) lines.push(`Venue: ${f.venue.trim()}`)
    if (!quick) lines.push(`We are looking for: ${f.cover}`)
    if (f.note.trim()) lines.push('', f.note.trim())
    return lines.join('\n')
  }

  const check = () => {
    const e = {}
    if (!f.names.trim()) e.names = 'Add your names so we know who is writing.'
    if (!f.date) e.date = 'Choose your wedding date, even an approximate one.'
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus()
      return false
    }
    return true
  }

  const sendWhatsApp = (e) => {
    e.preventDefault()
    if (check()) window.open(waLink(message()), '_blank', 'noopener')
  }
  const sendMail = () => {
    if (!check()) return
    const subject = `Wedding inquiry: ${pretty(f.date)}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`
  }

  const field = (k, label, input) => (
    <div className="field" data-error={errors[k] ? '' : undefined}>
      <label htmlFor={`${uid}-${k}`}>{label}</label>
      {input}
      {errors[k] && <span className="err" id={`${uid}-${k}-err`} role="alert">{errors[k]}</span>}
    </div>
  )
  const aria = (k) => ({ id: `${uid}-${k}`, 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined })

  return (
    <form className={quick ? 'form quick' : 'form'} onSubmit={sendWhatsApp} noValidate>
      {field('names', 'Your names', <input {...aria('names')} type="text" autoComplete="name" placeholder="Elissa & Roy" value={f.names} onChange={set('names')} />)}
      {field('date', 'Wedding date', <input {...aria('date')} type="date" min={today()} value={f.date} onChange={set('date')} />)}
      {!quick && field('venue', 'Venue or town', <input {...aria('venue')} type="text" placeholder="Where you will celebrate" value={f.venue} onChange={set('venue')} />)}
      {!quick && (
        <fieldset className="field">
          <legend>You are looking for</legend>
          <div className="choices">
            {['Photography', 'Film', 'Photography & film', 'Engagement'].map((c) => (
              <label className="choice" key={c}>
                <input type="radio" name={`${uid}-cover`} value={c} checked={f.cover === c} onChange={set('cover')} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {!quick && field('note', 'Anything else', <textarea {...aria('note')} rows={4} placeholder="Guests, ceremony, the feeling you want to keep" value={f.note} onChange={set('note')} />)}
      <div className="form-actions">
        <button className="button" type="submit"><IconWhatsApp /> Send on WhatsApp</button>
        <button className="button ghost" type="button" onClick={sendMail}><IconMail /> Send by email</button>
      </div>
      {!quick && <p className="form-note">Your message opens in WhatsApp or your email, ready to send to SAYBS. We reply with availability for your date.</p>}
    </form>
  )
}
