import { useEffect, useRef, useState } from 'react'

// One shared scroll/resize loop drives every scroll-linked element on the page.
// Each element gets a CSS custom property (0 to 1) and CSS does the drawing.
const subs = new Set()
let ticking = false
const run = () => {
  ticking = false
  const vh = window.innerHeight
  subs.forEach((fn) => fn(vh))
}
const kick = () => {
  if (!ticking) { ticking = true; requestAnimationFrame(run) }
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', kick, { passive: true })
  window.addEventListener('resize', kick)
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (v) => Math.min(1, Math.max(0, v))

/**
 * mode 'through': 0 when the element's top enters the bottom of the screen, 1 when its bottom leaves the top.
 * mode 'pin': for a tall section with a sticky child, 0 at the section's top, 1 when its end reaches the bottom.
 * mode 'leave': 0 while the element sits at the top of the screen, 1 when it has scrolled one screen away.
 */
export function useScrollVar(mode = 'through', name = '--p', onChange) {
  const ref = useRef(null)
  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = -1
    const fn = (vh) => {
      const r = el.getBoundingClientRect()
      let p
      if (mode === 'pin') p = clamp(-r.top / Math.max(1, r.height - vh))
      else if (mode === 'leave') p = clamp(-r.top / vh)
      else p = clamp((vh - r.top) / (vh + r.height))
      const q = Math.round(p * 1000) / 1000
      if (q !== last) {
        last = q
        el.style.setProperty(name, q)
        cb.current?.(q)
      }
    }
    subs.add(fn)
    fn(window.innerHeight)
    return () => subs.delete(fn)
  }, [mode, name])
  return ref
}

/** Adds .in once the element is on screen (or immediately when motion is reduced). */
export function useInView(options = { rootMargin: '0px 0px -10% 0px' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}

/** True while the screen is at most `max` pixels wide (follows rotation and resizing). */
export function useNarrow(max = 900) {
  const q = `(max-width: ${max}px)`
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setNarrow(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return narrow
}
