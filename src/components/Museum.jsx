import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { photoSrc, useLights } from './Lights.jsx'
import { SIZES } from '../media.js'
import { useInView, useNarrow } from '../motion.js'
import { IconArrow, IconClose } from './Icons.jsx'
import Split from './Split.jsx'

// The museum wall (generated once on Higgsfield, see the file's embedded prompt) has six
// spotlight pools. Each exhibition hangs as a pair of prints under two of them.
const POOLS = [13, 27.5, 43, 59, 74, 89]
const EYE = 44 // eye line, % of the wall image height

function HungPrint({ p, x, i, state, onEnter, onLeave, onPick, label }) {
  const [w, h] = SIZES[p.id] || [1200, 1600]
  const wide = w > h
  return (
    <button
      className={`m-print${wide ? ' wide' : ''}${state}`}
      style={{ left: `${x}%`, top: `${EYE}%`, '--ar': `${w} / ${h}`, transitionDelay: `${900 + i * 160}ms` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onPick}
      aria-label={label}
    >
      <img src={photoSrc(p.id)} alt="" loading="lazy" decoding="async" />
    </button>
  )
}

// Spotlight walk: the whole wall first. Choosing a frame glides the camera up to it, the
// room dims around its spotlight and a museum placard slides up underneath, with arrows to
// walk along the wall, Open (full screen) and See the wedding. Hover previews on desktop.
export default function Museum({ shows }) {
  const ref = useInView({ rootMargin: '0px 0px -25% 0px' })
  const isPhone = useNarrow(760)
  const { open } = useLights()
  const [hover, setHover] = useState(null)
  const [sel, setSel] = useState(null)
  const groups = shows.map(({ e, prints }, g) => ({ e, prints, xs: [POOLS[g * 2], POOLS[g * 2 + 1]], cx: (POOLS[g * 2] + POOLS[g * 2 + 1]) / 2 }))
  const prints = groups.flatMap((g, gi) => g.prints.slice(0, 2).map((p, k) => ({ p, x: g.xs[k], gi, i: gi * 2 + k })))
  const n = prints.length

  const viewer = prints.map((x) => {
    const e = groups[x.gi].e
    return { kind: 'photo', id: x.p.id, alt: x.p.alt, title: e.title, meta: [e.kind, e.place, e.date].join(' · '), link: { to: `/weddings/${e.slug}`, label: 'See the wedding' } }
  })

  const walk = (d) => setSel((s) => (s == null ? 0 : (s + d + n) % n))
  const leave = () => setSel(null)

  // Keys while walking: left / right along the wall, Esc steps back.
  useEffect(() => {
    if (sel == null) return
    const onKey = (ev) => {
      if (document.querySelector('.lights')) return
      if (ev.key === 'ArrowRight') { ev.preventDefault(); walk(1) }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); walk(-1) }
      else if (ev.key === 'Escape') leave()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Swipe across the stage on phones to walk.
  const touch = useRef(null)
  const onTouchStart = (ev) => { touch.current = ev.touches[0].clientX }
  const onTouchEnd = (ev) => {
    if (touch.current == null || sel == null) return
    const dx = ev.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 45) walk(dx < 0 ? 1 : -1)
    touch.current = null
  }

  const active = sel != null ? sel : isPhone ? null : hover
  const z = sel != null ? (isPhone ? 2.9 : 2.4) : 2.2
  const keep = (c) => Math.min(100 - 50 / z, Math.max(50 / z, c))
  const cam = active == null ? { z: 1, tx: 0, ty: 0 } : { z, tx: 50 - keep(prints[active].x), ty: 50 - keep(EYE + 3) }
  const activeGroup = active == null ? null : prints[active].gi
  const cur = sel != null ? prints[sel] : null
  const curE = cur ? groups[cur.gi].e : null

  return (
    <section className="museum" aria-labelledby="museum-title">
      <div className="wrap museum-head">
        <Split id="museum-title" className="h-display" text="The Museum of Weddings" />
        <p className="body">Three weddings, hung like exhibitions. Choose a frame to walk up to it, then stroll along the wall.</p>
      </div>
      <div
        ref={ref}
        className={`museum-stage${sel != null ? ' walking' : ''}`}
        onMouseLeave={() => setHover(null)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="museum-frame">
          <div className="museum-cam" style={{ transform: `scale(${cam.z}) translate(${cam.tx}%, ${cam.ty}%)` }}>
            <img onClick={() => sel != null && leave()} className="museum-wall" src="/media/museum/hall.jpg" alt="An empty white museum wall under gallery spotlights, with a wooden bench" loading="lazy" decoding="async" />
            <span className="museum-dark" aria-hidden="true" />
            {prints.map((x) => (
              <HungPrint
                key={x.p.id}
                p={x.p}
                x={x.x}
                i={x.i}
                state={active === x.i ? ' on' : active != null ? ' off' : ''}
                onEnter={() => !isPhone && sel == null && setHover(x.i)}
                onLeave={() => !isPhone && setHover(null)}
                onPick={() => (sel === x.i ? open(viewer, x.i) : setSel(x.i))}
                label={sel === x.i ? `Open larger: ${x.p.alt}` : `Walk up to: ${x.p.alt}, ${groups[x.gi].e.title}`}
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
        <span className="museum-spot" aria-hidden="true" />
        <button className="m-walk m-walk-prev" onClick={() => walk(-1)} aria-label="Walk to the previous frame" tabIndex={sel != null ? 0 : -1}><IconArrow dir="left" /></button>
        <button className="m-walk m-walk-next" onClick={() => walk(1)} aria-label="Walk to the next frame" tabIndex={sel != null ? 0 : -1}><IconArrow /></button>
        <button className="m-leave" onClick={leave} aria-label="Step back from the wall" tabIndex={sel != null ? 0 : -1}><IconClose /></button>
      </div>

      <div className={`m-placard${cur ? ' on' : ''}`} aria-live="polite">
        <div className="wrap m-placard-in">
          {cur && (
            <>
              <div className="m-placard-text">
                <span className="m-placard-no">No. {sel + 1} of {n} · {curE.title}</span>
                <span className="m-placard-t">{cur.p.alt}</span>
                <span className="m-placard-m">{[curE.kind, curE.place, curE.date].join(' · ')}</span>
              </div>
              <div className="m-placard-actions">
                <button className="button ghost" onClick={() => open(viewer, sel)}>Open</button>
                <Link className="button" to={`/weddings/${curE.slug}`}>See the wedding <IconArrow /></Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="wrap museum-foot">
        <ol className="m-index" aria-label="Exhibitions">
          {groups.map((g, gi) => (
            <li key={g.e.slug} className={activeGroup === gi ? 'on' : ''}>
              <button onClick={() => setSel(gi * 2)}>
                <span className="svc-n">{String(gi + 1).padStart(2, '0')}</span>
                <span className="m-i-title">{g.e.title}</span>
                <IconArrow />
              </button>
            </li>
          ))}
        </ol>
        <Link className="button ghost" to="/weddings">All weddings</Link>
      </div>
    </section>
  )
}
