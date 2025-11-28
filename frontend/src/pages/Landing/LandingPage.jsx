import React from 'react';
import { Link } from 'react-router-dom';
import RotatingText from '../../components/RotatingText';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">Taskpilot</div>
        <div className="nav-links">
          <Link to="/login" className="btn-link">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <header className="hero-section">
        {/* The Flex Container to align Text + Box side-by-side */}
        <div className="hero-headline-flex">
          <span className="hero-static-text">Manage your</span>
          
          <div className="hero-rotating-wrapper">
            <RotatingText 
              texts={['Freelance', 'Agency', 'Startup', 'Business']}
              mainClassName="rotating-green-box"
              staggerFrom="first" /* Changed from 'last' to 'first' for natural reading flow */
              initial={{ y: "100%", opacity: 0 }} /* Start from bottom */
              animate={{ y: 0, opacity: 1 }}      /* Slide to center */
              exit={{ y: "-100%", opacity: 0 }}   /* Exit to top (Rolling Up) */
              staggerDuration={0.1}               /* Slower stagger for a clearer "roll" */
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 20, stiffness: 100 }} /* Smooth spring */
              rotationInterval={6000} /* Time between words */
            />
          </div>
        </div>

        <h1 className="hero-sub-static">Business with Ease.</h1>

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