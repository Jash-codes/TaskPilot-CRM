import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import Spinner from '../components/Spinner';

// Placeholder data for our chart. Later, we'll get this from our API.
const projectData = [
  { name: 'Jan', projects: 3 },
  { name: 'Feb', projects: 5 },
  { name: 'Mar', projects: 2 },
  { name: 'Apr', projects: 8 },
  { name: 'May', projects: 4 },
  { name: 'Jun', projects: 6 },
];

// Placeholder data for stats.
const stats = {
  totalClients: 12,
  activeProjects: 5,
  pendingInvoices: 3,
  totalRevenue: 4500,
};

const HomePage = () => {
  // Get the logged-in user's name from Redux
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Spinner />; // Should be redirected by PrivateRoute, but a good fallback
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's a snapshot of your freelance business.</p>
      </div>

      {/* Stat Cards Section */}
      <div className="stat-cards">
        <div className="stat-card">
          <h3>Total Clients</h3>
          <p>{stats.totalClients}</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>{stats.activeProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Invoices</h3>
          <p>{stats.pendingInvoices}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue (This Month)</h3>
          <p>${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h3>Projects Overview (Last 6 Months)</h3>
        {/* ResponsiveContainer makes the chart adapt to screen size */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border)',
              }}
            />
            <Legend />
            <Bar dataKey="projects" fill="var(--color-primary)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HomePage;