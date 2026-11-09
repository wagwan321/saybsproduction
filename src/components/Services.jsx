import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollVar, useInView, reducedMotion } from '../motion.js'
import { photoSrc, filmSrc, posterSrc } from './Lights.jsx'
import { SIZES } from '../media.js'
import { IconArrow } from './Icons.jsx'
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

// "What we do": on wide screens the section pins while the services pass through it, the
// framed picture wiping to each service's photograph or film. On phones each service stacks.
export default function Services() {
  const [at, setAt] = useState(0)
  const n = SERVICES.length
  const ref = useScrollVar('pin', '--p', (p) => setAt(Math.min(n - 1, Math.floor(p * n * 0.999))))
  const head = useInView()

  return (
    <section className="services" aria-labelledby="what-we-do">
      <div ref={ref} className="svc-pin" style={{ '--n': n }}>
        <div className="svc-stick">
          <div className="wrap svc-grid">
            <div className="svc-left">
              <h2 id="what-we-do" ref={head} className="h-display split-lite">What we do</h2>
              <ol className="svc-list">
                {SERVICES.map((s, i) => (
                  <li key={s.id} className={i === at ? 'on' : i < at ? 'past' : ''}>
                    <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="svc-t">{s.title}</span>
                  </li>
                ))}
              </ol>
              <div className="svc-detail" aria-live="polite">
                {SERVICES.map((s, i) => (
                  <div key={s.id} className={`svc-copy${i === at ? ' on' : ''}`} aria-hidden={i !== at}>
                    <p className="lede">{s.line}</p>
                    <p className="body">{s.text}</p>
                    <ul className="svc-items">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                ))}
              </div>
              <p className="svc-also">{ALSO}</p>
            </div>
            <div className="svc-stage">
              <figure className="print svc-frame">
                {SERVICES.map((s, i) => (
                  <div key={s.id} className={`svc-media${i === at ? ' on' : i < at ? ' past' : ''}`}>
                    <Media m={s.media} active={i === at} eager={i === 0} />
                  </div>
                ))}
              </figure>
              <div className="svc-meter" aria-hidden="true"><span /></div>
              <Link className="link" to="/services">All services and collections <IconArrow /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Phones: the same services, one after another */}
      <div className="svc-stack wrap">
        <h2 className="h-display">What we do</h2>
        {SERVICES.map((s, i) => <StackItem key={s.id} s={s} i={i} />)}
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
