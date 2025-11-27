import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import Spinner from '../components/Spinner';
import { getProjects } from '../features/projects/projectSlice';
import { getClients } from '../features/clients/clientSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading } = useSelector(
    (state) => state.projects
  );
  const { clients, isLoading: clientsLoading } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  if (projectsLoading || clientsLoading || !user) {
    return <Spinner />;
  }

  // --- 1. CALCULATE REAL METRICS ---
  
  const totalClients = clients.length;
  
  const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
  
  // Calculate "Company Value" (Mock logic: Budget * 1.5)
  const companyValue = totalBudget * 1.5;

  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;

  // Completion Rate for Radial Chart
  const totalProjects = projects.length || 1;
  const completionRate = Math.round((completedProjects / totalProjects) * 100);

  // --- 2. PREPARE CHART DATA ---

  // Mocking "Traffic Sources" style chart using your Project Data
  // We will map "Budget" vs "Estimated Hours" (mock) across your projects
  const mainChartData = projects.map((p, index) => ({
    name: p.title.substring(0, 10), // Shorten name
    Budget: p.budget,
    Efficiency: Math.floor(Math.random() * 100) + 20, // Mock data for line
  })).slice(0, 8); // Take last 8 projects

  const radialData = [
    { name: 'Completed', uv: completionRate, fill: '#10b981' },
  ];

  return (
    <div className="dashboard-container">
      
      {/* --- SECTION 1: TOP STATS ROW --- */}
      <div className="stats-grid-top">
        {/* Card 1: New Accounts (Clients) */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Total Clients</span>
            <span className="trend-badge trend-up">▲ 12%</span>
          </div>
          <div className="admin-card-value">{totalClients}</div>
          <div className="stat-circle circle-blue">
            {totalClients}
          </div>
        </div>

        {/* Card 2: Total Expenses (Budget Used) */}
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

        {/* Card 3: Company Value */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Est. Value</span>
            <span className="trend-badge trend-up">▲ $1.2k</span>
          </div>
          <div className="admin-card-value">${companyValue.toLocaleString()}</div>
          <div className="stat-circle circle-orange">
            72
          </div>
        </div>

        {/* Card 4: New Employees (Completed Projects) */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Completed Work</span>
            <span className="trend-badge trend-up">▲ {completedProjects}</span>
          </div>
          <div className="admin-card-value">{completedProjects} Jobs</div>
          <div className="stat-circle circle-green">
            {completionRate}%
          </div>
        </div>
      </div>

      {/* --- SECTION 2: CHARTS ROW --- */}
      <div className="charts-grid">
        
        {/* Left: Main Composed Chart (Bar + Line) */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Project Financials & Efficiency</h3>
            <button className="btn btn-small btn-secondary">Actions</button>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mainChartData}>
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="name" scale="band" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="Budget" barSize={30} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="Efficiency" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Radial Progress Chart */}
        <div className="admin-card">
          <div className="chart-header">
            <h3>Completion Rate</h3>
            <span className="text-gray-400">⚙️</span>
          </div>
          <div style={{ height: '250px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="60%" 
                outerRadius="90%" 
                barSize={20} 
                data={radialData} 
                startAngle={90} 
                endAngle={-270}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="uv"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            {/* Centered Text */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', textAlign: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{completionRate}%</h2>
              <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Success</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '1rem' }}>
            Based on {totalProjects} total projects currently in the pipeline.
          </p>
        </div>
      </div>

      {/* --- SECTION 3: BOTTOM STATS ROW --- */}
      <div className="stats-grid-bottom">
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div className="bottom-stat-label">Total Invoiced</div>
          <div className="bottom-stat-value">$5,456 <span className="bottom-stat-trend trend-up text-sm font-normal">+14%</span></div>
        </div>
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div className="bottom-stat-label">Pending Expenses</div>
          <div className="bottom-stat-value">$4,764 <span className="bottom-stat-trend trend-down text-sm font-normal">-8%</span></div>
        </div>
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div className="bottom-stat-label">Active Clients</div>
          <div className="bottom-stat-value">{totalClients} <span className="bottom-stat-trend trend-up text-sm font-normal">+2</span></div>
        </div>
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div className="bottom-stat-label">Net Profit</div>
          <div className="bottom-stat-value">$31,564 <span className="bottom-stat-trend trend-up text-sm font-normal">+76%</span></div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;