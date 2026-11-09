import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView, reducedMotion } from '../motion.js'
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

      {/* Phones: the same services, one after another */}
      <div className="svc-stack wrap">
        <h2 className="h-display">What we do</h2>
        {SERVICES.map((x, i) => <StackItem key={x.id} s={x} i={i} />)}
        <p className="svc-also">{ALSO}</p>
        <Link className="link" to="/services">All services and collections <IconArrow /></Link>
      </div>
    </section>
  )
}

function StackItem({ s, i }) {
  const ref = useInView({ rootMargin: '0px 0px -15% 0px' })
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return (
    <article ref={ref} className="svc-card">
      <figure className="print s develop">
        <Media m={s.media} active={on} />
      </figure>
      <div className="svc-card-copy">
        <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="h-section">{s.title}</h3>
        <p className="lede">{s.line}</p>
        <p className="body">{s.text}</p>
        <ul className="svc-items">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </article>
  )
}
