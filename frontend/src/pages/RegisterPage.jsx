import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    twitter: '',
    facebook: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Navigation functions
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      // NOTE: We only send the necessary fields to the backend for now
      // You can update your User Model later to include phone/socials if you want
      const response = await axios.post('http://localhost:5001/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        toast.success('Account created! Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="msform-container">
      {/* Progress Bar */}
      <ul id="progressbar">
        <li className={step >= 1 ? 'active' : ''}>Personal Details</li>
        <li className={step >= 2 ? 'active' : ''}>Social Profiles</li>
        <li className={step >= 3 ? 'active' : ''}>Account Setup</li>
      </ul>

      {/* STEP 1: Personal Details */}
      {step === 1 && (
        <fieldset className="auth-card">
          <h2 className="fs-title">Personal Details</h2>
          <h3 className="fs-subtitle">Tell us something more about you</h3>
          
          <input 
            type="text" name="name" placeholder="Full Name" 
            value={formData.name} onChange={handleChange} 
          />
          <input 
            type="text" name="phone" placeholder="Phone" 
            value={formData.phone} onChange={handleChange} 
          />
          
          <button type="button" className="next action-button" onClick={nextStep}>
            Next
          </button>
          
          <p className="link-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </fieldset>
      )}

      {/* STEP 2: Social Profiles */}
      {step === 2 && (
        <fieldset className="auth-card">
          <h2 className="fs-title">Social Profiles</h2>
          <h3 className="fs-subtitle">Your presence on the social network</h3>
          
          <input 
            type="text" name="twitter" placeholder="Twitter" 
            value={formData.twitter} onChange={handleChange} 
          />
          <input 
            type="text" name="facebook" placeholder="Facebook" 
            value={formData.facebook} onChange={handleChange} 
          />
          
          <button type="button" className="previous action-button-previous" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="next action-button" onClick={nextStep}>
            Next
          </button>
        </fieldset>
      )}

      {/* STEP 3: Account Setup */}
      {step === 3 && (
        <fieldset className="auth-card">
          <h2 className="fs-title">Create your account</h2>
          <h3 className="fs-subtitle">Fill in your credentials</h3>
          
          <input 
            type="email" name="email" placeholder="Email" 
            value={formData.email} onChange={handleChange} 
          />
          <input 
            type="password" name="password" placeholder="Password" 
            value={formData.password} onChange={handleChange} 
          />
          <input 
            type="password" name="confirmPassword" placeholder="Confirm Password" 
            value={formData.confirmPassword} onChange={handleChange} 
          />
          
          <button type="button" className="previous action-button-previous" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="submit action-button" onClick={handleSubmit}>
            {loading ? '...' : 'Submit'}
          </button>
        </fieldset>
      )}
    </div>
  );
};

export default RegisterPage;