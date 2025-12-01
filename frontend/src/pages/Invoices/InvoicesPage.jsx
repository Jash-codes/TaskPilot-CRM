import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoices, createInvoice, updateInvoice, reset } from '../../features/invoices/invoiceSlice';
import { getProjects } from '../../features/projects/projectSlice'; // Need projects dropdown
import { toast } from 'react-toastify';
import { Plus, X, Trash2, DollarSign } from 'lucide-react';
import Spinner from '../../components/Spinner';
import './Invoices.css';

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const { invoices, isLoading, isError, message } = useSelector((state) => state.invoices);
  const { projects } = useSelector((state) => state.projects);

  const [showForm, setShowForm] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(getInvoices());
    dispatch(getProjects()); // Load projects for dropdown
    return () => { dispatch(reset()); };
  }, [dispatch, isError, message]);

  // Calculate Form Total
  const calculateTotal = () => items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!projectId || !invoiceNumber) {
      toast.error('Project and Invoice # required');
      return;
    }
    
    const selectedProject = projects.find(p => p._id === projectId);
    
    dispatch(createInvoice({
      projectId,
      clientId: selectedProject.client?._id, // Auto-link client
      invoiceNumber,
      dueDate,
      items,
      totalAmount: calculateTotal(),
    }));
    
    toast.success('Invoice created!');
    setShowForm(false);
    setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
    setProjectId('');
    setInvoiceNumber('');
  };

  const handleMarkPaid = (id) => {
    dispatch(updateInvoice({ id, status: 'Paid' }));
    toast.success('Marked as Paid');
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="invoices-container">
      <div className="invoices-header">
        <h1>Invoices</h1>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'New Invoice'}
        </button>
      </div>

      {showForm && (
        <div className="invoice-form-container">
          <form onSubmit={onSubmit}>
            <div className="form-row-group">
              <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                <option value="">Select Project *</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
              <input type="text" placeholder="Invoice # (e.g. INV-001)" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

            <div className="invoice-items-section">
              <h4>Items</h4>
              {items.map((item, index) => (
                <div key={index} className="item-row">
                  <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} style={{flex: 2}} />
                  <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} style={{flex: 1}} />
                  <input type="number" placeholder="Price" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} style={{flex: 1}} />
                  <button type="button" onClick={() => removeItem(index)} style={{background: 'transparent', border:'none', color:'red', cursor:'pointer'}}><Trash2 size={18} /></button>
                </div>
              ))}
              <button type="button" className="btn btn-small btn-secondary" onClick={addItem}>+ Add Item</button>
            </div>

            <div className="invoice-total">Total: ${calculateTotal().toLocaleString()}</div>
            <button type="submit" className="btn" style={{width:'100%'}}>Generate Invoice</button>
          </form>
        </div>
      )}

      <div className="invoices-list">
        {invoices.length > 0 ? (
          invoices.map((inv) => (
            <div key={inv._id} className={`invoice-card ${inv.status.toLowerCase()}`}>
              <div className="invoice-info">
                <h3>{inv.invoiceNumber}</h3>
                <p>Project: {inv.project?.title || 'Unknown'}</p>
                <p style={{fontSize: '0.8rem', marginTop:'4px'}}>Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
              </div>
              
              <div className="invoice-amount">
                ${inv.totalAmount.toLocaleString()}
              </div>

              <div className={`invoice-status status-${inv.status.toLowerCase()}`}>
                {inv.status}
              </div>

              <div className="invoice-actions">
                {inv.status !== 'Paid' && (
                  <button className="btn-mark-paid" onClick={() => handleMarkPaid(inv._id)}>
                    <DollarSign size={14} style={{display:'inline', marginBottom:'-2px'}}/> Mark Paid
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#8b9bb4', textAlign: 'center', marginTop: '2rem' }}>No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;