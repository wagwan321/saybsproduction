import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Header() {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const [y, setY] = useState(0)
  const [vh, setVh] = useState(800)
  useEffect(() => {
    const on = () => { setY(window.scrollY); setVh(window.innerHeight) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  // On the homepage the header floats over the opening films in white, and the big
  // SAYBS over the films is the logo; past the films it turns back into the white bar.
  const overHero = home && y < vh - 70

  return (
    <header className={`header${home ? ' on-home' : ''}${y > 8 ? ' is-scrolled' : ''}${overHero ? ' over-hero logo-away' : ''}`}>
      <div className="wrap">
        <Logo className="logo--nav" />
        <nav className="nav" aria-label="Main">
          <NavLink to="/weddings">Weddings</NavLink>
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">Studio</NavLink>
          <NavLink to="/inquire" className="nav-date">Check your date</NavLink>
        </nav>
      </div>
    </header>
  )
}
