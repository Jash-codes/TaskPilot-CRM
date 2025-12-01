import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, createClient, reset } from '../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import { Plus, X, Building2, Mail, ArrowRight } from 'lucide-react';
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

  const getCardColor = (index) => {
    const colors = ['green', 'blue', 'orange', 'red'];
    return colors[index % colors.length];
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="clients-container">
      <div className="clients-header">
        <h1>Clients ({clients.length})</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>

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

      <div className="clients-grid">
        {clients.length > 0 ? (
          clients.map((client, index) => {
            const cardColor = getCardColor(index);
            
            return (
              <div key={client._id} className={`client-card ${cardColor}`}>
                
                {/* RENAMED CLASS: client-card-body */}
                <div className="client-card-body">
                  <h3 className="client-name">{client.name}</h3>
                  
                  <div className="client-meta">
                    <div className="meta-row">
                      <Building2 size={16} />
                      <span>{client.company || 'Independent'}</span>
                    </div>
                    <div className="meta-row">
                      <Mail size={16} />
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>

                {/* RENAMED CLASS: client-card-footer */}
                <div className="client-card-footer">
                  <button 
                    className="btn-view-project"
                    onClick={() => navigate('/projects')} 
                  >
                    View Projects <ArrowRight size={16} />
                  </button>
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