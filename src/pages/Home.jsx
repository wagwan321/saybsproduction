import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Print from '../components/Print.jsx'
import Rv from '../components/Reveal.jsx'
import Split from '../components/Split.jsx'
import Hero from '../components/Hero.jsx'
import Statement from '../components/Statement.jsx'
import Services from '../components/Services.jsx'
import Marquee from '../components/Marquee.jsx'
import Process from '../components/Process.jsx'
import Quotes from '../components/Quotes.jsx'
import Museum from '../components/Museum.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { LoopFilm } from '../components/Film.jsx'
import { IconArrow } from '../components/Icons.jsx'
import { EXHIBITIONS, FILMS, HOME_FILM, TESTIMONIALS, STUDIO, MARQUEE } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

const metaOf = (e) => [e.kind, e.place, e.date].join(' · ')

export default function Home() {
  usePageTitle()
  const [elissa, valeria, brides] = EXHIBITIONS
  // The first photo of Elissa & Roy and of Valeria & Jacob now lead the services, so the
  // recent-work hang uses the others: every photograph appears once across the site.
  const shows = [
    { e: elissa, prints: elissa.home.slice(1) },
    { e: valeria, prints: valeria.home.slice(1) },
    { e: brides, prints: brides.home },
  ]

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
      <Hero />

      <Statement text="We photograph and film weddings, engagements and the moments in between. One team, two crafts, and a single story told in pictures that feel like you." />

      <Services />

      <Marquee rows={MARQUEE} />

      <Museum />

      <section ref={room} className="room screening" aria-labelledby="screening">
        <div className="wrap">
          <div className="screen" style={{ '--ar': '9 / 16' }}>
            <LoopFilm id={HOME_FILM.id} label={`${HOME_FILM.title}, a SAYBS wedding film, playing silently`} />
          </div>
          <Rv>
            <h2 id="screening" className="h-display">The screening room</h2>
            <p className="lede">“{HOME_FILM.line}”</p>
            <p className="body" style={{ marginTop: 'calc(var(--u) * 3)' }}>Wedding films, teasers, trailers and reels, made by the same team that takes your photographs.</p>
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

      <Process />

      <Quotes items={TESTIMONIALS} />

      <section className="section studio" aria-labelledby="studio" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Print photo={STUDIO.home} title="The studio" meta="On set" />
          <Rv>
            <Split id="studio" className="h-display" text="One team behind the camera" />
            <p className="body">SAYBS photographs and films weddings in Lebanon and abroad. A photograph has to tell the story in a single frame; a film pieces motion, light and sound into one narrative. We do both, side by side, on the same day.</p>
            <Link className="link" to="/about">Meet the studio <IconArrow /></Link>
          </Rv>
        </div>
      </section>

      <section className="section close" aria-labelledby="bookings">
        <div className="wrap">
          <div>
            <Split id="bookings" className="h-display" text="Bookings open for 2027" />
            <Rv as="p" className="lede">Tell us your date. We will tell you if it is still free.</Rv>
          </div>
          <InquiryForm quick />
        </div>
      </section>
    </>
  )
}
