import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link

const ProjectItem = ({ project }) => {
  // Function to format the date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    // 2. Wrap the entire card in a Link
    <Link to={`/project/${project._id}`} className="item-card project-card">
      <div className="item-card-header">
        <h3>{project.title}</h3>
        <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
          {project.status}
        </span>
      </div>
      <div className="item-card-body">
        <p><strong>Client:</strong> {project.client?.name || 'N/A'}</p>
        <p><strong>Budget:</strong> ${Number(project.budget).toLocaleString()}</p>
        <p><strong>Deadline:</strong> {formatDate(project.deadline)}</p>
        <p><strong>Scope:</strong> {project.scope.substring(0, 100)}...</p>
      </div>
    </Link>
  );
};

export default ProjectItem;