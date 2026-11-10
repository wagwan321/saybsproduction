import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { photoSrc, useLights } from './Lights.jsx'
import { SIZES } from '../media.js'
import { reducedMotion } from '../motion.js'
import { IconArrow } from './Icons.jsx'
import Split from './Split.jsx'
import { EXHIBITIONS, museumOf } from '../data.js'

const ROOMS = EXHIBITIONS.map((e) => ({ e, works: museumOf(e) }))
const metaOf = (e) => [e.kind, e.place, e.date].join(' · ')

// The Museum of Weddings: a room per wedding, each painted its own museum colour.
// Every photograph hangs in a carved gold frame (one Higgsfield frame, sliced in CSS)
// under its own spotlight. Arrows, keys or a sideways trackpad swipe walk along the wall;
// hovering lifts a frame; clicking a frame walks to it, clicking it again opens it large.
export default function Museum({ heading = true }) {
  const { open } = useLights()
  const stageRef = useRef(null)
  // Lights on once the room comes into view (kept in state so re-renders never switch them off).
  const [lit, setLit] = useState(false)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    if (reducedMotion()) { setLit(true); return }
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setLit(true); io.disconnect() } }, { rootMargin: '0px 0px -20% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const trackRef = useRef(null)
  const [room, setRoom] = useState(0)
  const [at, setAt] = useState(0)
  const [door, setDoor] = useState(false)
  const [shift, setShift] = useState(0)
  const { e, works } = ROOMS[room]
  const n = works.length

  const go = useCallback((i) => setAt(Math.max(0, Math.min(n - 1, i))), [n])

  // Keep the frame you are standing in front of in the middle of the wall.
  const centre = useCallback(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return
    const f = track.children[at]
    if (!f) return
    setShift(stage.clientWidth / 2 - (f.offsetLeft + f.offsetWidth / 2))
  }, [at, stageRef])
  useLayoutEffect(() => { centre() }, [centre, room])
  useEffect(() => {
    window.addEventListener('resize', centre)
    return () => window.removeEventListener('resize', centre)
  }, [centre])

  // Through the doorway into another room: lights down, change rooms, lights up.
  const enter = (r) => {
    if (r === room) return
    if (reducedMotion()) { setRoom(r); setAt(0); return }
    setDoor(true)
    setTimeout(() => { setRoom(r); setAt(0) }, 520)
    setTimeout(() => setDoor(false), 640)
  }

  // A sideways trackpad swipe or shift + wheel walks the wall (the page keeps its normal scroll).
  const wheelLock = useRef(0)
  const onWheel = (ev) => {
    const dx = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.shiftKey ? ev.deltaY : 0
    if (!dx) return
    ev.preventDefault()
    const now = Date.now()
    if (now - wheelLock.current < 420 || Math.abs(dx) < 8) return
    wheelLock.current = now
    go(at + (dx > 0 ? 1 : -1))
  }
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  })

  const onKey = (ev) => {
    if (ev.key === 'ArrowRight') { ev.preventDefault(); go(at + 1) }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); go(at - 1) }
  }

  const viewer = works.map((p) => ({ kind: 'photo', id: p.id, alt: p.alt, title: e.title, meta: metaOf(e) }))
  const current = works[at]

  return (
    <section className="museum" aria-labelledby="museum-title">
      {heading && (
        <div className="wrap museum-head">
          <Split id="museum-title" className="h-display" text="The Museum of Weddings" />
          <p className="body">Three rooms, one wedding in each. Walk along the wall with the arrows, step closer to any frame, and click it to see it large.</p>
        </div>
      )}

      <div className="wrap">
        <div className="doors" role="tablist" aria-label="Rooms of the museum">
          {ROOMS.map((r, i) => (
            <button key={r.e.slug} role="tab" aria-selected={i === room} className={i === room ? 'on' : ''} onClick={() => enter(i)}>
              <span className="door-n">Room {r.e.room.n}</span>
              <span className="door-t">{r.e.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className={`gallery-room${lit ? ' in' : ''}${door ? ' door' : ''}`}
        style={{ '--wall': e.room.wall }}
        tabIndex={0}
        onKeyDown={onKey}
        aria-roledescription="museum room"
        aria-label={`Room ${e.room.n}, ${e.title}. Use the left and right arrow keys to walk along the wall.`}
      >
        <div className="room-rail" aria-hidden="true" />
        <div className="room-title" aria-hidden="true">
          <span className="room-n">Room {e.room.n}</span>
          <span className="room-name">{e.title}</span>
          <span className="room-meta">{metaOf(e)}</span>
        </div>

        <div ref={trackRef} className="wall-track" style={{ transform: `translateX(${shift}px)` }}>
          {works.map((p, i) => {
            const [w, h] = SIZES[p.id] || [1200, 1600]
            return (
              <button
                key={`${room}-${p.id}`}
                className={`gilt-hang${i === at ? ' here' : ''}${w > h ? ' wide' : ''}`}
                style={{ '--ar': `${w} / ${h}`, '--d': `${i * 90}ms` }}
                onClick={() => (i === at ? open(viewer, i) : go(i))}
                aria-label={i === at ? `Open larger: ${p.alt}` : `Walk to: ${p.alt}`}
                tabIndex={-1}
              >
                <span className="lamp" aria-hidden="true" />
                <span className="pool" aria-hidden="true" />
                <span className="gilt">
                  <img src={photoSrc(p.id)} alt={p.alt} loading="lazy" decoding="async" />
                </span>
              </button>
            )
          })}
        </div>

        <div className="room-floor" aria-hidden="true" />

        <button className="walk walk-prev" onClick={() => go(at - 1)} disabled={at === 0} aria-label="Walk left"><IconArrow dir="left" /></button>
        <button className="walk walk-next" onClick={() => go(at + 1)} disabled={at === n - 1} aria-label="Walk right"><IconArrow /></button>

        <div className="placard" aria-live="polite">
          <span className="placard-no">No. {at + 1} of {n}</span>
          <span className="placard-t">{current.alt}</span>
          <span className="placard-m">{e.title} · {e.place}{e.date ? ` · ${e.date}` : ''}</span>
        </div>

        <span className="door-curtain" aria-hidden="true" />
      </div>

      <div className="wrap museum-foot">
        <p className="museum-hint">Arrows, your keyboard or a sideways swipe on the trackpad walk the wall.</p>
        <Link className="button ghost" to={`/weddings/${e.slug}`}>Enter {e.title} <IconArrow /></Link>
      </div>
    </section>
  )
}
