import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorIllustration from "../assets/doctor-illustration.png";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState(
    Math.random().toString(36).substring(2, 8)
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Please enter email and password");
    if (!captcha) return alert("Please enter the captcha");
    if (captcha !== generatedCaptcha) {
      alert("Captcha does not match");
      setGeneratedCaptcha(Math.random().toString(36).substring(2, 8));
      setCaptcha("");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return alert("Invalid credentials");

    localStorage.setItem("user", JSON.stringify(user));
    onLogin && onLogin(user);

    if (user.role === "patient") navigate("/home");
    else navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    if (!email) return alert("Enter your email to reset password");
    alert(`Password reset link sent to ${email} (mock implementation)`);
  };

  const refreshCaptcha = () => {
    setGeneratedCaptcha(Math.random().toString(36).substring(2, 8));
  };

  return (
    <div className="login-page">
      <img
        src={DoctorIllustration}
        alt="Medical illustration"
        className="login-bg-illustration"
      />

      <div className="login-shell">
        <div className="login-hero">
          <div className="login-hero-text">
            <h2 className="login-hero-title">HealOnline</h2>
            <p className="login-hero-subtitle">
              Your digital platform for <span>appointments</span>,{" "}
              <span>prescriptions</span>, and <span>virtual care</span>.
            </p>
            <ul className="login-hero-points">
              <li>✔ Book consultations instantly</li>
              <li>✔ Secure medical record access</li>
              <li>✔ Fast & safe e‑prescriptions</li>
            </ul>
          </div>
        </div>

        <div className="login-card">
          <div className="login-header-bar" />
          <img src="/logo.png" alt="HealOnline Logo" className="login-logo" />

          <h1 className="login-title">Welcome to Heal Online</h1>
          <p className="login-subtitle">
            Sign in to continue your digital health journey
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            {/* CAPTCHA SECTION */}
            <div className="captcha-section">
              <div className="captcha-display">
                <span>{generatedCaptcha}</span>
                <button type="button" onClick={refreshCaptcha}>
                  ↻
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="login-input captcha-input"
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* FORGOT PASSWORD */}
          <p className="forgot-password">
            <button onClick={handleForgotPassword} className="login-link-btn">
              Forgot Password?
            </button>
          </p>

          <p className="login-bottom-text">
            Don’t have an account?{" "}
            <Link to="/register" className="login-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
