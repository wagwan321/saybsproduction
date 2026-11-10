import { photoSrc, useLights } from './Lights.jsx'
import { SIZES } from '../media.js'

// Two strips of photographs drifting in opposite directions, like film through a gate.
// They move on their own (no swiping); hovering pauses them; a click opens the photo.
export default function Marquee({ rows }) {
  const { open } = useLights()
  const all = rows.flat()
  return (
    <section className="marquee" aria-label="Moments from recent weddings">
      {rows.map((row, r) => (
        <div className={`mq-row${r % 2 ? ' rev' : ''}`} key={r}>
          <div className="mq-track">
            {[0, 1].map((copy) => (
              <div className="mq-set" key={copy} aria-hidden={copy === 1}>
                {row.map((p) => {
                  const [w, h] = SIZES[p.id] || [1200, 1600]
                  return (
                    <button
                      key={p.id}
                      className="mq-item print xs"
                      tabIndex={copy === 1 ? -1 : 0}
                      onClick={() => open(all.map((x) => ({ kind: 'photo', id: x.id, alt: x.alt, title: 'SAYBS', meta: 'Moments' })), all.findIndex((x) => x.id === p.id))}
                      aria-label={`View larger: ${p.alt}`}
                    >
                      <img src={photoSrc(p.id)} alt={copy === 1 ? '' : p.alt} width={w} height={h} loading="eager" decoding="async" />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
