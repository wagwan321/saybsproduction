import { Link, useParams } from 'react-router-dom'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { EXHIBITIONS } from '../data.js'
import { SIZES } from '../media.js'
import { usePageTitle } from './usePageTitle.js'
import NotFound from './NotFound.jsx'

const isWide = (id) => { const [w, h] = SIZES[id] || [1, 1]; return w > h * 1.1 }

// Hang the prints the way a curator would: wide frames alone, portraits in
// offset pairs, a single portrait when a pair is not possible. Sides alternate.
function hangRows(photos) {
  const rows = []
  let i = 0, side = 0, pair = 0
  while (i < photos.length) {
    const a = photos[i], b = photos[i + 1]
    if (isWide(a.id)) { rows.push({ type: 'wide', v: side++ % 2 ? 'r' : 'l', items: [a] }); i += 1 }
    else if (b && !isWide(b.id)) { rows.push({ type: 'pair', v: `v${pair++ % 2}`, items: [a, b] }); i += 2 }
    else { rows.push({ type: 'single', v: side++ % 2 ? 'r' : 'l', items: [a] }); i += 1 }
  }
  return rows
}

export default function Wedding() {
  const { slug } = useParams()
  const idx = EXHIBITIONS.findIndex((e) => e.slug === slug)
  const e = EXHIBITIONS[idx]
  usePageTitle(e?.title)
  if (!e) return <NotFound />

  const next = EXHIBITIONS[(idx + 1) % EXHIBITIONS.length]
  const meta = [e.kind, e.place, e.date].join(' · ')
  const rows = hangRows(e.hang)
  const wordsAt = Math.min(2, rows.length)
  let n = 0

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1 className="vinyl">{e.title}</h1>
          <p className="caps meta">{meta}</p>
          <p className="lede">{e.hang.length} photographs. Select any print to see it with the lights down.</p>
        </div>
      </header>

      <div className="wrap">
        <div className="hang">
          {rows.map((r, ri) => (
            <div key={ri} style={{ display: 'contents' }}>
              {ri === wordsAt && (
                <Rv className="hang-words">
                  {e.epigraph && <p className="ar" lang="ar">{e.epigraph.ar}</p>}
                  <p>“{e.words}”</p>
                  {e.wordsBy && <cite className="caps">{e.wordsBy}</cite>}
                </Rv>
              )}
              <div className={`hang-row ${r.type} ${r.v}`}>
                {r.items.map((p) => {
                  n += 1
                  return <Print key={p.id} photo={p} walk={e.hang} no={n} title={e.title} meta={meta} size={r.type === 'pair' && r.items[1] === p ? 's' : ''} />
                })}
              </div>
            </div>
          ))}
        </div>

        {e.film && (
          <Rv className="next" as="div">
            <a className="next-title" href={e.film.url} target="_blank" rel="noreferrer"><span className="h-display">Their film, <i>{e.film.title}</i></span></a>
            <a className="link" href={e.film.url} target="_blank" rel="noreferrer">Watch on Instagram <IconArrow /></a>
          </Rv>
        )}

        <section className="credits" aria-labelledby="credits">
          <h2 id="credits" className="h-section">With thanks</h2>
          {e.credits ? (
            <dl>
              {e.credits.map(([role, name, url]) => (
                <div key={role}>
                  <dt>{role}</dt>
                  <dd><a href={url} target="_blank" rel="noreferrer">{name}</a></dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl>
              {['Venue', 'Planner', 'Flowers', 'Dress'].map((role) => (
                <div key={role}>
                  <dt>{role}</dt>
                  <dd>To confirm</dd>
                </div>
              ))}
              <div>
                <dt>Photography and film</dt>
                <dd><a href="https://www.instagram.com/saybsproduction/" target="_blank" rel="noreferrer">SAYBS</a></dd>
              </div>
              <p className="draft-note" style={{ gridColumn: '1 / -1', margin: 0 }}>Draft: SAYBS to confirm this wedding’s credits.</p>
            </dl>
          )}
        </section>

        <nav className="next" aria-label="Next exhibition">
          <Link className="next-title" to={`/weddings/${next.slug}`} aria-label={`Next exhibition: ${next.title}`}><span className="h-display">Next, {next.title}</span></Link>
          <Link className="button" to="/inquire">Check your date</Link>
        </nav>
      </div>
    </>
  )
}
