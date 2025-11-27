// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Import Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar'; // <-- Import Sidebar

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientsPage from './pages/ClientsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import InvoicesPage from './pages/InvoicesPage';
import SignaturePage from './pages/SignaturePage';

function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Define routes where we DON'T want the sidebar (like Login/Register)
  const hideSidebarRoutes = ['/login', '/register'];
  const showSidebar = user && !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className={showSidebar ? "app-container" : ""}>
      <ToastContainer autoClose={3000} />
      
      {/* Show Sidebar only if logged in and not on auth pages */}
      {showSidebar && <Sidebar />}

      <div className="main-content">
        {/* Header acts as the Top Bar now */}
        <Header /> 
        
        <main className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/sign" element={<SignaturePage />} />

            {/* Private Routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;