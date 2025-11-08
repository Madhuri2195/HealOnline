import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VirtualConsultation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch only appointments for the logged-in patient
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userAppointments = allAppointments.filter(a => a.patientEmail === user.email);
    setAppointments(userAppointments);
  }, [user.email]);

  const handleBack = () => navigate("/home");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "url('/home-background.jpg') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "rgba(30, 64, 175, 0.9)",
          color: "white",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            backgroundColor: "white",
            color: "#1e40af",
            border: "none",
            padding: "10px 18px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
        <h1>Virtual Consultations</h1>
        <div />
      </div>

      {appointments.length === 0 ? (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e40af", textAlign: "center" }}>
          No virtual consultations available.
        </p>
      ) : (
        appointments.map((app, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              width: "90%",
              maxWidth: "550px",
              margin: "0 auto 20px",
            }}
          >
            <h3 style={{ color: "#1e40af", fontWeight: "bold" }}>
              Doctor: {app.doctor || app.doctorDisplayName}
            </h3>
            <p><strong>Issue:</strong> {app.issue}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Status:</strong> {app.response ? "Responded" : "Pending"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VirtualConsultation;
