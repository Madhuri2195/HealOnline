import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EPrescription = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userPrescriptions = allAppointments.filter(
      a => a.patientEmail === user.email && a.prescription
    );
    setPrescriptions(userPrescriptions);
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
        <h1>E-Prescriptions</h1>
        <div />
      </div>

      {prescriptions.length === 0 ? (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e40af", textAlign: "center" }}>
          No prescriptions available.
        </p>
      ) : (
        prescriptions.map((presc, index) => (
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
              Doctor: {presc.doctor || presc.doctorDisplayName}
            </h3>
            <p><strong>Issue:</strong> {presc.issue}</p>
            <p><strong>Prescription:</strong> {presc.prescription}</p>
            <p><strong>Date:</strong> {presc.date}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EPrescription;
