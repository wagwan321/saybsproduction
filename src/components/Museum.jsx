import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { photoSrc } from './Lights.jsx'
import { SIZES } from '../media.js'
import { useInView, reducedMotion } from '../motion.js'
import { IconArrow } from './Icons.jsx'
import Split from './Split.jsx'

// The museum wall (generated once on Higgsfield, see the file's embedded prompt) has six
// spotlight pools. Each exhibition hangs as a pair of prints under two of them.
const POOLS = [13, 27.5, 43, 59, 74, 89]
const EYE = 44 // eye line, % of the wall image height

function HungPrint({ p, x, i, e, state, onFocus, onBlur }) {
  const [w, h] = SIZES[p.id] || [1200, 1600]
  const wide = w > h
  return (
    <Link
      to={`/weddings/${e.slug}`}
      className={`m-print${wide ? ' wide' : ''}${state}`}
      style={{ left: `${x}%`, top: `${EYE}%`, '--ar': `${w} / ${h}`, transitionDelay: `${900 + i * 160}ms` }}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={`${p.alt}. Enter the exhibition: ${e.title}`}
    >
      <img src={photoSrc(p.id)} alt="" loading="lazy" decoding="async" />
    </Link>
  )
}

export default function Museum({ shows }) {
  const ref = useInView({ rootMargin: '0px 0px -25% 0px' })
  const [focus, setFocus] = useState(null)
  const [tour, setTour] = useState(0)
  const groups = shows.map(({ e, prints }, g) => ({ e, prints, xs: [POOLS[g * 2], POOLS[g * 2 + 1]], cx: (POOLS[g * 2] + POOLS[g * 2 + 1]) / 2 }))
  // Every hung print, in order along the wall: the camera walks up to one print at a time.
  const prints = groups.flatMap((g, gi) => g.prints.slice(0, 2).map((p, k) => ({ p, x: g.xs[k], gi, i: gi * 2 + k })))

  // Phones: the camera tours the three exhibitions on its own.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    if (!mq.matches || reducedMotion()) return
    const t = setInterval(() => setTour((v) => (v + 1) % prints.length), 4200)
    return () => clearInterval(t)
  }, [prints.length])

  const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  const active = isPhone ? tour : focus
  // Walk toward the chosen exhibition, never past the edge of the wall photograph.
  // On phones the wall is wider than the screen (about 42% of it shows at once).
  const z = isPhone ? 1.9 : 2.3
  const view = isPhone ? 0.42 : 1
  const keep = (c) => Math.min(100 - (50 * view) / z, Math.max((50 * view) / z, c))
  const cam = active == null
    ? { z: 1, tx: 0, ty: 0 }
    : { z, tx: 50 - keep(prints[active].x), ty: 50 - keep(EYE + 4) }
  const activeGroup = active == null ? null : prints[active].gi

  return (
    <section className="museum" aria-labelledby="museum-title">
      <div className="wrap museum-head">
        <Split id="museum-title" className="h-display" text="The Museum of Weddings" />
        <p className="body">Three weddings, hung like exhibitions. Point at a photograph to step closer to it, then click to go inside.</p>
      </div>
      <div ref={ref} className="museum-stage" onMouseLeave={() => setFocus(null)}>
        <div className="museum-frame">
        <div
          className="museum-cam"
          style={{ transform: `scale(${cam.z}) translate(${cam.tx}%, ${cam.ty}%)` }}
        >
          <img className="museum-wall" src="/media/museum/hall.jpg" alt="An empty white museum wall under gallery spotlights, with a wooden bench" loading="lazy" decoding="async" />
          <span className="museum-dark" aria-hidden="true" />
          {prints.map((x) => (
            <HungPrint
              key={x.p.id}
              p={x.p}
              x={x.x}
              i={x.i}
              e={groups[x.gi].e}
              state={active === x.i ? ' on' : active != null ? ' off' : ''}
              onFocus={() => setFocus(x.i)}
              onBlur={() => setFocus(null)}
            />
          ))}
          {groups.map((g, gi) => (
            <span key={g.e.slug} className={`m-label${activeGroup != null && activeGroup !== gi ? ' off' : ''}`} style={{ left: `${g.cx}%` }} aria-hidden="true">
              <span className="m-title">{g.e.title}</span>
              <span className="m-meta">{[g.e.kind, g.e.place, g.e.date].join(' · ')}</span>
            </span>
          ))}
        </div>
        </div>
      </div>
      <div className="wrap museum-foot">
        <ol className="m-index" aria-label="Exhibitions">
          {groups.map((g, gi) => (
            <li key={g.e.slug} className={activeGroup === gi ? 'on' : ''}>
              <Link to={`/weddings/${g.e.slug}`} onMouseEnter={() => setFocus(gi * 2)} onMouseLeave={() => setFocus(null)}>
                <span className="svc-n">{String(gi + 1).padStart(2, '0')}</span>
                <span className="m-i-title">{g.e.title}</span>
                <IconArrow />
              </Link>
            </li>
          ))}
        </ol>
        <Link className="button ghost" to="/weddings">All weddings</Link>
      </div>
    </section>
  )
}
