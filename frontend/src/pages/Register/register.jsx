import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import DotGrid from "../../components/DotGrid/DotGrid";
import webLogo from "../../assets/website_logo.svg";
import googleLogo from "../../assets/google_logo.svg";

import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!username.trim()) {
      setError("Please enter a username before registering.");
      return;
    }
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Send token and metadata to backend /register endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          token: idToken,
          username: username.trim(),
          user_email: user.email,
          role: "student"
        })
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Registration failed");
        return;
      }

      // On success, navigate to home or wherever you prefer
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Firebase authentication error");
    }
  };

  return (
    <>
      <div className="background-layer">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#3fd634"
          activeColor="#1b920c"
          proximity={120}
        />
      </div>
      <div className="register-page">
        <header className="header-section">
          <div className="logo-box">
            <img src={webLogo} className="logo" alt="Lighthouse logo" />
          </div>
          <h1 className="title">LIGHTHOUSE</h1>
          <p className="subtitle">Easy to open, Fast to close</p>
        </header>

        <main className="register-card">
          <div className="accent-square"></div>
          <h2 className="card-header">Create Account</h2>

          <div className="input-group">
            <label htmlFor="username">Choose Username</label>
            <input
              id="username"
              type="text"
              className="input-field"
              placeholder="e.g. sirlancelot"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="oauth-button" onClick={handleRegister}>
            <div className="google-logo">
              <img src={googleLogo} alt="Google Logo" />
            </div>
            <div className="text-oauth">Sign up with Google</div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="divider"></div>
          <div className="card-footer">
            <p className="footer-text">
              Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Register;
