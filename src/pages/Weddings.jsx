import { Link } from 'react-router-dom'
import Museum from '../components/Museum.jsx'
import Split from '../components/Split.jsx'
import Rv from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { EXHIBITIONS, CONTACT } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

// The weddings page is the museum itself, then a plain index of every exhibition.
export default function Weddings() {
  usePageTitle('The Museum of Weddings')
  return (
    <>
      <header className="page-head split">
        <div className="wrap">
          <Split as="h1" className="vinyl" text="Weddings" />
          <Rv as="p" className="lede">The Museum of Weddings: three rooms, one wedding in each. Walk the walls, then step inside an exhibition.</Rv>
        </div>
      </header>

      <Museum heading={false} />

      <div className="wrap">
        <ol className="wed-index">
          {EXHIBITIONS.map((e) => (
            <li key={e.slug}>
              <Link to={`/weddings/${e.slug}`}>
                <span className="svc-n">Room {e.room.n}</span>
                <span className="h-section">{e.title}</span>
                <span className="label-meta">{[e.kind, e.place, e.date].join(' · ')}</span>
                <IconArrow />
              </Link>
            </li>
          ))}
        </ol>
        <div className="after-list">
          <p className="lede">More weddings hang on our Instagram, by couple.</p>
          <a className="link" href={CONTACT.instagram} target="_blank" rel="noreferrer">@saybsproduction <IconArrow /></a>
        </div>
      </div>
    </>
  )
}
