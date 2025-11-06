import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const PrivateRoute = () => {
  // We'll check the user state, but also the loading state
  // This prevents flickering when the page first loads
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    // If auth state is still loading, show a spinner
    return <Spinner />;
  }

  // If loading is done, check for user
  // If user exists, show the child route (e.g., HomePage)
  // Otherwise, navigate to the login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;