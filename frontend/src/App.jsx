import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import LandingPage from './pages/Landing/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage'; 
import LoginPage from './pages/Auth/LoginPage'; 

function App() {
  return (
    <>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </>
  );
}

export default App;