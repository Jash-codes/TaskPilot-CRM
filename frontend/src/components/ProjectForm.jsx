import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../features/projects/projectSlice';
import { getClients } from '../features/clients/clientSlice'; // We need to fetch clients for the dropdown
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    scope: '',
    clientId: '', // To store the selected client's ID
    budget: '',
    deadline: '',
    status: 'Pending', // Default status
  });

  const { title, scope, clientId, budget, deadline, status } = formData;

  const dispatch = useDispatch();

  // Get clients from Redux state to populate the dropdown
  const { clients, isLoading: clientsLoading } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    // Fetch clients when the component loads
    dispatch(getClients());
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !scope || !clientId) {
      toast.error('Title, Scope, and Client are required');
      return;
    }

    dispatch(createProject({ ...formData, budget: Number(budget) }));
    toast.success('New project added!');

    // Clear the form
    setFormData({
      title: '',
      scope: '',
      clientId: '',
      budget: '',
      deadline: '',
      status: 'Pending',
    });
  };

  if (clientsLoading) {
    return <Spinner />;
  }

  return (
    <div className="form-container project-form">
      <h3>Add New Project</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="clientId">Client*</label>
          <select
            id="clientId"
            name="clientId"
            value={clientId}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              Select a client
            </option>
            {clients.length > 0 ? (
              clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))
            ) : (
              <option disabled>No clients found</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="scope">Scope / Description*</label>
          <textarea
            id="scope"
            name="scope"
            value={scope}
            onChange={onChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget ($)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={budget}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={status} onChange={onChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;