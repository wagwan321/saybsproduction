import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow, IconClose } from './Icons.jsx'

// "Lights down": opening a print or a film dims the room to black and shows the
// work on its own with its wall label. Arrows walk the wall, Esc brings the lights up.

const LightsContext = createContext({ open: () => {} })
export const useLights = () => useContext(LightsContext)

export const photoSrc = (id) => `/media/photos/${id}.jpg`
export const filmSrc = (id) => `/media/films/${id}.mp4`
export const posterSrc = (id) => `/media/films/${id}.jpg`

export function LightsProvider({ children }) {
  const [view, setView] = useState(null) // { items, index }
  const [state, setState] = useState('closed') // closed | open | closing
  const returnFocus = useRef(null)
  const closeBtn = useRef(null)
  const dialog = useRef(null)

  const open = useCallback((items, index = 0) => {
    returnFocus.current = document.activeElement
    setView({ items, index })
    setState('closed')
    setTimeout(() => setState('open'), 30)
  }, [])

  const close = useCallback(() => {
    setState('closing')
    setTimeout(() => {
      setView(null)
      setState('closed')
      returnFocus.current?.focus?.()
    }, 420)
  }, [])

  const step = useCallback((d) => {
    setView((v) => (v ? { ...v, index: (v.index + d + v.items.length) % v.items.length } : v))
  }, [])

  useEffect(() => {
    if (!view) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll('button, video[controls], a[href]')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); root.style.overflow = prev }
  }, [view, close, step])

  // Swipe on phones: left and right walk the wall.
  const touch = useRef(null)
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    touch.current = null
  }

  const item = view?.items[view.index]
  const many = view && view.items.length > 1

  return (
    <LightsContext.Provider value={{ open }}>
      {children}
      {view && (
        <div
          ref={dialog}
          className="lights"
          data-state={state}
          role="dialog"
          aria-modal="true"
          aria-label={item.title || 'Photograph'}
          onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('lights-stage')) close() }}
        >
          <div className="lights-top">
            <span className="lights-count" aria-live="polite">{many ? `${view.index + 1} / ${view.items.length}` : ''}</span>
            <button ref={closeBtn} className="lights-btn" onClick={close}>Close <IconClose /></button>
          </div>
          <div className="lights-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {item.kind === 'film' ? (
              <video key={item.id} src={filmSrc(item.id)} poster={posterSrc(item.id)} controls autoPlay playsInline />
            ) : (
              <img key={item.id} src={photoSrc(item.id)} alt={item.alt} />
            )}
            {many && (
              <>
                <button className="lights-btn lights-arrow prev" onClick={() => step(-1)} aria-label="Previous"><IconArrow dir="left" /></button>
                <button className="lights-btn lights-arrow next" onClick={() => step(1)} aria-label="Next"><IconArrow /></button>
              </>
            )}
          </div>
          <div className="lights-cap">
            <div>
              {item.title && <span className="label-title">{item.title}</span>}
              {item.meta && <span className="label-meta">{item.meta}</span>}
            </div>
            {item.link
              ? <Link className="button light lights-go" to={item.link.to} onClick={() => { setView(null); setState('closed') }}>{item.link.label} <IconArrow /></Link>
              : item.kind !== 'film' && <span className="label-meta">{item.alt}</span>}
          </div>
        </div>
      )}
    </LightsContext.Provider>
  )
}
