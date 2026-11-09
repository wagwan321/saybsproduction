import { useState } from 'react'
import { IconPlay, IconArrow } from './Icons.jsx'
import { VIMEO, VIMEO_URL } from '../data.js'

// Earlier films from the studio's Vimeo. The player only loads when a film is chosen.
function VimeoFilm({ v }) {
  const [play, setPlay] = useState(false)
  return (
    <figure className="vimeo">
      <div className="vimeo-frame">
        {play ? (
          <iframe
            src={`https://player.vimeo.com/video/${v.id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
            title={`${v.title}, ${v.kind}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="vimeo-hit" onClick={() => setPlay(true)} aria-label={`Play ${v.title}, ${v.kind}`}>
            <img src={v.thumb} alt="" loading="lazy" decoding="async" />
            <span className="play"><IconPlay /></span>
          </button>
        )}
      </div>
      <figcaption className="label">
        <span className="label-title">{v.title}</span>
        <span className="label-meta">{v.kind} · {v.length}</span>
      </figcaption>
    </figure>
  )
}

export default function VimeoArchive() {
  return (
    <section className="archive" aria-labelledby="archive">
      <div className="onset-head">
        <h2 id="archive" className="h-section">From the archive</h2>
        <p className="body">Teasers and trailers from earlier SAYBS weddings. Forty-two films live on our Vimeo.</p>
      </div>
      <div className="vimeo-grid">
        {VIMEO.map((v) => <VimeoFilm key={v.id} v={v} />)}
      </div>
      <a className="link" href={VIMEO_URL} target="_blank" rel="noreferrer">All films on Vimeo <IconArrow /></a>
    </section>
  )
}
