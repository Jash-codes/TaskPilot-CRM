import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure this is 'from'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // This line is the one that was missing or deleted
  const { user } = useSelector((state) => state.auth); 

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Taskpilot</Link>
        </div>
        <nav>
          <ul>
            {user ? (
              // If user is logged in
              <>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/clients">Clients</Link>
                </li>
                <li>
                  <Link to="/projects">Projects</Link>
                </li>
                <li>
                  <button className="btn btn-logout" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // If user is logged out
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn">Register</Link>
                </li>
              </>
            )}
            <DarkModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;