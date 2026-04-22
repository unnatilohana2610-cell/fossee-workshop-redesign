// Navbar.js - Sticky navigation bar with mobile hamburger menu
// Highlights active page link based on current URL
// Fully accessible with ARIA labels and keyboard support

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // Controls whether mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Gets current URL path to highlight active link
  const location = useLocation();

  // Returns true if current path matches given path
  const isActive = (path) => location.pathname === path;

  // Closes mobile menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header role="banner">
      {/* Main navigation with ARIA label for screen readers */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-inner">

          {/* Brand logo linking back to home */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <span className="brand-name">FOSSEE</span>
            <span className="brand-tagline">Workshop Portal</span>
          </Link>

          {/* Navigation links - hidden on mobile, shown when menu is open */}
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
            {/* Primary CTA button styled differently to stand out */}
            <Link
              to="/book"
              className="nav-link nav-book-btn"
              onClick={closeMenu}
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger button - only visible on mobile screens */}
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {/* Three spans animate into X when menu is open */}
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