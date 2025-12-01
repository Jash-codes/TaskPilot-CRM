import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProject, addTask, toggleTask, deleteTask, reset } from '../../features/projects/projectSlice';
import Spinner from '../../components/Spinner';
import { ArrowLeft, CheckCircle, Circle, Trash2, Plus, Calendar, DollarSign } from 'lucide-react';
import './ProjectDetails.css'; // We will create this CSS next

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProject, isLoading } = useSelector((state) => state.projects);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    dispatch(getProject(id));
    // Don't reset on unmount immediately so we don't flash empty state if navigating back
  }, [dispatch, id]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    dispatch(addTask({ projectId: id, taskData: { name: newTask } }));
    setNewTask('');
  };

  if (isLoading || !currentProject) return <Spinner />;

  return (
    <div className="project-detail-container">
      
      {/* Header */}
      <div className="project-detail-header">
        <button className="btn-back" onClick={() => navigate('/projects')}>
          <ArrowLeft size={18} /> Back to Board
        </button>
        <div className="header-content">
          <div>
            <h1 className="project-title">{currentProject.title}</h1>
            <span className="project-client">Client: {currentProject.client?.name}</span>
          </div>
          <div className="project-badges">
            <span className={`status-badge status-${currentProject.status.toLowerCase().replace(' ', '-')}`}>
              {currentProject.status}
            </span>
          </div>
        </div>
      </div>

      <div className="project-grid">
        
        {/* Left Col: Scope & Info */}
        <div className="project-info-card">
          <h3>Project Scope</h3>
          <p className="scope-text">{currentProject.scope}</p>
          
          <div className="info-row">
            <div className="info-item">
              <DollarSign size={16} className="icon-accent" />
              <span>Budget: <strong>${currentProject.budget}</strong></span>
            </div>
            <div className="info-item">
              <Calendar size={16} className="icon-accent" />
              <span>Deadline: <strong>{new Date(currentProject.deadline).toLocaleDateString()}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Col: Tasks */}
        <div className="project-tasks-card">
          <h3>Tasks & Milestones</h3>
          
          <div className="task-list">
            {currentProject.tasks.length > 0 ? (
              currentProject.tasks.map((task) => (
                <div key={task._id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                  <div 
                    className="task-check" 
                    onClick={() => dispatch(toggleTask({ projectId: id, taskId: task._id, isCompleted: !task.isCompleted }))}
                  >
                    {task.isCompleted ? <CheckCircle size={20} color="#10b981" /> : <Circle size={20} color="#64748b" />}
                    <span className="task-name">{task.name}</span>
                  </div>
                  <button 
                    className="btn-icon-delete"
                    onClick={() => dispatch(deleteTask({ projectId: id, taskId: task._id }))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-tasks">No tasks yet. Add one below!</p>
            )}
          </div>

          <form onSubmit={handleAddTask} className="add-task-form-inline">
            <input 
              type="text" 
              placeholder="Add a new task..." 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn-icon-add">
              <Plus size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProjectPage;