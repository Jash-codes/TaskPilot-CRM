import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../features/projects/projectSlice';
import { createInvoice } from '../features/invoices/invoiceSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const InvoiceForm = () => {
  const dispatch = useDispatch();
  
  // State for the main form fields
  const [projectId, setProjectId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // State for line items
  const [items, setItems] = useState([
    { description: '', quantity: 1, unitPrice: 0 },
  ]);
  
  // Get projects from Redux
  const { projects, isLoading: projectsLoading } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // Handler for line item changes
  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  // Add a new blank line item
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  // Remove a line item
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      item.total = quantity * unitPrice; // Set total for the item
      return acc + item.total;
    }, 0);
  };

  const totalAmount = calculateTotal();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!projectId || !invoiceNumber || !dueDate || items.length === 0) {
      toast.error('Please fill in all required fields and add at least one item');
      return;
    }
    
    // Find the selected project to get the clientId
    const selectedProject = projects.find(p => p._id === projectId);
    if (!selectedProject) {
      toast.error('Invalid project selected');
      return;
    }

    const invoiceData = {
      clientId: selectedProject.client._id, // Get client from project
      projectId,
      invoiceNumber,
      dueDate,
      items,
      totalAmount,
    };

    dispatch(createInvoice(invoiceData));
    toast.success('Invoice created!');

    // Clear form
    setProjectId('');
    setInvoiceNumber('');
    setDueDate('');
    setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
  };

  if (projectsLoading) {
    return <Spinner />;
  }

  return (
    <div className="form-container invoice-form">
      <h3>Create New Invoice</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="projectId">Project*</label>
          <select
            id="projectId"
            name="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          >
            <option value="" disabled>Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title} ({project.client.name})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="invoiceNumber">Invoice #*</label>
            <input
              type="text"
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date*</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Line Items */}
        <h4>Invoice Items</h4>
        <div className="invoice-items-list">
          {items.map((item, index) => (
            <div className="invoice-item-row" key={index}>
              <input
                type="text"
                name="description"
                placeholder="Item description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <input
                type="number"
                name="unitPrice"
                placeholder="Price"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
              <button
                type="button"
                className="btn-delete"
                onClick={() => removeItem(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-secondary" onClick={addItem}>
          Add Item
        </button>

        <div className="invoice-total">
          <strong>Total Amount: ${totalAmount.toLocaleString()}</strong>
        </div>

        <button type="submit" className="btn">
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;