import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { LoopFilm } from '../components/Film.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { EXHIBITIONS, FILMS, HOME_FILM, TESTIMONIALS, STUDIO } from '../data.js'

const metaOf = (e) => [e.kind, e.place, e.date].join(' · ')

export default function Home() {
  const [elissa, valeria, brides] = EXHIBITIONS
  const lead = elissa.home[0]
  const side = valeria.home[0]
  const shows = [
    { e: elissa, prints: elissa.home.slice(1) },
    { e: valeria, prints: valeria.home.slice(1) },
    { e: brides, prints: brides.home },
  ]
  const quote = TESTIMONIALS[0]

  // Lights down as you walk into the screening room; back up if you step out the way you came.
  const room = useRef(null)
  useEffect(() => {
    const el = room.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.2) el.classList.add('lights-out')
      else if (!e.isIntersecting && e.boundingClientRect.top > 0) el.classList.remove('lights-out')
    }, { threshold: [0, 0.2] })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section className="entrance" aria-label="SAYBS, wedding photography and films">
        <div className="wrap">
          <div className="entrance-title">
            <Logo as="div" headingLevel={1} />
            <p className="lede">Timeless imagery.<br />Films that feel like you.</p>
            <p className="caps where">Lebanon · Worldwide</p>
          </div>
          <div className="entrance-hang">
            <Print className="lead" photo={lead} eager title={elissa.title} meta={metaOf(elissa)}>
              <div className="label">
                <span className="label-title">{elissa.title}</span>
                <span className="label-meta">{elissa.place} · {elissa.date}<br />Photographs and wedding film</span>
                <Link className="link" to={`/weddings/${elissa.slug}`}>See the wedding <IconArrow /></Link>
              </div>
            </Print>
            <Print className="side" size="s" photo={side} eager title={valeria.title} meta={metaOf(valeria)} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="now-showing">
        <div className="wrap">
          <Rv className="section-head">
            <h2 id="now-showing" className="h-display">Now showing</h2>
            <p className="body">Every wedding we photograph hangs as its own exhibition: the getting ready, the vows, the details only the two of you will remember. Walk in.</p>
          </Rv>
          {shows.map(({ e, prints }, i) => (
            <article className={`show${i % 2 ? ' flip' : ''}`} key={e.slug} aria-labelledby={`show-${e.slug}`}>
              <Print className="a" photo={prints[0]} walk={prints} title={e.title} meta={metaOf(e)} />
              <Print className="b" size="s" photo={prints[1]} walk={prints} title={e.title} meta={metaOf(e)} />
              <Rv className="info">
                <h3 id={`show-${e.slug}`} className="h-section">{e.title}</h3>
                <span className="label-meta">{metaOf(e)}</span>
                <Link className="link" to={`/weddings/${e.slug}`}>Enter the exhibition <IconArrow /></Link>
              </Rv>
            </article>
          ))}
        </div>
      </section>

      <section ref={room} className="room screening" aria-labelledby="screening">
        <div className="wrap">
          <div className="screen" style={{ '--ar': '507 / 900' }}>
            <LoopFilm id={HOME_FILM.id} label={`${HOME_FILM.title}, a SAYBS wedding film, playing silently`} />
          </div>
          <Rv>
            <h2 id="screening" className="h-display">The screening room</h2>
            <p className="lede">“{HOME_FILM.line}”</p>
            <p className="body" style={{ marginTop: 'calc(var(--u) * 3)' }}>Wedding films, trailers and reels, made by the same team that takes your photographs.</p>
            <ul className="program" aria-label="Now screening">
              {FILMS.map((f) => (
                <li key={f.id}>
                  <Link to={`/films?play=${f.id}`} aria-label={`Play ${f.title}, ${f.kind}`}><span className="t">{f.title}</span><span className="k">{f.kind}</span></Link>
                </li>
              ))}
            </ul>
            <Link className="link" style={{ marginTop: 'calc(var(--u) * 4)' }} to="/films">Enter the screening room <IconArrow /></Link>
          </Rv>
        </div>
      </section>

      <section className="section words" aria-label="What couples say">
        <div className="wrap">
          <Rv as="blockquote">
            <p>“{quote.short}”</p>
            <cite className="caps">{quote.name}</cite>
          </Rv>
        </div>
      </section>

      <section className="section studio" aria-labelledby="studio" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Print photo={STUDIO.home} title="The studio" meta="On set" />
          <Rv>
            <h2 id="studio" className="h-display">One team behind the camera</h2>
            <p className="body">SAYBS photographs and films weddings in Lebanon and abroad. A photograph has to tell the story in a single frame; a film pieces motion, light and sound into one narrative. We do both, side by side, on the same day.</p>
            <Link className="link" to="/about">Meet the studio <IconArrow /></Link>
          </Rv>
        </div>
      </section>

      <section className="section close" aria-labelledby="bookings">
        <div className="wrap">
          <Rv>
            <h2 id="bookings" className="h-display">Bookings open for 2027</h2>
            <p className="lede">Tell us your date. We will tell you if it is still free.</p>
          </Rv>
          <InquiryForm quick />
        </div>
      </section>
    </>
  )
}
