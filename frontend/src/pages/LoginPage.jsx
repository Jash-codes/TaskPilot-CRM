import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

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
    if (isSuccess || user) {
      navigate('/');
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="msform-container">
      {/* We use the same card class 'auth-card' to match the design */}
      <fieldset className="auth-card">
        <h2 className="fs-title">Welcome Back</h2>
        <h3 className="fs-subtitle">Login to your Taskpilot Dashboard</h3>
        
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          
          <button type="submit" className="action-button">
            Login
          </button>
        </form>

        <p className="link-text">
            Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </fieldset>
    </div>
  );
};

export default LoginPage;