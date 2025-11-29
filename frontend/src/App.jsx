import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import LandingPage from './pages/Landing/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage'; // <-- IMPORT THIS

function App() {
  return (
    <>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* <-- ADD ROUTE */}
        {/* We will add /login and /dashboard next */}
      </Routes>
    </>
  );
}

export default App;