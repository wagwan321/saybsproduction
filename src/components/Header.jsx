import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Header() {
  const { pathname } = useLocation()
  const [y, setY] = useState(0)
  useEffect(() => {
    const on = () => setY(window.scrollY)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  // On the homepage the big wall title is the logo; the small one waits until it has scrolled away.
  const hideLogo = pathname === '/' && y < 380

  return (
    <header className={`header${y > 8 ? ' is-scrolled' : ''}${hideLogo ? ' logo-away' : ''}`}>
      <div className="wrap">
        <Logo className="logo--nav" />
        <nav className="nav" aria-label="Main">
          <NavLink to="/weddings">Weddings</NavLink>
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/about">Studio</NavLink>
          <NavLink to="/packages">Packages</NavLink>
          <NavLink to="/inquire" className="nav-date">Check your date</NavLink>
        </nav>
      </div>
    </header>
  )
}
