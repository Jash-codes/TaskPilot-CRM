// src/components/Header.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div className="container header-container"> 
        {/* Simple Page Title */}
        <div className="page-title">
          Dashboard Overview
        </div>

        {/* User Profile Snippet (Right Side) */}
        {/* Wrapped entire block in Link to make it clickable */}
        <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white' }}>
              {user ? user.name : 'Guest'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8b9bb4' }}>
              Admin
            </div>
          </div>
          <div style={{ 
            width: '35px', height: '35px', borderRadius: '50%', 
            background: '#5C7C89', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', fontWeight: 'bold', color: 'white' 
          }}>
            {user ? user.name.charAt(0).toUpperCase() : 'G'}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;