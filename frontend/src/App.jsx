import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages (Modular)
import LandingPage from './pages/Landing/LandingPage';

function App() {
  return (
    <>
      <ToastContainer />
      
      <Routes>
        {/* Route for the Landing Page (Root URL) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* We will add /login and /register routes next */}
      </Routes>
    </>
  );
}

export default App;