import { SIZES } from '../media.js'
import { photoSrc, useLights } from './Lights.jsx'

// A matted, framed print hung on the wall. Clicking it brings the lights down.
// `walk` is the list of prints the viewer can step through from here.
export default function Print({ photo, walk, index = 0, title, meta, size = '', eager = false, no, children, className = '' }) {
  const { open } = useLights()
  const [w, h] = SIZES[photo.id] || [1200, 1600]
  const list = (walk || [photo]).map((p) => ({ kind: 'photo', id: p.id, alt: p.alt, title, meta }))
  const at = walk ? walk.findIndex((p) => p.id === photo.id) : 0

  return (
    <div className={`print-wrap ${className}`}>
      <figure className={`print ${size}`}>
        <button className="print-hit" onClick={() => open(list, at < 0 ? index : at)} aria-label={`View larger: ${photo.alt}`}>
          <img
            src={photoSrc(photo.id)}
            alt={photo.alt}
            width={w}
            height={h}
            loading={eager ? 'eager' : 'lazy'}
            fetchpriority={eager ? 'high' : undefined}
            decoding="async"
          />
        </button>
      </figure>
      {no != null && <span className="no">No. {no}</span>}
      {children}
    </div>
  )
}
