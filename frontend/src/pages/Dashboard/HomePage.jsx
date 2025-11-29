// src/pages/Dashboard/HomePage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import Spinner from '../../components/Spinner';
import LiveChart from '../../components/LiveChart';
import { getProjects } from '../../features/projects/projectSlice';
import { getClients } from '../../features/clients/clientSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading } = useSelector((state) => state.projects);
  const { clients, isLoading: clientsLoading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  if (projectsLoading || clientsLoading || !user) {
    return <Spinner />;
  }

  // --- STATS CALCULATION ---
  const totalClients = clients.length;
  const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;

  // --- CHART DATA 1: PIE (Status) ---
  const pieData = [
    { name: 'Pending', value: pendingProjects, color: '#f59e0b' },   // Orange
    { name: 'In Progress', value: activeProjects, color: '#3b82f6' }, // Blue
    { name: 'Finished', value: completedProjects, color: '#10b981' }, // Green
  ].filter(item => item.value > 0); // Hide empty slices

  // --- CHART DATA 2: LINE (Performance/Budget Trend) ---
  // We'll map the last 5 projects to show a "trend" of budget size
  const lineData = projects.slice(0, 5).map((p, i) => ({
    name: p.title.substring(0, 8) + '...',
    Performance: p.budget, // Using Budget as a performance metric
  }));

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p style={{ color: '#8b9bb4' }}>Here's your business overview.</p>
      </div>

      {/* --- TOP STATS ROW --- */}
      <div className="stats-grid-top">
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Total Clients</span>
          </div>
          <div className="admin-card-value">{totalClients}</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Total Revenue</span>
          </div>
          <div className="admin-card-value">${totalBudget.toLocaleString()}</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Active Jobs</span>
          </div>
          <div className="admin-card-value">{activeProjects}</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Finished Jobs</span>
          </div>
          <div className="admin-card-value">{completedProjects}</div>
        </div>
      </div>

      {/* --- CHARTS ROW (Simple Pie & Line) --- */}
      <div className="charts-grid">
        
        {/* CHART 1: Project Status Pie */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Project Status</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b253a', border: '1px solid #1e3a52', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Performance Line */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Performance Trend (Budget)</h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a52" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#8b9bb4'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#8b9bb4'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b253a', border: '1px solid #1e3a52', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Performance" 
                  stroke="#5C7C89" 
                  strokeWidth={3} 
                  dot={{r: 6, fill: '#5C7C89'}} 
                  activeDot={{r: 8}} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- LIVE TRAFFIC --- */}
      <div style={{ marginBottom: '2rem' }}>
        <LiveChart />
      </div>

    </div>
  );
};

export default HomePage;