import React, { useState } from 'react';
import './create-account.css';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();
  
  // State to make text boxes typable
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-page-wrapper">
      <nav className="signup-nav">
        <div className="nav-logo">LIGHTHOUSE</div>
        <div className="nav-menu">
          <span>Support</span>
          <span className="login-link" onClick={() => navigate('/login')}>Login</span>
          <span className="icon">🔔</span>
          <span className="icon-user">👤</span>
        </div>
      </nav>

      <div className="signup-content">
        {/* Left Side Hero */}
        <div className="hero-section">
          <div className="badge">JOIN THE COMMUNITY</div>
          <h1 className="hero-title">
            BE THE <br />
            <span className="highlight">LIGHT</span> <br />
            IN THE <br />
            <span className="highlight">HUB.</span>
          </h1>
          <p className="hero-subtitle">
            Report issues, track progress, and help brighten <br />
            your campus ecosystem with Lighthouse.
          </p>
          <div className="avatar-footer">
             {/* Add your avatar images here */}
             <span className="stats-text">JOINED BY 2K+ STUDENTS THIS WEEK</span>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-header">CREATE ACCOUNT</h2>
            
            <div className="input-field-group">
              <label>FULL NAME</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Lighthouse" 
              />
            </div>

            <div className="input-field-group">
              <label>STUDENT ID</label>
              <input 
                type="text" 
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="STU-2024-XXXX" 
              />
            </div>

            <div className="input-field-group">
              <label>CAMPUS EMAIL</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@university.edu" 
              />
            </div>

            <div className="input-field-group">
              <label>PASSWORD</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
              />
            </div>

            <button className="submit-signup-btn">CREATE ACCOUNT</button>

            <p className="footer-signin">
              ALREADY HAVE AN ACCOUNT? <br />
              <span onClick={() => navigate('/login')}>Sign In Here</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;