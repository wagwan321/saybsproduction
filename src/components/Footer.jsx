import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { CONTACT, waLink } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Logo />
        <div className="footer-cols">
          <div>
            <h2>The studio</h2>
            <p>Wedding photography and cinematic films.<br />Lebanon and worldwide.</p>
          </div>
          <div>
            <h2>Visit</h2>
            <p><a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">{CONTACT.address}</a></p>
          </div>
          <div>
            <h2>Write</h2>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp {CONTACT.phoneDisplay}</a></li>
              <li><a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram @saybsproduction</a></li>
            </ul>
          </div>
          <div>
            <h2>Rooms</h2>
            <ul>
              <li><Link to="/weddings">Weddings</Link></li>
              <li><Link to="/films">Films</Link></li>
              <li><Link to="/about">The studio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/inquire">Check your date</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} SAYBS Production</span>
          <span>Bookings open for 2027</span>
        </div>
      </div>
    </footer>
  )
}
