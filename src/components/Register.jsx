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
    if (users.find((u) => u.email === email)) return alert("Email already registered");

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="panel">
        <h2>Register</h2>
        <p className="text-gray-1000">Create your account</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
