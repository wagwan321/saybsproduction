// One drawn icon family: 1.25px strokes, square caps, 24px grid.
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'square', 'aria-hidden': true, focusable: 'false' }

export const IconFrame = () => (<svg {...base}><rect x="3.5" y="3.5" width="17" height="17" /><rect x="7" y="7" width="10" height="10" /></svg>)
export const IconFilm = () => (<svg {...base}><rect x="3.5" y="5.5" width="17" height="13" /><path d="M10 9.5v5l4.5-2.5z" /></svg>)
export const IconStudio = () => (<svg {...base}><rect x="3.5" y="7.5" width="17" height="11" /><path d="M8.5 7.5l1.5-2.5h4l1.5 2.5" /><circle cx="12" cy="13" r="3" /></svg>)
export const IconList = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h10" /></svg>)
export const IconDate = () => (<svg {...base}><rect x="3.5" y="5.5" width="17" height="15" /><path d="M3.5 10h17M8 3.5v4M16 3.5v4" /><path d="M10 15l1.5 1.5L15 13" /></svg>)
export const IconArrow = ({ dir = 'right' }) => (
  <svg {...base} style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}><path d="M4 12h15M14 7l5 5-5 5" /></svg>
)
export const IconClose = () => (<svg {...base}><path d="M5.5 5.5l13 13M18.5 5.5l-13 13" /></svg>)
export const IconPlay = () => (<svg {...base} fill="currentColor" stroke="none"><path d="M7 4.5v15l13-7.5z" /></svg>)
export const IconWhatsApp = () => (
  <svg {...base}><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.3 18.5z" /><path d="M9 8.6c.3-.6.9-.6 1.1 0l.6 1.4c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.2-.2.5-.3.8-.2l1.4.6c.6.2.6.8 0 1.1-1 .6-2.3.7-3.6-.1a8 8 0 0 1-2.7-2.7c-.8-1.3-.7-2.6-.1-3.6z" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const IconMail = () => (<svg {...base}><rect x="3.5" y="5.5" width="17" height="13" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>)
