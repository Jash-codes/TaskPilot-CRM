import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  // If user exists, show the inner content (Outlet). If not, redirect to login.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;