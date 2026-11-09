import { Link } from 'react-router-dom'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { COLLECTIONS, PACKAGE_PHOTOS } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

export default function Packages() {
  usePageTitle('Packages')
  return (
    <>
      <header className="page-head split">
        <div className="wrap">
          <h1 className="vinyl">Packages</h1>
          <p className="lede">No two weddings are the same, so every collection is shaped around yours. Send us your date and we reply with availability and prices.</p>
        </div>
      </header>

      <div className="wrap">
        <section aria-label="Collections">
          <ol className="pricelist">
            {COLLECTIONS.map((c, i) => (
              <Rv as="li" className="price-row" key={c.title}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="h-title">{c.title}</h2>
                <ul>{c.lines.map((l) => <li key={l}>{l}</li>)}</ul>
                <span className="price">Price on request</span>
              </Rv>
            ))}
          </ol>
          <p className="draft-note">Draft list: SAYBS to confirm what each collection includes.</p>
        </section>

        <div className="packages-hang">
          {PACKAGE_PHOTOS.map((p, i) => (
            <Print key={p.id} photo={p} walk={PACKAGE_PHOTOS} title="SAYBS" meta="From the archive" size={i ? 's' : ''} />
          ))}
        </div>

        <Rv className="how">
          <h2 className="h-section">How booking works</h2>
          <div>
            <p className="body">Tell us your date, your venue and whether you want photographs, a film or both. We reply with availability and the collection that fits your day. Bookings are open for 2027.</p>
            <Link className="button" style={{ marginTop: 'calc(var(--u) * 4)' }} to="/inquire">Check your date <IconArrow /></Link>
          </div>
        </Rv>
      </div>
    </>
  )
}
