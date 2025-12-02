import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { User, Bell, Lock, ShieldAlert } from 'lucide-react';
import './Settings.css';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('account');
  
  // Local state for forms
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Notification State (Mock)
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [projectNotifs, setProjectNotifs] = useState(true);

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
    // Toast is handled in slice, but we can add one here for immediate feedback
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(updateProfile({ password: newPassword }));
    setPassword('');
    setNewPassword('');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`} 
          onClick={() => setActiveTab('account')}
        >
          <User size={18} style={{display:'inline', marginBottom:'-2px', marginRight:'5px'}}/> Account
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} 
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={18} style={{display:'inline', marginBottom:'-2px', marginRight:'5px'}}/> Notifications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
          onClick={() => setActiveTab('security')}
        >
          <Lock size={18} style={{display:'inline', marginBottom:'-2px', marginRight:'5px'}}/> Security
        </button>
      </div>

      {/* --- ACCOUNT TAB --- */}
      {activeTab === 'account' && (
        <div className="settings-section">
          <h3>Profile Details</h3>
          <form onSubmit={handleAccountUpdate}>
            <div className="settings-form-group">
              <label>Display Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="settings-form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn">Update Profile</button>
          </form>
        </div>
      )}

      {/* --- NOTIFICATIONS TAB --- */}
      {activeTab === 'notifications' && (
        <div className="settings-section">
          <h3>Preferences</h3>
          
          <div className="toggle-row">
            <div className="toggle-info">
              <h4>Email Notifications</h4>
              <p>Receive emails about invoice payments and deadlines.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-row">
            <div className="toggle-info">
              <h4>Project Updates</h4>
              <p>Get notified when a task status changes.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={projectNotifs} onChange={() => setProjectNotifs(!projectNotifs)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      )}

      {/* --- SECURITY TAB --- */}
      {activeTab === 'security' && (
        <>
          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="settings-form-group">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <button type="submit" className="btn">Update Password</button>
            </form>
          </div>

          <div className="settings-section danger-zone">
            <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem'}}>
              <ShieldAlert size={24} color="#ef4444" />
              <h3 style={{margin:0}}>Danger Zone</h3>
            </div>
            <p style={{color:'#cbd5e1', marginBottom:'1.5rem'}}>
              Deleting your account is irreversible. All your projects, clients, and invoices will be permanently removed.
            </p>
            <button className="btn-danger" onClick={() => toast.error("Account deletion disabled in demo")}>
              Delete Account
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default SettingsPage;