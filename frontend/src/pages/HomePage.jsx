import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart, // We'll add a PieChart
  Pie,
  Cell,
} from 'recharts';
import Spinner from '../components/Spinner';
import { getProjects } from '../features/projects/projectSlice';
import { getClients } from '../features/clients/clientSlice';

// Define colors for our pie chart
const COLORS = {
  Pending: '#f59e0b', // Amber
  'In Progress': '#3b82f6', // Blue
  Completed: '#10b981', // Emerald
};

const HomePage = () => {
  const dispatch = useDispatch();

  // Get all the data from our Redux store
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading } = useSelector(
    (state) => state.projects
  );
  const { clients, isLoading: clientsLoading } = useSelector(
    (state) => state.clients
  );

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  // --- Calculate Real Stats ---

  // 1. Calculate stats for the cards
  const totalClients = clients.length;
  const activeProjects = projects.filter(
    (p) => p.status === 'In Progress'
  ).length;
  
  // We'll use project count as a stat for now
  const completedProjects = projects.filter(
    (p) => p.status === 'Completed'
  ).length;

  // We can calculate total "budgeted" revenue
  const totalBudgeted = projects.reduce(
    (acc, project) => acc + project.budget,
    0
  );

  // 2. Format data for the chart (Projects by Status)
  const chartData = [
    { name: 'Pending', value: projects.filter((p) => p.status === 'Pending').length },
    { name: 'In Progress', value: activeProjects },
    { name: 'Completed', value: completedProjects },
  ].filter((item) => item.value > 0); // Only show statuses with projects

  // Show a spinner if either clients or projects are loading
  if (projectsLoading || clientsLoading || !user) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's a snapshot of your freelance business.</p>
      </div>

      {/* Stat Cards Section (now with real data) */}
      <div className="stat-cards">
        <div className="stat-card">
          <h3>Total Clients</h3>
          <p>{totalClients}</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>{activeProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Projects</h3>
          <p>{completedProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Total Budgeted</h3>
          <p>${totalBudgeted.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Section (now with real data) */}
      <div className="chart-container">
        <h3>Projects by Status</h3>
        {projects.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No projects yet. Add a project to see your stats!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;