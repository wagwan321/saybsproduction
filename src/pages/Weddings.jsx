import { Link } from 'react-router-dom'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { EXHIBITIONS, CONTACT } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

export default function Weddings() {
  usePageTitle('Weddings')
  return (
    <>
      <header className="page-head split">
        <div className="wrap">
          <h1 className="vinyl">Weddings</h1>
          <p className="lede">Three exhibitions now hanging. Each one is a single day, told in photographs from the first light to the last dance.</p>
        </div>
      </header>
      <div className="wrap">
        {EXHIBITIONS.map((e) => {
          const meta = [e.kind, e.place, e.date].join(' · ')
          return (
            <article className="exhibit-entry" key={e.slug} aria-labelledby={`ex-${e.slug}`}>
              <Print className="a" photo={e.cover[0]} walk={e.cover} title={e.title} meta={meta} />
              <Print className="b" size="s" photo={e.cover[1]} walk={e.cover} title={e.title} meta={meta} />
              <Rv className="info">
                <h2 id={`ex-${e.slug}`} className="h-display"><Link to={`/weddings/${e.slug}`}>{e.title}</Link></h2>
                <p className="caps meta">{meta}</p>
                <p className="lede">“{e.words}”</p>
                <Link className="link" to={`/weddings/${e.slug}`}>Enter · {e.hang.length} photographs <IconArrow /></Link>
              </Rv>
            </article>
          )
        })}
        <div className="after-list">
          <p className="lede">More weddings hang on our Instagram, by couple.</p>
          <a className="link" href={CONTACT.instagram} target="_blank" rel="noreferrer">@saybsproduction <IconArrow /></a>
        </div>
      </div>
    </>
  )
}
