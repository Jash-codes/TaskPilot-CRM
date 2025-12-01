// src/pages/Invoices/InvoicesPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoices, createInvoice, updateInvoice, reset } from '../../features/invoices/invoiceSlice';
import { getProjects } from '../../features/projects/projectSlice';
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
    dispatch(getProjects());
    return () => { dispatch(reset()); };
  }, [dispatch, isError, message]);

  // Calculate Grand Total
  const calculateTotal = () => items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!projectId || !invoiceNumber || !dueDate) {
      toast.error('Please fill in all fields (Project, Invoice #, Date)');
      return;
    }

    const selectedProject = projects.find(p => p._id === projectId);
    if (!selectedProject) {
      toast.error('Invalid Project selected');
      return;
    }

    // Check if Client exists on Project
    if (!selectedProject.client) {
      toast.error('The selected project does not have a client assigned.');
      return;
    }
    
    // 2. Prepare Data (FIX IS HERE)
    const invoiceData = {
      projectId,
      clientId: selectedProject.client._id,
      invoiceNumber,
      dueDate,
      // We must calculate 'total' for EACH item, or the backend rejects it
      items: items.map(item => ({
        description: item.description,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        total: Number(item.quantity) * Number(item.unitPrice) // <--- THIS WAS MISSING
      })),
      totalAmount: calculateTotal(),
    };

    // 3. Dispatch
    try {
      await dispatch(createInvoice(invoiceData)).unwrap();
      toast.success('Invoice created successfully!');
      
      dispatch(getInvoices()); // Refresh list

      // Reset
      setShowForm(false);
      setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
      setProjectId('');
      setInvoiceNumber('');
      setDueDate('');
    } catch (error) {
      console.error("Invoice Error:", error);
      // Check if it's a specific backend error message
      const errMsg = error.message || error || "Failed to create invoice";
      toast.error(typeof errMsg === 'string' ? errMsg : 'Validation Error');
    }
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
              <div className="form-group">
                <label>Project</label>
                <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                  <option value="">Select Project *</option>
                  {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Invoice Number</label>
                <input type="text" placeholder="e.g. INV-001" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="invoice-items-section">
              <h4>Items</h4>
              
              <div className="invoice-item-header">
                <span style={{ flex: '3' }}>Description</span>
                <span style={{ flex: '1' }}>Qty</span>
                <span style={{ flex: '1' }}>Price ($)</span>
                <span style={{ width: '60px', textAlign: 'right' }}>Total</span>
                <span style={{ width: '30px' }}></span>
              </div>

              {items.map((item, index) => (
                <div key={index} className="invoice-item-row">
                  <input 
                    name="description" 
                    type="text" 
                    placeholder="Item name..." 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)} 
                  />
                  <input 
                    name="quantity" 
                    type="number" 
                    placeholder="0" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} 
                  />
                  <input 
                    name="unitPrice" 
                    type="number" 
                    placeholder="0.00" 
                    value={item.unitPrice} 
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} 
                  />
                  <div className="item-line-total">
                    ${(item.quantity * item.unitPrice).toLocaleString()}
                  </div>
                  <button type="button" onClick={() => removeItem(index)} className="btn-icon-delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              <button type="button" className="btn btn-small btn-secondary" onClick={addItem} style={{marginTop: '1rem'}}>
                + Add Item
              </button>
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