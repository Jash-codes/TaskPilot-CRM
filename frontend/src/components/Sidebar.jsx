// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// FIXED IMPORT PATH BELOW:
import { logout, reset } from '../features/auth/authSlice'; 
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  FileText, 
  PenTool, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="logo-icon">T</div>
        <h2>Taskpilot</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        
        <div className="nav-group">
          <h3>Main Menu</h3>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-group">
          <h3>CRM</h3>
          <ul>
            <li>
              <NavLink to="/clients" className={({ isActive }) => (isActive ? 'active' : '')}>
                <Users size={20} />
                <span>Clients</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                <FolderOpen size={20} />
                <span>Projects</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-group">
          <h3>Finance</h3>
          <ul>
            <li>
              <NavLink to="/invoices" className={({ isActive }) => (isActive ? 'active' : '')}>
                <FileText size={20} />
                <span>Invoices</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-group">
          <h3>Tools</h3>
          <ul>
            <li>
              <NavLink to="/sign" className={({ isActive }) => (isActive ? 'active' : '')}>
                <PenTool size={20} />
                <span>E-Signature</span>
              </NavLink>
            </li>
          </ul>
        </div>

      </nav>

      {/* Footer / Logout */}
      <div className="sidebar-footer">
        <button onClick={onLogout} className="sidebar-logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;