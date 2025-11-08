import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MedicalRecords = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userRecords = allAppointments.filter(
      (rec) => rec.patientEmail === user.email
    );
    setRecords(userRecords);
  }, [user.email]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleClearRecords = () => {
    if (window.confirm("Are you sure you want to clear all medical records?")) {
      const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const remaining = allAppointments.filter(
        (rec) => rec.patientEmail !== user.email
      );
      localStorage.setItem("appointments", JSON.stringify(remaining));
      setRecords([]);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "url('/home-background.jpg') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
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
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => navigate("/home")}
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

        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          Your Medical Records
        </h1>

        <button
          onClick={handleLogout}
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
          Logout
        </button>
      </div>

      {/* Clear All Records */}
      {records.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
        >
          <button
            onClick={handleClearRecords}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Clear All Records
          </button>
        </div>
      )}

      {/* Records List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {records.length === 0 ? (
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e40af" }}>
            No medical records found.
          </p>
        ) : (
          records.map((rec, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                width: "90%",
                maxWidth: "500px",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#1e40af",
                }}
              >
                Doctor: {rec.doctorDisplayName || rec.doctor}
              </h3>
              <p>
                <strong>Issue / Symptoms:</strong> {rec.issue}
              </p>
              <p>
                <strong>Doctor's Response:</strong>{" "}
                {rec.response ? rec.response : "Pending"}
              </p>
              <p>
                <strong>Prescription:</strong>{" "}
                {rec.prescription ? rec.prescription : "Pending"}
              </p>
              <p>
                <strong>Date:</strong> {rec.date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
