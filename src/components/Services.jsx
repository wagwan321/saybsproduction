import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView, useNarrow, reducedMotion } from '../motion.js'
import { photoSrc, filmSrc, posterSrc } from './Lights.jsx'
import { SIZES } from '../media.js'
import { IconArrow } from './Icons.jsx'
import Split from './Split.jsx'
import { SERVICES, ALSO } from '../data.js'

function Media({ m, active, eager }) {
  const v = useRef(null)
  useEffect(() => {
    const el = v.current
    if (!el) return
    if (active && !reducedMotion()) {
      if (!el.getAttribute('src')) el.src = filmSrc(m.id)
      el.play?.().catch(() => {})
    } else el.pause?.()
  }, [active, m.id])
  if (m.kind === 'film') {
    return <video ref={v} poster={posterSrc(m.id)} muted loop playsInline preload="none" aria-label={m.alt} />
  }
  const [w, h] = SIZES[m.id] || [1200, 1600]
  return <img src={photoSrc(m.id)} alt={m.alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}

// "What we do": the visitor moves through the services with the mouse (or taps / arrow keys).
// Pointing at a service wipes the framed picture to its photograph or film and shows its details.
export default function Services() {
  const narrow = useNarrow(900)
  if (narrow) return <ServicesAccordion />
  return <ServicesHover />
}

// Phones: an accordion. Opening a service shows its picture and details right under it,
// and closes the one that was open.
function ServicesAccordion() {
  const [open, setOpen] = useState(0)
  const rows = useRef([])
  const toggle = (i) => {
    const next = open === i ? -1 : i
    setOpen(next)
    if (next < 0) return
    // Wait until the previous panel has fully folded and the new one has opened, then
    // bring the opened service (title and picture) fully onto the screen.
    setTimeout(() => {
      const el = rows.current[next]
      if (!el) return
      const head = document.querySelector('.header')?.offsetHeight || 60
      const y = el.getBoundingClientRect().top + window.scrollY - head - 8
      window.scrollTo({ top: y, behavior: reducedMotion() ? 'auto' : 'smooth' })
    }, 520)
  }
  return (
    <section className="services" aria-labelledby="what-we-do">
      <div className="wrap svc-acc">
        <Split id="what-we-do" className="h-display" text="What we do" />
        <ol className="acc-list">
          {SERVICES.map((x, i) => {
            const on = open === i
            return (
              <li key={x.id} ref={(el) => (rows.current[i] = el)} className={on ? 'on' : ''}>
                <button className="acc-head" aria-expanded={on} aria-controls={`acc-${x.id}`} onClick={() => toggle(i)}>
                  <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc-t">{x.title}</span>
                  <span className="acc-sign" aria-hidden="true" />
                </button>
                <div className="acc-body" id={`acc-${x.id}`} role="region" aria-label={x.title}>
                  <div className="acc-inner">
                    <figure className="print acc-media">
                      <span className="acc-pic"><Media m={x.media} active={on} eager /></span>
                    </figure>
                    <p className="lede">{x.line}</p>
                    <p className="body">{x.text}</p>
                    <ul className="svc-items">{x.items.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        <p className="svc-also">{ALSO}</p>
        <Link className="link" to="/services">All services and collections <IconArrow /></Link>
      </div>
    </section>
  )
}

function ServicesHover() {
  const [at, setAt] = useState(0)
  const n = SERVICES.length
  const box = useInView()
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setAt((a) => (a + 1) % n); focusRow((at + 1) % n) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setAt((a) => (a - 1 + n) % n); focusRow((at - 1 + n) % n) }
  }
  const list = useRef(null)
  const focusRow = (i) => list.current?.querySelectorAll('button')[i]?.focus()
  const s = SERVICES[at]

  return (
    <section className="services" aria-labelledby="what-we-do">
      <div ref={box} className="wrap svc-grid svc-hover">
        <div className="svc-left">
          <Split id="what-we-do" className="h-display" text="What we do" />
          <ol ref={list} className="svc-list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
            {SERVICES.map((x, i) => (
              <li key={x.id} className={i === at ? 'on' : ''}>
                <button
                  role="tab"
                  id={`svc-tab-${x.id}`}
                  aria-selected={i === at}
                  aria-controls="svc-panel"
                  tabIndex={i === at ? 0 : -1}
                  onMouseEnter={() => setAt(i)}
                  onFocus={() => setAt(i)}
                  onClick={() => setAt(i)}
                >
                  <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc-t">{x.title}</span>
                  <span className="svc-arrow" aria-hidden="true"><IconArrow /></span>
                </button>
              </li>
            ))}
          </ol>
          <div className="svc-detail" id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${s.id}`}>
            {SERVICES.map((x, i) => (
              <div key={x.id} className={`svc-copy${i === at ? ' on' : ''}`} aria-hidden={i !== at}>
                <p className="lede">{x.line}</p>
                <p className="body">{x.text}</p>
                <ul className="svc-items">{x.items.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="svc-also">{ALSO}</p>
        </div>
        <div className="svc-stage">
          <figure className="print svc-frame">
            {SERVICES.map((x, i) => (
              <div key={x.id} className={`svc-media${i === at ? ' on' : ''}`}>
                <Media m={x.media} active={i === at} eager={i === 0} />
              </div>
            ))}
            <figcaption className="svc-count" aria-hidden="true">{String(at + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</figcaption>
          </figure>
          <Link className="link" to="/services">All services and collections <IconArrow /></Link>
        </div>
      </div>

    </section>
  )
}
