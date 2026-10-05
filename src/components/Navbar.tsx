import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="brand" aria-label="Countries Explorer home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.5 12h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
          </svg>
        </span>
        <span>Countries<span className="brand-light">Explorer</span></span>
      </NavLink>
      <div className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-label="Countries">
          Countries
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-label="Search history">
          History
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-label="Favorite countries">
          Favorites
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-label="About Countries Explorer">
          About
        </NavLink>
      </div>
    </nav>
  )
}
