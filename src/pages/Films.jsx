import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FilmScreen, LoopFilm } from '../components/Film.jsx'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import { useLights } from '../components/Lights.jsx'
import { IconPlay, IconArrow } from '../components/Icons.jsx'
import { FILMS, ON_SET } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

export default function Films() {
  usePageTitle('Films')
  const { open } = useLights()
  const [params, setParams] = useSearchParams()
  const [feature, ...rest] = FILMS
  const playlist = FILMS.map((f) => ({ kind: 'film', id: f.id, title: f.title, meta: [f.kind, f.place].filter(Boolean).join(' · ') }))

  // Arriving from a programme line on the homepage: bring the lights down on that film.
  useEffect(() => {
    const id = params.get('play')
    const at = playlist.findIndex((f) => f.id === id)
    if (at >= 0) {
      open(playlist, at)
      setParams({}, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="room-page">
      <header className="page-head split">
        <div className="wrap">
          <h1 className="vinyl">Films</h1>
          <p className="lede">The screening room. Wedding films, trailers and reels, made alongside the photographs by the same team.</p>
        </div>
      </header>

      <div className="wrap">
        <section className="feature" aria-labelledby="feature">
          <FilmScreen film={feature} playlist={FILMS} label={false} />
          <Rv>
            <h2 id="feature" className="h-display">{feature.title}</h2>
            <p className="caps" style={{ marginTop: 'calc(var(--u) * 1.6)' }}>{feature.kind}</p>
            <p className="lede">“{feature.line}”</p>
            <button className="button ghost" onClick={() => open(playlist, 0)}><IconPlay /> Play the film</button>
          </Rv>
        </section>

        <section className="screens" aria-label="More films">
          {rest.map((f) => <FilmScreen key={f.id} film={f} playlist={FILMS} />)}
        </section>

        <section className="onset" aria-labelledby="onset">
          <div className="onset-head">
            <h2 id="onset" className="h-section">{ON_SET.title}</h2>
            <p className="body">Behind the scenes of <i>{ON_SET.work}</i>: paper birds, a cloud set, and a secret the whole crew kept until the song was out.</p>
          </div>
          <div className="onset-grid">
            {ON_SET.clips.map((c) => (
              <div className="clip" key={c}><LoopFilm id={c} label="Behind the scenes clip from the set, playing silently" /></div>
            ))}
            {ON_SET.photos.map((p, i) => (
              <Print key={p.id} className={`p${i + 1}`} photo={p} walk={ON_SET.photos} title={ON_SET.title} meta={ON_SET.work} size="s" />
            ))}
          </div>
        </section>

        <div className="next" style={{ borderColor: '#fff' }}>
          <h2 className="h-display">Your day, on film.</h2>
          <Link className="button" to="/inquire">Check your date <IconArrow /></Link>
        </div>
      </div>
    </div>
  )
}
