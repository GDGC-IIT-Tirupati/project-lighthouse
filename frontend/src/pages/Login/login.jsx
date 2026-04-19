import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DotGrid from "../../components/DotGrid/DotGrid";
import NormalButton from "../../components/NormalButton/NormalButton";

import webLogo from "../../assets/website_logo.svg";

import "./login-page.css";

function Login() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //TODO: Need to implment fastAPI call
    navigate("/otp");
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
          <div className="input-group">
            <label>campus email</label>
            <input
              className="input-field"
              type="email"
              placeholder="username@iittp.ac.in"
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>security key</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <NormalButton text="LOG IN" onClickFunc={handleLogin}></NormalButton>
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
