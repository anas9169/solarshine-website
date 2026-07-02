import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <section className="footer-inner" aria-label="Footer navigation">
        <div className="footer-brand">
          <Link className="brand footer-logo" to="/">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="13" />
                <path d="M20 4v6M20 30v6M4 20h6M30 20h6M8.7 8.7l4.2 4.2M27.1 27.1l4.2 4.2M31.3 8.7l-4.2 4.2M12.9 27.1l-4.2 4.2" />
              </svg>
            </span>
            <span>SolarWash</span>
          </Link>
          <p>Cleaner panels. Greener planet.</p>
          <div className="social-links" aria-label="Social links">
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919999999999" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>
        <div>
          <h2>Quick Links</h2>
          <a href="/#why-clean">Why Clean?</a>
          <a href="/#process">How It Works</a>
          <a href="/#book">Book Online</a>
          <Link to="/earn">Referral Program</Link>
        </div>
        <div>
          <h2>Services</h2>
          <a href="/#services">Residential Cleaning</a>
          <a href="/#services">Commercial Cleaning</a>
          <a href="/#services">Panel Health Check</a>
        </div>
        <div>
          <h2>Contact Info</h2>
          <p>Lucknow, Uttar Pradesh</p>
          <p>+91 99999 99999</p>
          <p>hello@solarwash.in</p>
        </div>
      </section>
      <section className="footer-bottom" aria-label="Copyright">
        <p>Copyright 2026 SolarWash. All rights reserved.</p>
        <p>Serving Lucknow & surrounding areas</p>
      </section>
    </footer>
  )
}

export default Footer
