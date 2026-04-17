import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DotGrid from "../../components/DotGrid/DotGrid";
import NormalButton from "../../components/NormalButton/NormalButton";

import webLogo from "../../assets/website_logo.png";

import "./otp-page.css";

function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");

  const handleOTP = (otp) => {
    //TODO: Class fastAPI here
    navigate("/home");
  };

  return (
    <>
      <div className="background-layer">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#2a2a4a"
          activeColor="#5227FF"
          proximity={120}
        />
      </div>

      <div className="otp-page">
        <nav className="top-nav">
          <div className="nav-logo">
            <img src={webLogo} className="logo" alt="Lighthouse logo" />
          </div>
          <button className="exit-btn" onClick={() => navigate("/")}>
            Exit
          </button>
        </nav>

        <main className="verification-card">
          <h2 className="secure-title">
            Secure <span className="highlight">Access</span>
          </h2>
          <p className="secure-subtitle">
            We've sent a 6-digit verification code to your device.
          </p>

          <div className="otp-container">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="otp-input"
                placeholder="•"
                onChange={(e) => setOTP(e.target.value)}
              />
            ))}
          </div>

          <div className="verify-action-row">
            <NormalButton text="Verfiy" onClickFunc={handleOTP}></NormalButton>
            <div className="resend-text">
              Didn't get a code? <br />
              <span className="resend-link">Resend code</span>
            </div>
          </div>
        </main>

        <section className="info-cards-row">
          <div className="info-card">
              <div className="icon-box white-icon">❓</div>
              <h3>Having trouble?</h3>
              <p>Our support team is available 24/7.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default OTPPage;
