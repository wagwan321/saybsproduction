import { Link } from 'react-router-dom'

// The SAYBS lockup from the studio's Instagram mark: the name in a high-contrast
// Didone with wide tracking, PHOTOGRAPHY & FILM between two hairlines.
export default function Logo({ className = '', as = 'link', headingLevel }) {
  const inner = (
    <>
      {headingLevel === 1 ? <h1 className="logo-word">SAYBS</h1> : <span className="logo-word">SAYBS</span>}
      <span className="logo-tag">Photography &amp; Film</span>
    </>
  )
  if (as === 'div') return <div className={`logo ${className}`} aria-label="SAYBS, Photography and Film">{inner}</div>
  return (
    <Link to="/" className={`logo ${className}`} aria-label="SAYBS, Photography and Film, home">
      {inner}
    </Link>
  )
}
