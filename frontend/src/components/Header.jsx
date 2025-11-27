// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div className="container header-container"> 
        {/* If user is logged in, show Page Title. If not, show Logo. */}
        {user ? (
          <div className="page-title">
            Dashboard Overview
          </div>
        ) : (
          <div className="logo">
            <Link to="/">Taskpilot</Link>
          </div>
        )}

        {/* Public Navigation (Only show if NOT logged in) */}
        {!user && (
          <nav className="public-nav">
            <ul>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="btn btn-small">Register</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;