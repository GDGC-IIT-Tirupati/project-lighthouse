import React, { useState } from 'react';
import './App.css';
import DotGrid from './components/DotGrid'; 

function App() {
  // Use state to track which page to show: 'login' or 'otp'
  const [page, setPage] = useState('login');

  const handleLogin = (e) => {
    e.preventDefault();
    setPage('otp'); // Switch to the next page on button click
  };

  return (
    <div className="app-wrapper">
      {/* BACKGROUND REMAINS THE SAME FOR BOTH */}
      <div className="background-layer">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#2a2a4a" 
          activeColor="#5227FF" 
          proximity={120}
        />
      </div>

      <div className="container">
        
        {/* --- PAGE 1: LOGIN --- */}
        {page === 'login' && (
          <>
            <header className="header-section">
              <div className="logo-box">Light<br/>House</div>
              <h1 className="title">LIGHTHOUSE</h1>
              <p className="subtitle">ILLUMINATING CAMPUS OPS</p>
            </header>

            <main className="login-card">
              <div className="accent-square"></div>
              <h2 className="card-header">Portal Login</h2>
              <div className="input-group">
                <label>campus email</label>
                <input className="input-field" type="email" placeholder="username@iittp.ac.in" />
              </div>
              <div className="input-group">
                <label>security key</label>
                <input className="input-field" type="password" placeholder="••••••••" />
              </div>
              <button className="login-btn" onClick={handleLogin}>
                LOG IN <span className="arrow">→</span>
              </button>
              <div className="divider"></div>
              <div className="card-footer">
                <p>New here? <span className="create-acc">Create Account</span></p>
              </div>
            </main>
          </>
        )}

        {/* --- PAGE 2: SECURE ACCESS (OTP) --- */}
        {page === 'otp' && (
          <>
            <nav className="top-nav">
              <div className="nav-logo">Light<br/>House</div>
              <button className="exit-btn" onClick={() => setPage('login')}>Exit</button>
            </nav>

            <main className="verification-card">
              <h2 className="secure-title">Secure <span className="highlight">Access</span></h2>
              <p className="secure-subtitle">We've sent a 6-digit verification code to your device.</p>
              
              <div className="otp-container">
                {[...Array(6)].map((_, i) => (
                  <input key={i} type="text" maxLength="1" className="otp-input" placeholder="•" />
                ))}
              </div>

              <div className="verify-action-row">
                <button className="login-btn verify-btn">Verify <span>→</span></button>
                <div className="resend-text">Didn't get a code? <br/><span className="resend-link">Resend code</span></div>
              </div>
            </main>

            <section className="info-cards-row">
              <div className="info-card">
                <div className="icon-box green-icon">🛡️</div>
                <h3>Bank-grade security</h3>
                <p>Your data is encrypted with AES-256 bits.</p>
              </div>
              <div className="info-card">
                <div className="icon-box white-icon">❓</div>
                <h3>Having trouble?</h3>
                <p>Our support team is available 24/7.</p>
              </div>
            </section>
          </>
        )}

        
        <footer className="dots-container">
          <div className={`dot ${page === 'login' ? 'active' : ''}`}></div>
          <div className={`dot ${page === 'otp' ? 'active' : ''}`}></div>
          <div className="dot"></div>
        </footer>

      </div>
    </div>
  );
}

export default App;