import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VirtualConsultation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userAppointments = allAppointments.filter(
      (a) => a.patientEmail === user.email
    );
    setAppointments(userAppointments);
  }, [user.email]);

  const handleBack = () => navigate("/home");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #e0f7ff, #e8faff, #d7f3ff)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "linear-gradient(135deg, #0a4d68, #00afc1)",
          color: "white",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            backgroundColor: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back
        </button>

        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
          Virtual Consultations
        </h1>

        <div style={{ width: "70px" }} />
      </div>

      {/* No consultations */}
      {appointments.length === 0 ? (
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#0a4d68",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          No virtual consultations available.
        </p>
      ) : (
        appointments.map((app, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "22px",
              borderRadius: "14px",
              boxShadow: "0 6px 22px rgba(0, 175, 193, 0.25)",
              width: "92%",
              maxWidth: "550px",
              margin: "0 auto 22px",
              borderLeft: "4px solid #00afc1",
            }}
          >
            <h3
              style={{
                color: "#0a4d68",
                fontWeight: "700",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              Doctor: {app.doctor || app.doctorDisplayName}
            </h3>

            <p><strong>Issue:</strong> {app.issue}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p>
              <strong>Status:</strong>{" "}
              {app.response ? "Responded" : "Pending"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default VirtualConsultation;
