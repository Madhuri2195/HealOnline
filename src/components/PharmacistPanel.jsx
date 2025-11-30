import React from "react";
import { useNavigate } from "react-router-dom";

const PharmacistPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload(); // ⭐ Ensures UI refresh & correct redirect
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "radial-gradient(circle at top right, #eef8ff 0, #e8faff 45%, #dbeafe 100%)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(90deg, #0a4d68, #00afc1, #7fe7dc)",
          padding: "20px 25px",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
          Pharmacist Dashboard
        </h1>

        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#0a4d68",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "0.2s",
          }}
        >
          Logout
        </button>
      </div>

      {/* CARD */}
      <div
        onClick={() => navigate("/prescription-requests")}
        style={{
          width: "320px",
          margin: "0 auto",
          padding: "30px",
          background: "white",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
          cursor: "pointer",
          transition: "0.3s",
          border: "1px solid #e3fdfc",
        }}
      >
        <h2
          style={{
            color: "#0a4d68",
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Prescription Requests
        </h2>

        <p style={{ color: "#475569" }}>
          View and process all patient prescriptions
        </p>
      </div>
    </div>
  );
};

export default PharmacistPanel;
