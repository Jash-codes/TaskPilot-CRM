import React, { useRef } from 'react'; // Import useRef
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, PenTool, ShieldCheck, Zap } from 'lucide-react'; // Import Icons
import RotatingText from '../../components/RotatingText';
import dashboardPreview from '../../assets/dashboard-preview.png';
import './LandingPage.css';

const LandingPage = () => {
  // 1. Create a reference for the Features section
  const featuresRef = useRef(null);

  // 2. Scroll function
  const scrollToDemo = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-container">
      <div className="grid-background"></div>

      <nav className="landing-nav">
        <div className="logo">Taskpilot</div>
        <div className="nav-links">
          <Link to="/login" className="btn-link">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-headline-flex">
            <span className="hero-static-text">Manage your</span>
            <div className="hero-rotating-wrapper">
              <RotatingText 
                texts={['Freelance', 'Agency', 'Startup', 'Business']}
                mainClassName="rotating-green-box"
                staggerFrom="first"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.1}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                rotationInterval={3000}
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
            {/* 3. Attach Scroll Function */}
            <button className="btn-outline" onClick={scrollToDemo}>View Demo</button>
          </div>
        </div>

        <div className="hero-mockup-container">
          <div className="mockup-glass">
            <div className="mockup-header">
              <div className="mockup-dots"><span></span><span></span><span></span></div>
              <div className="mockup-bar">taskpilot.app/dashboard</div>
            </div>
            <div className="mockup-body-image">
              <img src={dashboardPreview} alt="Taskpilot Dashboard" />
            </div>
          </div>
          <div className="mockup-glow"></div>
        </div>
      </header>

      {/* --- FEATURES SECTION (The "Demo" Content) --- */}
      <section className="features-section" ref={featuresRef}>
        <div className="features-header">
          <h2>Everything you need to run your business</h2>
          <p>Powerful tools integrated into one seamless platform.</p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon icon-blue"><LayoutDashboard size={24} /></div>
            <h3>Project Management</h3>
            <p>Track tasks, deadlines, and progress in real-time with our intuitive kanban and list views.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon icon-green"><Users size={24} /></div>
            <h3>Client CRM</h3>
            <p>Keep all client details, notes, and history organized. Never lose track of a contact again.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon icon-orange"><FileText size={24} /></div>
            <h3>Invoicing</h3>
            <p>Create professional invoices in seconds. Track payments and get paid faster.</p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon icon-purple"><PenTool size={24} /></div>
            <h3>E-Signatures</h3>
            <p>Send contracts and get them signed digitally without leaving the platform.</p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon icon-red"><ShieldCheck size={24} /></div>
            <h3>Secure Data</h3>
            <p>Your business data is encrypted and backed up daily. Security is our top priority.</p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon icon-teal"><Zap size={24} /></div>
            <h3>Automation</h3>
            <p>Automate repetitive tasks and focus on the work that actually matters.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;