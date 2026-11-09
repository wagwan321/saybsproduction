import { useEffect, useRef, useState } from 'react'
import { FILM_SIZES } from '../media.js'
import { filmSrc, posterSrc, useLights } from './Lights.jsx'
import { IconPlay } from './Icons.jsx'

const ar = (id) => {
  const [w, h] = FILM_SIZES[id] || [9, 16]
  return `${w} / ${h}`
}

// A screen in the screening room: the poster waits, a click brings the lights
// down and plays the film with sound.
export function FilmScreen({ film, playlist, label = true }) {
  const { open } = useLights()
  const list = (playlist || [film]).map((f) => ({ kind: 'film', id: f.id, title: f.title, meta: [f.kind, f.place].filter(Boolean).join(' · ') }))
  const at = Math.max(0, list.findIndex((f) => f.id === film.id))
  return (
    <div className="film-card">
      <button className="screen-hit" onClick={() => open(list, at)} aria-label={`Play the film: ${film.title}`}>
        <div className="screen" style={{ '--ar': ar(film.id) }}>
          <img src={posterSrc(film.id)} alt="" loading="lazy" decoding="async" />
          <span className="play"><IconPlay /></span>
        </div>
      </button>
      {label && (
        <div className="label">
          <span className="label-title">{film.title}</span>
          <span className="label-meta">{[film.kind, film.place].filter(Boolean).join(' · ')}</span>
        </div>
      )}
    </div>
  )
}

// A silent loop that only loads and plays while it is on screen.
export function LoopFilm({ id, className = '', label }) {
  const ref = useRef(null)
  const [src, setSrc] = useState(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSrc(filmSrc(id))
        if (!still) requestAnimationFrame(() => v.play?.().catch(() => {}))
      } else v.pause?.()
    }, { rootMargin: '200px 0px' })
    io.observe(v)
    return () => io.disconnect()
  }, [id])
  return (
    <video
      ref={ref}
      className={className}
      src={src || undefined}
      poster={posterSrc(id)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      style={{ '--ar': ar(id) }}
    />
  )
}
