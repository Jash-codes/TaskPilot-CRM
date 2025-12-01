import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, createClient, reset } from '../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import { Plus, X, MoreHorizontal, ArrowRight } from 'lucide-react';
import Spinner from '../../components/Spinner';
import './Clients.css';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients, isLoading, isError, message } = useSelector((state) => state.clients);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', notes: '' });

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

  // Helper to pick a random card color class
  const getCardColor = (index) => {
    const colors = ['green', 'blue', 'orange', 'red'];
    return colors[index % colors.length];
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="clients-container">
      
      {/* Header */}
      <div className="clients-header">
        <h1>Clients ({clients.length})</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="client-form-container">
          <form onSubmit={onSubmit}>
            <div className="form-row-group">
              <input type="text" placeholder="Client Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-row-group">
              <input type="text" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
            </div>
            <button type="submit" className="btn" style={{marginTop: '1rem'}}>Save Client</button>
          </form>
        </div>
      )}

      {/* THE NEW CARD GRID */}
      <div className="clients-grid">
        {clients.length > 0 ? (
          clients.map((client, index) => {
            const cardColor = getCardColor(index); // green, blue, etc.
            const joinDate = new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            return (
              <div key={client._id} className={`client-card ${cardColor}`}>
                
                {/* Header */}
                <div className="card-header">
                  <div className="date">{joinDate}</div>
                  <MoreHorizontal className="card-icon" />
                </div>

                {/* Body */}
                <div className="card-body">
                  <h3>{client.name}</h3>
                  <p>{client.company || 'Independent'}</p>
                  
                  {/* Progress Bar (Visual Flair - Mock Data) */}
                  <div className="progress-container">
                    <div className="progress-label">
                      <span>Project Status</span>
                      <span>Active</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="card-footer">
                  <ul className="footer-avatars">
                    <li><div className="avatar-circle">{client.name.charAt(0)}</div></li>
                    <div className="btn-add" onClick={() => navigate('/projects')}>
                      <ArrowRight size={14} />
                    </div>
                  </ul>
                  
                  <a href={`mailto:${client.email}`} className="btn-countdown">Contact</a>
                </div>

              </div>
            );
          })
        ) : (
          <p style={{ color: '#8b9bb4' }}>No clients found. Add one to get started.</p>
        )}
      </div>

    </div>
  );
};

export default ClientsPage;