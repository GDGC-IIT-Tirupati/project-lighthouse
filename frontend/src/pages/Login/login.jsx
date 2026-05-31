import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../../config/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import DotGrid from "../../components/DotGrid/DotGrid";
import NormalButton from "../../components/NormalButton/NormalButton";

import webLogo from "../../assets/website_logo.svg";
import googleLogo from "../../assets/google_logo.svg";

import "./login-page.css";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const idToken = await user.getIdToken();

      console.log('User', user);
      console.log("Token:", idToken);
      //TODO: Implement sending this data to fastAPI
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          token: idToken,
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
      <div className="login-page">
        <header className="header-section">
          <div className="logo-box">
            <img src={webLogo} className="logo" alt="Lighthouse logo" />
          </div>
          <h1 className="title">LIGHTHOUSE</h1>
          <p className="subtitle">Easy to open, Fast to close</p>
        </header>

        <main className="login-card">
          <div className="accent-square"></div>
          <h2 className="card-header">Portal Login</h2>

          <div className="outh-button">
            <div className="google-logo">
              <img src={googleLogo} alt="Google Logo"></img>
            </div>
            <div className="text-oauth" onClick={handleLogin}>Sign in with Google</div>
          </div>

          <div className="divider"></div>
          <div className="card-footer">
            <p className="footer-text">
              New here? <span className="create-acc">Create Account</span>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
