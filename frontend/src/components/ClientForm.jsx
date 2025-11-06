import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClient } from '../features/clients/clientSlice';
import { toast } from 'react-toastify';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const { name, email, phone, company, notes } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error('Name and Email are required');
      return;
    }

    dispatch(createClient({ name, email, phone, company, notes }));
    toast.success('New client added!');
    
    // Clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      notes: '',
    });
  };

  return (
    <div className="form-container client-form">
      <h3>Add New Client</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={onChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default ClientForm;