// src/pages/Auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import './Auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // --- THE FIX IS HERE ---
    // Previously it might have been navigate('/')
    // We must force it to go to the protected dashboard
    if (isSuccess || user) {
      navigate('/dashboard'); 
    }

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
    dispatch(login({ email, password }));
  };

  return (
    <div className="auth-page-wrapper">
      
      {/* LEFT SIDE: Branding */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <h1 className="brand-logo">Taskpilot.</h1>
          <div className="brand-quote">
            <h2>"Productivity is being able to do things that you were never able to do before."</h2>
            <p>Welcome back! Let's get to work.</p>
          </div>
          <div className="brand-footer">
            <p>© 2025 Taskpilot Inc.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="auth-form-section">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in</p>
          </div>

          <form onSubmit={onSubmit}>
            
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

            <div className="form-actions-row">
              <label className="checkbox-container">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="#" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-auth-primary">
              {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
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
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;