import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="text-xl font-semibold">HealOnline</div>
      <div className="flex gap-4">
        {user.role === "patient" && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/medical-records">Medical Records</Link>
            <Link to="/e-prescription">E-Prescription</Link>
            <Link to="/virtual-consultation">Virtual Consultation</Link>
          </>
        )}
        {user.role === "doctor" && <Link to="/dashboard">Doctor Panel</Link>}
        {user.role === "pharmacist" && <Link to="/dashboard">Pharmacist Panel</Link>}
        {user.role === "admin" && <Link to="/dashboard">Admin Panel</Link>}
        <button onClick={onLogout} className="ml-4 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
