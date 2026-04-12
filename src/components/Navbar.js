import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header role="banner">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-inner">

          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <span className="brand-name">FOSSEE</span>
            <span className="brand-tagline">Workshop Portal</span>
          </Link>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/workshops"
              className={`nav-link ${isActive('/workshops') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Workshops
            </Link>
            <Link
              to="/login"
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/book"
              className="nav-link nav-book-btn"
              onClick={closeMenu}
            >
              Book Now
            </Link>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;