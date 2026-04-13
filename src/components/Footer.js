import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner container">

        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-name">FOSSEE</span>
            <span className="brand-tagline">Workshop Portal</span>
          </div>
          <p className="footer-about">
            FOSSEE (Free and Open Source Software for Education) is a project
            at IIT Bombay, funded by the National Mission on Education through ICT.
          </p>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/workshops">All Workshops</Link></li>
            <li><Link to="/book">Book a Workshop</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="https://fossee.in" target="_blank" rel="noreferrer">
                FOSSEE Website
              </a>
            </li>
            <li>
              <a href="https://spoken-tutorial.org" target="_blank" rel="noreferrer">
                Spoken Tutorials
              </a>
            </li>
            <li>
              <a href="https://iitb.ac.in" target="_blank" rel="noreferrer">
                IIT Bombay
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-links">
            <li>📧 contact@fossee.in</li>
            <li>📍 IIT Bombay, Mumbai</li>
            <li>🕐 Mon–Fri, 9am–5pm</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2025 FOSSEE, IIT Bombay. All rights reserved.</p>
          <p className="footer-note">
            Funded by National Mission on Education through ICT, MHRD.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;