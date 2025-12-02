import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Dashboard/HomePage';
import ClientsPage from './pages/Clients/ClientsPage';
import ProjectsPage from './pages/Projects/ProjectsPage'; 
import ProjectPage from './pages/Projects/ProjectPage'; 
import InvoicesPage from './pages/Invoices/InvoicesPage';
import CalendarPage from './pages/Calendar/CalendarPage'; 
import ProfilePage from './pages/Profile/ProfilePage';
import InboxPage from './pages/Inbox/InboxPage';

function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Define public routes where Sidebar/Header should NOT appear
  const publicRoutes = ['/', '/login', '/register'];
  
  // Show Sidebar/Header ONLY if user is logged in AND not on a public page
  const showDashboardLayout = user && !publicRoutes.includes(location.pathname);

  return (
    <div className={showDashboardLayout ? "app-container" : ""}>
      <ToastContainer autoClose={3000} />
      
      {showDashboardLayout && <Sidebar />}

      <div className={showDashboardLayout ? "main-content" : ""}>
        
        {/* Only show the App Header if we are in Dashboard Layout */}
        {showDashboardLayout && <Header />}
        
        <main className={showDashboardLayout ? "container" : ""}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<HomePage />} />
             <Route path="/clients" element={<ClientsPage />} /> 
             <Route path="/projects" element={<ProjectsPage />} /> 
             <Route path="/project/:id" element={<ProjectPage />} /> 
             <Route path="/invoices" element={<InvoicesPage />} />
             <Route path="/calendar" element={<CalendarPage />} />
             <Route path="/profile" element={<ProfilePage />} />
             <Route path="/messages" element={<InboxPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;