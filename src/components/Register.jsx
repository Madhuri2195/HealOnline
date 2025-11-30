import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !role) return alert("Please fill all fields");

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return alert("Email already registered");
    }

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="login-page">
      
      {/* ⭐ SINGLE CENTERED CARD (no left hero section) */}
      <div className="center-card-wrapper">
        <div className="login-card">
          <div className="login-header-bar" />

          <img
            src="/logo.png"
            alt="HealOnline Logo"
            className="login-logo"
          />

          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Sign up to start using HealOnline</p>

          <form onSubmit={handleRegister} className="login-form">
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

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="login-input"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          <p className="login-bottom-text">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
