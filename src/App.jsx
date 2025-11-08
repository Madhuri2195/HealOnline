import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Appointment from "./components/Appointment";
import MedicalRecords from "./components/MedicalRecords";
import DoctorPanel from "./components/DoctorPanel"; // ✅ Doctor panel
import VirtualConsultation from "./components/VirtualConsultation"; // ✅ Virtual Consultation
import EPrescription from "./components/EPrescription"; // ✅ E-Prescription
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Hide header & navbar for patient, doctor panel, virtual consultation, and e-prescription pages
  const hideHeaderNavbar = [
    "/home",
    "/doctors",
    "/appointment",
    "/medical-records",
    "/dashboard",
    "/virtual-consultation",
    "/e-prescription"
  ].includes(location.pathname);

  return (
    <>
      {/* Global Page Header */}
      {!hideHeaderNavbar && <header className="page-header">HealOnline</header>}

      {/* Navbar */}
      {user && !hideHeaderNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* Redirect based on role after login */}
        <Route
          path="/"
          element={
            !user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate
                to={
                  user.role === "patient"
                    ? "/home"
                    : user.role === "doctor"
                    ? "/dashboard"
                    : "/dashboard"
                }
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            !user ? (
              <Register />
            ) : (
              <Navigate
                to={
                  user.role === "patient"
                    ? "/home"
                    : user.role === "doctor"
                    ? "/dashboard"
                    : "/dashboard"
                }
              />
            )
          }
        />

        {/* Patient Routes */}
        {user && user.role === "patient" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/virtual-consultation" element={<VirtualConsultation />} />
            <Route path="/e-prescription" element={<EPrescription />} />
          </>
        )}

        {/* Doctor Route */}
        {user && user.role === "doctor" && (
          <Route path="/dashboard" element={<DoctorPanel />} />
        )}

        {/* Future routes for pharmacist/admin can go here */}
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default App;
