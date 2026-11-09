import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { filmSrc, posterSrc } from './Lights.jsx'
import { useScrollVar, reducedMotion } from '../motion.js'
import { IconArrow } from './Icons.jsx'
import { HERO_FILMS } from '../data.js'

function Panel({ id, i }) {
  const v = useRef(null)
  useEffect(() => {
    const el = v.current
    if (!el || reducedMotion()) return
    // Phones only play the middle film; wider screens play all three.
    const mq = window.matchMedia('(min-width: 761px)')
    const decide = () => {
      if (i === 1 || mq.matches) { el.src = filmSrc(id); el.play?.().catch(() => {}) }
      else el.pause?.()
    }
    decide()
    mq.addEventListener('change', decide)
    return () => mq.removeEventListener('change', decide)
  }, [id, i])
  return (
    <div className={`hero-panel hp${i}`} style={{ '--i': i }}>
      <video ref={v} poster={posterSrc(id)} muted loop playsInline preload="none" aria-hidden="true" />
    </div>
  )
}

// The opening: three SAYBS wedding films side by side, full screen and in colour.
export default function Hero() {
  const ref = useScrollVar('leave', '--leave')
  const letters = 'SAYBS'.split('')
  return (
    <section ref={ref} className="hero" aria-label="SAYBS, wedding photography and films">
      <div className="hero-films">
        {HERO_FILMS.map((id, i) => <Panel key={id} id={id} i={i} />)}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="hero-logo" aria-label="SAYBS, Photography and Film">
          <span className="hero-word" aria-hidden="true">
            {letters.map((l, i) => <span key={i} style={{ animationDelay: `${600 + i * 110}ms` }}>{l}</span>)}
          </span>
          <span className="hero-tag" aria-hidden="true"><i /> Photography &amp; Film <i /></span>
        </h1>
        <p className="hero-lede">Timeless imagery. Films that feel like you.</p>
        <div className="hero-actions">
          <Link className="button light" to="/inquire">Check your date</Link>
          <Link className="link light" to="/films">Watch our films <IconArrow /></Link>
        </div>
      </div>
      <div className="hero-foot" aria-hidden="true">
        <span>Lebanon · Worldwide</span>
        <span className="hero-cue">Scroll</span>
        <span>Bookings open for 2027</span>
      </div>
    </section>
  )
}
