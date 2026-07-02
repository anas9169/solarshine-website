import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="SolarWash home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="13" />
              <path d="M20 4v6M20 30v6M4 20h6M30 20h6M8.7 8.7l4.2 4.2M27.1 27.1l4.2 4.2M31.3 8.7l-4.2 4.2M12.9 27.1l-4.2 4.2" />
            </svg>
          </span>
          <span>SolarWash</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <NavLink to="/earn">Earn With Us</NavLink>
        </div>
        <a className="nav-cta" href="/#book">
          Book a Cleaning
        </a>
      </nav>
    </header>
  )
}

export default Navbar
