import { NavLink } from 'react-router-dom'
import { IconFrame, IconFilm, IconStudio, IconList, IconDate } from './Icons.jsx'

// Phones only: an app-style bar so every room is one tap away.
export default function TabBar() {
  return (
    <nav className="tabbar" aria-label="Sections">
      <NavLink to="/weddings"><IconFrame />Weddings</NavLink>
      <NavLink to="/films"><IconFilm />Films</NavLink>
      <NavLink to="/services"><IconList />Services</NavLink>
      <NavLink to="/about"><IconStudio />Studio</NavLink>
      <NavLink to="/inquire" className="tab-date"><IconDate />Your date</NavLink>
    </nav>
  )
}
