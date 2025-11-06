import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectById, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import TaskList from '../components/TaskList';
import { toast } from 'react-toastify';

const ProjectPage = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const dispatch = useDispatch();

  const { currentProject, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProjectById(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isError, message]);

  if (isLoading || !currentProject) {
    return <Spinner />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="project-page">
      <header className="project-page-header">
        <div className="project-page-title">
          <small>Client: {currentProject.client?.name}</small>
          <h2>{currentProject.title}</h2>
        </div>
        <div className="project-page-meta">
          <span className={`status-badge status-${currentProject.status.toLowerCase().replace(' ', '-')}`}>
            {currentProject.status}
          </span>
          <span><strong>Budget:</strong> ${Number(currentProject.budget).toLocaleString()}</span>
          <span><strong>Deadline:</strong> {formatDate(currentProject.deadline)}</span>
        </div>
      </header>
      
      <div className="project-page-body">
        <div className="project-details-card">
          <h3>Project Scope</h3>
          <p>{currentProject.scope}</p>
        </div>
        <div className="project-tasks-card">
          <TaskList tasks={currentProject.tasks} projectId={currentProject._id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;