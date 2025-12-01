import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProjectStatus, reset } from '../../features/projects/projectSlice'; // Import updateStatus
import { getClients } from '../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import { Plus, X, User, ChevronLeft, ChevronRight } from 'lucide-react'; // Import Arrows
import Spinner from '../../components/Spinner';
import './Projects.css';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, isLoading, isError, message } = useSelector((state) => state.projects);
  const { clients } = useSelector((state) => state.clients);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', scope: '', budget: '', deadline: '', clientId: '', status: 'Pending'
  });

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(getProjects());
    dispatch(getClients());
    return () => { dispatch(reset()); };
  }, [dispatch, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.clientId) {
      toast.error('Title and Client are required');
      return;
    }
    dispatch(createProject(formData));
    toast.success('Project created!');
    setFormData({ title: '', scope: '', budget: '', deadline: '', clientId: '', status: 'Pending' });
    setShowForm(false);
  };

  // Helper to move project
  const moveProject = (e, project, direction) => {
    e.stopPropagation(); // Prevent clicking the card (which opens details)
    let newStatus = project.status;

    if (project.status === 'Pending' && direction === 'next') newStatus = 'In Progress';
    if (project.status === 'In Progress' && direction === 'prev') newStatus = 'Pending';
    if (project.status === 'In Progress' && direction === 'next') newStatus = 'Completed';
    if (project.status === 'Completed' && direction === 'prev') newStatus = 'In Progress';

    if (newStatus !== project.status) {
      dispatch(updateProjectStatus({ projectId: project._id, status: newStatus }));
    }
  };

  const pendingProjects = projects.filter(p => p.status === 'Pending');
  const progressProjects = projects.filter(p => p.status === 'In Progress');
  const completedProjects = projects.filter(p => p.status === 'Completed');

  if (isLoading) return <Spinner />;

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects Board</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <div className="project-form-container">
          <form onSubmit={onSubmit}>
            <div className="form-row-group">
              <input type="text" placeholder="Project Title *" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              <select value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})}>
                <option value="">Select Client *</option>
                {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-row-group">
              <input type="number" placeholder="Budget ($)" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
            </div>
            <textarea placeholder="Project Scope / Details" value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} rows="3"></textarea>
            <button type="submit" className="btn" style={{marginTop: '1rem'}}>Create Project</button>
          </form>
        </div>
      )}

      <div className="kanban-board">
        {/* COL 1: PENDING */}
        <div className="kanban-column col-pending">
          <div className="column-header"><span>To Do</span><span className="column-count">{pendingProjects.length}</span></div>
          <div className="column-content">
            {pendingProjects.map(project => (
              <ProjectCard key={project._id} project={project} navigate={navigate} onMove={moveProject} />
            ))}
          </div>
        </div>

        {/* COL 2: IN PROGRESS */}
        <div className="kanban-column col-progress">
          <div className="column-header"><span>In Progress</span><span className="column-count">{progressProjects.length}</span></div>
          <div className="column-content">
            {progressProjects.map(project => (
              <ProjectCard key={project._id} project={project} navigate={navigate} onMove={moveProject} />
            ))}
          </div>
        </div>

        {/* COL 3: COMPLETED */}
        <div className="kanban-column col-completed">
          <div className="column-header"><span>Completed</span><span className="column-count">{completedProjects.length}</span></div>
          <div className="column-content">
            {completedProjects.map(project => (
              <ProjectCard key={project._id} project={project} navigate={navigate} onMove={moveProject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED CARD COMPONENT ---
const ProjectCard = ({ project, navigate, onMove }) => {
  return (
    <div className="kanban-card" onClick={() => navigate(`/project/${project._id}`)}>
      <div className="card-top">
        <div className="card-title">{project.title}</div>
        {/* Move Buttons */}
        <div className="card-actions">
          {project.status !== 'Pending' && (
            <button className="btn-move" onClick={(e) => onMove(e, project, 'prev')} title="Move Back">
              <ChevronLeft size={16} />
            </button>
          )}
          {project.status !== 'Completed' && (
            <button className="btn-move" onClick={(e) => onMove(e, project, 'next')} title="Move Forward">
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="card-client">
        <User size={14} /> {project.client?.name || 'Unknown'}
      </div>
      <div className="card-footer">
        <span className="card-budget">${Number(project.budget).toLocaleString()}</span>
        <span className="card-date">{new Date(project.deadline).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ProjectsPage;