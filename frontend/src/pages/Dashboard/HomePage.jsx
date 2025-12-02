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
  
  // Estimated Company Value (Mock logic)
  const companyValue = totalBudget * 1.5;
  const totalProjects = projects.length || 1;
  const completionRate = Math.round((completedProjects / totalProjects) * 100);

  // --- CHART 1 DATA: PIE (Status) ---
  const pieData = [
    { name: 'Pending', value: pendingProjects, color: '#f59e0b' },
    { name: 'In Progress', value: activeProjects, color: '#3b82f6' },
    { name: 'Finished', value: completedProjects, color: '#10b981' },
  ].filter(item => item.value > 0);

  // --- CHART 2 DATA: LINE (Recent Projects Budget) ---
  const lineData = projects.slice(0, 5).map((p) => ({
    name: p.title.substring(0, 8) + '...',
    Budget: p.budget,
  }));

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p style={{ color: '#8b9bb4' }}>Here's your business overview.</p>
      </div>

      {/* --- TOP STATS ROW --- */}
      <div className="stats-grid-top">
        {/* Card 1 */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Total Clients</span>
            <span className="trend-badge trend-up">▲ 12%</span>
          </div>
          <div className="admin-card-value">{totalClients}</div>
          <div className="stat-circle circle-blue">{totalClients}</div>
        </div>

        {/* Card 2 */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Total Budget</span>
            <span className="trend-badge trend-down">▼ 5%</span>
          </div>
          <div className="admin-card-value">${totalBudget.toLocaleString()}</div>
          <div className="stat-circle circle-red">
            {Math.floor(Math.random() * 50) + 10}
          </div>
        </div>

        {/* Card 3 */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Est. Value</span>
            <span className="trend-badge trend-up">▲ $1.2k</span>
          </div>
          <div className="admin-card-value">${companyValue.toLocaleString()}</div>
          <div className="stat-circle circle-orange">72</div>
        </div>

        {/* Card 4 */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Completed Work</span>
            <span className="trend-badge trend-up">▲ {completedProjects}</span>
          </div>
          <div className="admin-card-value">{completedProjects} Jobs</div>
          <div className="stat-circle circle-green">{completionRate}%</div>
        </div>
      </div>

      {/* --- MIDDLE ROW: PIE & LINE CHARTS --- */}
      <div className="charts-grid">
        
        {/* Project Status Pie */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Project Status</h3>
          </div>
          <div className="chart-wrapper">
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
                  contentStyle={{ backgroundColor: '#0b253a', border: '1px solid #1e3a52', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Budget Trend */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Recent Projects Value</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a52" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#8b9bb4'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#8b9bb4'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b253a', border: '1px solid #1e3a52', borderRadius: '8px', color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Budget" 
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

      {/* REVENUE CHART REMOVED */}

    </div>
  );
};

export default HomePage;