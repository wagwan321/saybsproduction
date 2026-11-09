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

function HungPrint({ p, x, i }) {
  const [w, h] = SIZES[p.id] || [1200, 1600]
  const wide = w > h
  return (
    <span
      className={`m-print${wide ? ' wide' : ''}`}
      style={{ left: `${x}%`, top: `${EYE}%`, '--ar': `${w} / ${h}`, transitionDelay: `${900 + i * 160}ms` }}
    >
      <img src={photoSrc(p.id)} alt={p.alt} loading="lazy" decoding="async" />
    </span>
  )
}

export default function Museum({ shows }) {
  const ref = useInView({ rootMargin: '0px 0px -25% 0px' })
  const [focus, setFocus] = useState(null)
  const [tour, setTour] = useState(0)
  const groups = shows.map(({ e, prints }, g) => ({ e, prints, xs: [POOLS[g * 2], POOLS[g * 2 + 1]], cx: (POOLS[g * 2] + POOLS[g * 2 + 1]) / 2 }))

  // Phones: the camera tours the three exhibitions on its own.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    if (!mq.matches || reducedMotion()) return
    const t = setInterval(() => setTour((v) => (v + 1) % groups.length), 4800)
    return () => clearInterval(t)
  }, [groups.length])

  const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  const active = isPhone ? tour : focus
  // Walk toward the chosen exhibition, never past the edge of the wall photograph.
  // On phones the wall is wider than the screen (about 42% of it shows at once).
  const z = isPhone ? 1.5 : 1.9
  const view = isPhone ? 0.42 : 1
  const keep = (c) => Math.min(100 - (50 * view) / z, Math.max((50 * view) / z, c))
  const cam = active == null
    ? { z: 1, tx: 0, ty: 0 }
    : { z, tx: 50 - keep(groups[active].cx), ty: 50 - keep(EYE + 6) }

  return (
    <section className="museum" aria-labelledby="museum-title">
      <div className="wrap museum-head">
        <Split id="museum-title" className="h-display" text="The Museum of Weddings" />
        <p className="body">Three weddings, hung like exhibitions. Point at one to walk closer, then step inside.</p>
      </div>
      <div ref={ref} className="museum-stage" onMouseLeave={() => setFocus(null)}>
        <div className="museum-frame">
        <div
          className="museum-cam"
          style={{ transform: `scale(${cam.z}) translate(${cam.tx}%, ${cam.ty}%)` }}
        >
          <img className="museum-wall" src="/media/museum/hall.jpg" alt="An empty white museum wall under gallery spotlights, with a wooden bench" loading="lazy" decoding="async" />
          <span className="museum-dark" aria-hidden="true" />
          {groups.map((g, gi) => (
            <Link
              key={g.e.slug}
              to={`/weddings/${g.e.slug}`}
              className={`m-group${active === gi ? ' on' : ''}${active != null && active !== gi ? ' off' : ''}`}
              onMouseEnter={() => setFocus(gi)}
              onFocus={() => setFocus(gi)}
              onBlur={() => setFocus(null)}
              aria-label={`Enter the exhibition: ${g.e.title}, ${g.e.kind}`}
            >
              {g.prints.slice(0, 2).map((p, k) => <HungPrint key={p.id} p={p} x={g.xs[k]} i={gi * 2 + k} />)}
              <span className="m-label" style={{ left: `${g.cx}%` }}>
                <span className="m-title">{g.e.title}</span>
                <span className="m-meta">{[g.e.kind, g.e.place, g.e.date].join(' · ')}</span>
              </span>
            </Link>
          ))}
        </div>
        </div>
      </div>
      <div className="wrap museum-foot">
        <ol className="m-index" aria-label="Exhibitions">
          {groups.map((g, gi) => (
            <li key={g.e.slug} className={active === gi ? 'on' : ''}>
              <Link to={`/weddings/${g.e.slug}`} onMouseEnter={() => setFocus(gi)} onMouseLeave={() => setFocus(null)}>
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
