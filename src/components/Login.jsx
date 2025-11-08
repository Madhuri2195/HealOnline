import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter email and password");

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) return alert("Invalid credentials");

    localStorage.setItem("user", JSON.stringify(user));
    onLogin && onLogin(user);

    if (user.role === "patient") navigate("/home");
    else navigate("/dashboard");
  };

  return (
    <div className="login-wrapper" style={{ display: "flex", gap: "50px", justifyContent: "center", alignItems: "center" }}>
      

      {/* Login card */}
      <div className="panel">
        {/* Optional logo */}
        <img 
          src="/logo.png" 
          alt="HealOnline Logo" 
          style={{ width: "100px", margin: "0 auto 15px", display: "block" }} 
        />

        <h1>Welcome to HealOnline!</h1>
        <p className="text-gray-1000">Please login to continue</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <button type="submit" className="btn">Login</button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
