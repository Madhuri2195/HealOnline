import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Appointment from "./components/Appointment";
import MedicalRecords from "./components/MedicalRecords";
import DoctorPanel from "./components/DoctorPanel";
import VirtualConsultation from "./components/VirtualConsultation";
import EPrescription from "./components/EPrescription";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import PharmacistPanel from "./components/PharmacistPanel";
import PrescriptionRequests from "./components/PrescriptionRequests";

function App() {
  // Load user only once
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const location = useLocation();

  const handleLogin = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Pages where navbar/header should NOT show
  const hideHeaderNavbar = [
    "/home",
    "/doctors",
    "/appointment",
    "/medical-records",
    "/dashboard",
    "/virtual-consultation",
    "/e-prescription",
    "/prescription-requests",
  ].includes(location.pathname);

  return (
    <>
      {/* Header only on login and register */}
      {!hideHeaderNavbar && <header className="page-header">HealOnline</header>}

      {/* Navbar for logged-in users */}
      {user && !hideHeaderNavbar && (
        <Navbar user={user} onLogout={handleLogout} />
      )}

      <Routes>
        {/* LOGIN */}
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
                    : user.role === "pharmacist"
                    ? "/dashboard"
                    : "/"
                }
              />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* PATIENT ROUTES */}
        <Route
          path="/home"
          element={user?.role === "patient" ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/doctors"
          element={user?.role === "patient" ? <Doctors /> : <Navigate to="/" />}
        />
        <Route
          path="/appointment"
          element={
            user?.role === "patient" ? <Appointment /> : <Navigate to="/" />
          }
        />
        <Route
          path="/medical-records"
          element={
            user?.role === "patient" ? <MedicalRecords /> : <Navigate to="/" />
          }
        />
        <Route
          path="/virtual-consultation"
          element={
            user?.role === "patient" ? (
              <VirtualConsultation />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/e-prescription"
          element={
            user?.role === "patient" ? <EPrescription /> : <Navigate to="/" />
          }
        />

        {/* DOCTOR DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            !user ? (
              <Navigate to="/" />
            ) : user.role === "doctor" ? (
              <DoctorPanel />
            ) : user.role === "pharmacist" ? (
              <PharmacistPanel />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* PHARMACIST PAGE */}
        <Route
          path="/prescription-requests"
          element={
            user?.role === "pharmacist" ? (
              <PrescriptionRequests />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default App;
