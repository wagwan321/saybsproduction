import { Link } from 'react-router-dom'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { STUDIO, TESTIMONIALS, CONTACT, waLink } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

export default function About() {
  usePageTitle('The studio')
  const ph = STUDIO.about
  return (
    <>
      <header className="page-head split">
        <div className="wrap">
          <h1 className="vinyl">The studio</h1>
          <p className="lede">Photography and film, from one team, in Lebanon and wherever you marry.</p>
        </div>
      </header>

      <div className="wrap">
        <Rv className="about-text">
          <h2 className="h-section">Two crafts, one day</h2>
          <div>
            <p className="body">At SAYBS we work in both photography and cinematography. Photography is an art that asks the photographer to tell a whole story in a single shot: a good photograph is a complete work in itself.</p>
            <p className="body">Cinematography asks something different: understanding how one shot speaks to the next, and piecing motion, light and sound together into one narrative. We bring both to your wedding, so your photographs and your film tell the same story.</p>
          </div>
        </Rv>

        <div className="hang">
          <div className="hang-row pair v0">
            <Print photo={ph[0]} walk={ph} title="The studio" meta="On set" />
            <Print photo={ph[1]} walk={ph} title="The studio" meta="On set" size="s" />
          </div>
          <div className="hang-row wide r">
            <Print photo={ph[2]} walk={ph} title="The studio" meta="On set" />
          </div>
          <div className="hang-row pair v1">
            <Print photo={ph[3]} walk={ph} title="The studio" meta="On set" size="s" />
            <Print photo={ph[4]} walk={ph} title="The studio" meta="On set" />
          </div>
          <div className="hang-row single l">
            <Print photo={ph[5]} walk={ph} title="The studio" meta="On set" />
          </div>
        </div>
      </div>

      <section className="wrap" aria-labelledby="voices">
        <div className="voices">
          <h2 id="voices" className="h-display">In their words</h2>
          {TESTIMONIALS.map((t) => (
            <Rv as="figure" className="voice" key={t.name}>
              <figcaption className="caps">{t.name}</figcaption>
              <blockquote><p>“{t.full}”</p></blockquote>
            </Rv>
          ))}
        </div>
      </section>

      <section className="wrap" aria-label="Find us">
        <div className="visit">
          <div>
            <h3 className="h-title">The studio</h3>
            <p><a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">{CONTACT.address}</a></p>
          </div>
          <div>
            <h3 className="h-title">Write to us</h3>
            <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p style={{ marginTop: 8 }}><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp {CONTACT.phoneDisplay}</a></p>
          </div>
          <div>
            <h3 className="h-title">Your date</h3>
            <p>Bookings are open for 2027.</p>
            <Link className="link" style={{ marginTop: 16 }} to="/inquire">Check your date <IconArrow /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
