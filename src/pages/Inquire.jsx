import Print from '../components/Print.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { CONTACT, INQUIRE_PHOTO, waLink } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

export default function Inquire() {
  usePageTitle('Check your date')
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1 className="vinyl">Your date</h1>
          <p className="lede">Bookings are open for 2027. Tell us when and where, and we will tell you if your date is still free.</p>
        </div>
      </header>
      <section className="inquire" aria-label="Inquiry">
        <div className="wrap">
          <div className="side-print">
            <Print photo={INQUIRE_PHOTO} title="Elissa & Roy" meta="Wedding · Kyra, Lebanon · 2 August 2026" />
          </div>
          <div>
            <InquiryForm />
            <dl className="contact-lines">
              <div><dt>WhatsApp</dt><dd><a href={waLink()} target="_blank" rel="noreferrer">{CONTACT.phoneDisplay}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
              <div><dt>Instagram</dt><dd><a href={CONTACT.instagram} target="_blank" rel="noreferrer">@saybsproduction</a></dd></div>
              <div><dt>Studio</dt><dd><a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">{CONTACT.address}</a></dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
