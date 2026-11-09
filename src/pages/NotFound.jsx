import { Link } from 'react-router-dom'
import { usePageTitle } from './usePageTitle.js'

export default function NotFound() {
  usePageTitle('Room not found')
  return (
    <section className="empty-room">
      <div>
        <h1 className="vinyl" style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}>Empty room</h1>
        <p className="lede">Nothing hangs on this wall. The exhibition you are looking for may have moved.</p>
        <Link className="button" to="/weddings">See the weddings</Link>
      </div>
    </section>
  )
}
