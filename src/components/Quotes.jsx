import { useEffect, useState } from 'react'
import { reducedMotion } from '../motion.js'

// The couples' words, one at a time, changing on their own every few seconds.
export default function Quotes({ items }) {
  const [at, setAt] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold || reducedMotion()) return
    const t = setTimeout(() => setAt((a) => (a + 1) % items.length), 7000)
    return () => clearTimeout(t)
  }, [at, hold, items.length])
  return (
    <section
      className="quotes"
      aria-label="What couples say"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="wrap">
        <div className="quote-stage">
          {items.map((q, i) => (
            <figure key={q.name} className={`quote${i === at ? ' on' : ''}`} aria-hidden={i !== at}>
              <blockquote><p>“{q.short || q.full}”</p></blockquote>
              <figcaption className="caps">{q.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="quote-dots">
          {items.map((q, i) => (
            <button key={q.name} className={i === at ? 'on' : ''} onClick={() => setAt(i)} aria-label={`Show the words of ${q.name}`} aria-pressed={i === at}>
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
