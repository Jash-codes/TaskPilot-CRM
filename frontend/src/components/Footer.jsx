// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Top Section: Links & Logo */}
        <div className="footer-top">
          
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">Taskpilot</h2>
            <div className="footer-lang">
              <span>🌐 English (International)</span>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="GitHub"><Github size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><Link to="#">Features</Link></li>
              <li><Link to="#">Pricing</Link></li>
              <li><Link to="#">API</Link></li>
              <li><Link to="#">Integrations</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Careers</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
              <li><Link to="#">Cookie Policy</Link></li>
              <li><Link to="#">Security</Link></li>
            </ul>
          </div>

          {/* Column 5: Apps (Buttons) */}
          <div className="footer-col apps-col">
            <h3>Get the App</h3>
            <button className="app-btn">
              <span>Download on the</span>
              <strong>App Store</strong>
            </button>
            <button className="app-btn">
              <span>Get it on</span>
              <strong>Google Play</strong>
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section: Stats & Copyright */}
        <div className="footer-bottom">
          <div className="footer-stats">
            <div className="stat-item">
              <strong>12,450+</strong>
              <span>Active Users</span>
            </div>
            <div className="stat-item">
              <strong>$4.2M+</strong>
              <span>Invoiced</span>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Taskpilot Inc. All rights reserved.</p>
            <p className="footer-legal-text">
              Taskpilot is a registered trademark. 
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;