import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, createClient, reset } from '../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Briefcase, Plus, X } from 'lucide-react';
import Spinner from '../../components/Spinner';
import './Clients.css';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { clients, isLoading, isError, message } = useSelector((state) => state.clients);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', notes: ''
  });

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(getClients());
    return () => { dispatch(reset()); };
  }, [dispatch, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required');
      return;
    }
    dispatch(createClient(formData));
    toast.success('Client added successfully');
    setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
    setShowForm(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="clients-container">
      
      {/* HEADER */}
      <div className="clients-header">
        <h1>Clients ({clients.length})</h1>
        <button 
          className="btn btn-small" 
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>

      {/* ADD CLIENT FORM (Conditional Render) */}
      {showForm && (
        <div className="client-form-container">
          <form onSubmit={onSubmit}>
            <div className="form-row-group">
              <input 
                type="text" placeholder="Client Name *" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              <input 
                type="email" placeholder="Email Address *" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="form-row-group">
              <input 
                type="text" placeholder="Phone Number" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
              <input 
                type="text" placeholder="Company Name" 
                value={formData.company} 
                onChange={(e) => setFormData({...formData, company: e.target.value})} 
              />
            </div>
            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
              Save Client
            </button>
          </form>
        </div>
      )}

      {/* CLIENT GRID */}
      <div className="clients-grid">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client._id} className="client-card">
              <div className="client-header">
                <div className="client-avatar">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div className="client-info">
                  <h3>{client.name}</h3>
                  <span>{client.company || 'Freelance'}</span>
                </div>
              </div>
              <div 
                  className="detail-row view-projects-link" 
                  onClick={() => navigate('/projects')} 
                >
                <div className="detail-row">
                  <Mail size={14} /> {client.email}
                </div>
                {client.phone && (
                  <div className="detail-row">
                    <Phone size={14} /> {client.phone}
                  </div>
                )}
                {/* Placeholder for project count later */}
                <div className="detail-row" style={{ marginTop: '0.5rem', color: '#5C7C89' }}>
                  <Briefcase size={14} /> View Projects &rarr;
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#8b9bb4' }}>No clients found. Add one to get started.</p>
        )}
      </div>

    </div>
  );
};

export default ClientsPage;