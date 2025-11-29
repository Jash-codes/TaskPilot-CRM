// src/pages/Dashboard/HomePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$0</p>
          <span className="stat-trend trend-up">▲ 0%</span>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p className="stat-value">0</p>
          <span className="stat-trend">In Progress</span>
        </div>
        <div className="stat-card">
          <h3>Pending Invoices</h3>
          <p className="stat-value">0</p>
          <span className="stat-trend trend-down">Needs Attention</span>
        </div>
        <div className="stat-card">
          <h3>Total Clients</h3>
          <p className="stat-value">0</p>
          <span className="stat-trend">Active</span>
        </div>
      </div>

      {/* Empty State / Placeholder for Charts */}
      <div className="dashboard-section">
        <h2>Project Overview</h2>
        <div className="empty-state-card">
          <p>No projects found. Create your first project to see data here.</p>
          <button className="btn-primary-small">Create Project</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;