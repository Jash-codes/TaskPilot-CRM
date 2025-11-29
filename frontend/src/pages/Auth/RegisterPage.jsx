import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import { User, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react'; // Icons
import './Auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="auth-page-wrapper">
      
      {/* LEFT SIDE: Branding / Visuals */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <h1 className="brand-logo">Taskpilot.</h1>
          <div className="brand-quote">
            <h2>"The ultimate tool for freelancers to scale their business."</h2>
            <p>Manage projects, track finances, and sign contracts in one place.</p>
          </div>
          <div className="brand-footer">
            <p>© 2025 Taskpilot Inc.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="auth-form-section">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Create an account</h2>
            <p>Enter your details below to get started</p>
          </div>

          <form onSubmit={onSubmit}>
            
            {/* Input with Icon */}
            <div className="input-group-icon">
              <User className="input-icon" size={18} />
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="input-group-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="input-group-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="input-group-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            <button type="submit" className="btn-auth-primary">
              {isLoading ? 'Creating...' : 'Sign Up'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-buttons">
            <button className="btn-social"><Chrome size={18} /> Google</button>
            <button className="btn-social"><Github size={18} /> GitHub</button>
          </div>

          <p className="auth-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;