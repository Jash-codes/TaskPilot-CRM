import React from 'react';
import { Link } from 'react-router-dom';
import RotatingText from '../../components/RotatingText';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="logo">Taskpilot</div>
        <div className="nav-links">
          <Link to="/login" className="btn-link">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        {/* Updated Title Structure */}
        <div className="hero-title-container">
          <h1 className="hero-title-static">Manage your</h1>
          
          <div className="hero-rotating-wrapper">
            <RotatingText 
              texts={['Freelance', 'Agency', 'Startup', 'Business']}
              mainClassName="rotating-text-badge"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

          <h1 className="hero-title-static">Business with Ease.</h1>
        </div>

        <p className="hero-subtitle">
          Invoices, Projects, Clients, and Contracts. All in one place.
          Stop juggling apps and start scaling your work.
        </p>
        
        <div className="hero-buttons">
          <Link to="/register" className="btn-large">Start for Free</Link>
          <button className="btn-outline">View Demo</button>
        </div>
        
        <div className="hero-visual">
          <div className="circle-gradient"></div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;