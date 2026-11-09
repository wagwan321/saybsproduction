import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Split from '../components/Split.jsx'
import Rv from '../components/Reveal.jsx'
import Process from '../components/Process.jsx'
import Print from '../components/Print.jsx'
import { photoSrc, filmSrc, posterSrc } from '../components/Lights.jsx'
import { useInView, reducedMotion } from '../motion.js'
import { SIZES } from '../media.js'
import { IconArrow } from '../components/Icons.jsx'
import { SERVICES, ALSO, COLLECTIONS, PACKAGE_PHOTOS } from '../data.js'
import { usePageTitle } from './usePageTitle.js'

function ServiceBlock({ s, i }) {
  const ref = useInView({ rootMargin: '0px 0px -20% 0px' })
  const v = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  useEffect(() => {
    const el = v.current
    if (!el) return
    if (on && !reducedMotion()) { if (!el.getAttribute('src')) el.src = filmSrc(s.media.id); el.play?.().catch(() => {}) }
    else el.pause?.()
  }, [on, s.media.id])
  const [w, h] = SIZES[s.media.id] || [1200, 1600]
  return (
    <article ref={ref} id={s.id} className={`svc-block${i % 2 ? ' flip' : ''}`}>
      <figure className="print develop svc-block-media">
        {s.media.kind === 'film'
          ? <video ref={v} poster={posterSrc(s.media.id)} muted loop playsInline preload="none" aria-label={s.media.alt} />
          : <img src={photoSrc(s.media.id)} alt={s.media.alt} width={w} height={h} loading={i < 1 ? 'eager' : 'lazy'} decoding="async" />}
      </figure>
      <div className="svc-block-copy">
        <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
        <h2 className="h-display">{s.title}</h2>
        <p className="lede">{s.line}</p>
        <p className="body">{s.text}</p>
        <ul className="svc-items">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
        <Link className="link" to="/inquire">Ask about {s.title.toLowerCase()} <IconArrow /></Link>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  usePageTitle('Services')
  return (
    <>
      <header className="page-head split">
        <div className="wrap">
          <Split as="h1" className="vinyl" text="Services" />
          <Rv as="p" className="lede">Photography and film for weddings, engagements, studio portraits and creative projects. One team, from the first message to the final film.</Rv>
        </div>
      </header>

      <nav className="wrap svc-jump" aria-label="Services on this page">
        {SERVICES.map((s, i) => (
          <a key={s.id} href={`#${s.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a>
        ))}
      </nav>

      <div className="wrap svc-blocks">
        {SERVICES.map((s, i) => <ServiceBlock key={s.id} s={s} i={i} />)}
        <p className="svc-also big">{ALSO}</p>
      </div>

      <Process />

      <section className="wrap collections" aria-labelledby="collections">
        <div className="section-head">
          <Split id="collections" className="h-display" text="Collections" />
          <Rv as="p" className="body">No two weddings are the same, so every collection is shaped around yours. Send us your date and we reply with availability and prices.</Rv>
        </div>
        <ol className="pricelist">
          {COLLECTIONS.map((c, i) => (
            <Rv as="li" className="price-row" key={c.title} delay={i * 60}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h-title">{c.title}</h3>
              <ul>{c.lines.map((l) => <li key={l}>{l}</li>)}</ul>
              <span className="price">Price on request</span>
            </Rv>
          ))}
        </ol>
        <p className="draft-note">Draft list: SAYBS to confirm what each collection includes.</p>
        <div className="packages-hang">
          {PACKAGE_PHOTOS.map((p, i) => (
            <Print key={p.id} photo={p} walk={PACKAGE_PHOTOS} title="SAYBS" meta="From the archive" size={i ? 's' : ''} />
          ))}
        </div>
        <div className="next">
          <span className="h-display">Your date, your story.</span>
          <Link className="button" to="/inquire">Check your date</Link>
        </div>
      </section>
    </>
  )
}
