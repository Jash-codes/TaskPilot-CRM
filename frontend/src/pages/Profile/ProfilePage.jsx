import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, reset } from '../../features/auth/authSlice';
import { getProjects } from '../../features/projects/projectSlice';
import { toast } from 'react-toastify';
import { User, Mail, MapPin, Briefcase, Save, Camera } from 'lucide-react';
import Spinner from '../../components/Spinner';
import './Profile.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  
  const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    // These would ideally come from DB, but we can mock them or add to DB later
    title: 'Senior Freelancer',
    location: 'Remote',
    bio: 'Passionate developer building scalable web applications.'
  });

  useEffect(() => {
    dispatch(getProjects()); // Fetch for stats
    if (isSuccess && message) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch, isSuccess, message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name: formData.name, email: formData.email, password: formData.password }));
  };

  // Calculate Stats
  const totalRevenue = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  if (isLoading) return <Spinner />;

  return (
    <div className="profile-container">
      
      {/* --- HEADER / BANNER --- */}
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-user-info">
          <div className="profile-avatar">
            {user?.name.charAt(0).toUpperCase()}
            <div className="edit-avatar-btn"><Camera size={14} /></div>
          </div>
          <div className="profile-text">
            <h1>{user?.name}</h1>
            <p>{formData.title}</p>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        
        {/* --- LEFT: EDIT FORM --- */}
        <div className="profile-card edit-section">
          <div className="card-header-simple">
            <h3>Edit Profile</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><User size={16} /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label><Mail size={16} /> Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-row-group">
              <div className="form-group">
                <label><Briefcase size={16} /> Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label><MapPin size={16} /> Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>New Password <span style={{fontSize:'0.8em', color:'#666'}}>(leave blank to keep current)</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn save-btn">
              <Save size={18} /> Save Changes
            </button>
          </form>
        </div>

        {/* --- RIGHT: STATS & PERFORMANCE --- */}
        <div className="profile-right-col">
          
          {/* Performance Card */}
          <div className="profile-card stats-card">
            <h3>Performance</h3>
            <div className="stat-row">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-num accent">${totalRevenue.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Completed Projects</span>
              <span className="stat-num">{completedProjects}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Client Rating</span>
              <span className="stat-num">4.9 ★</span>
            </div>
          </div>

          {/* Skills / Tags Card */}
          <div className="profile-card skills-card">
            <h3>Skills</h3>
            <div className="tags-container">
              <span className="tag">Web Development</span>
              <span className="tag">React.js</span>
              <span className="tag">UI/UX Design</span>
              <span className="tag">Node.js</span>
              <span className="tag">Project Mgmt</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;