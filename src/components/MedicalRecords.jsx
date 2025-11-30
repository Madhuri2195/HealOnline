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
        background: "radial-gradient(circle at top right, #eef8ff 0, #e8faff 45%, #dbeafe 100%)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "linear-gradient(135deg, #0a4d68, #00afc1, #7fe7dc)",
          color: "white",
          borderRadius: "16px",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
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
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Clear All Records */}
      {records.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            onClick={handleClearRecords}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 6px 16px rgba(220,38,38,0.4)",
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
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#0a4d68" }}>
            No medical records found.
          </p>
        ) : (
          records.map((rec, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                width: "90%",
                maxWidth: "520px",
                border: "1px solid #e3fdfc",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  color: "#0a4d68",
                  marginBottom: "10px",
                }}
              >
                Doctor: {rec.doctorDisplayName || rec.doctor}
              </h3>

              <p><strong>Issue / Symptoms:</strong> {rec.issue}</p>
              <p><strong>Doctor's Response:</strong> {rec.response || "Pending"}</p>
              <p><strong>Prescription:</strong> {rec.prescription || "Pending"}</p>
              <p><strong>Date:</strong> {rec.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
