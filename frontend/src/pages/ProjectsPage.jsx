import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import ProjectForm from '../components/ProjectForm';
import ProjectItem from '../components/ProjectItem';
import { toast } from 'react-toastify';

const ProjectsPage = () => {
  const dispatch = useDispatch();

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProjects());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page-layout">
      {/* Column 1: The Form */}
      <section className="form-column">
        <ProjectForm />
      </section>

      {/* Column 2: The List */}
      <section className="list-column">
        <h2>My Projects</h2>
        {projects.length > 0 ? (
          <div className="item-list">
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p>You haven't added any projects yet. Add one to get started!</p>
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;