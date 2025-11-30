import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrescriptionRequests = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pharmacyRequests") || "[]");
    const pending = stored.filter((req) => req.status === "Pending");
    setPrescriptions(pending);
  }, []);

  const updateStatus = (id, newStatus, pharmacistMessage = "") => {
    let allRequests = JSON.parse(localStorage.getItem("pharmacyRequests") || "[]");

    allRequests = allRequests.map((p) =>
      p.id === id ? { ...p, status: newStatus, pharmacistMessage } : p
    );

    localStorage.setItem("pharmacyRequests", JSON.stringify(allRequests));

    const pending = allRequests.filter((req) => req.status === "Pending");
    setPrescriptions(pending);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "linear-gradient(to top right,#e0f7ff,#e8faff,#dbeafe)",
      }}
    >
      <div
        style={{
          padding: "18px 22px",
          background: "rgba(10,77,104,0.9)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>

        <h2 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
          Prescription Requests
        </h2>
        <div />
      </div>

      {prescriptions.map((p) => (
        <div
          key={p.id}
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "22px",
            borderRadius: "16px",
            marginBottom: "20px",
            maxWidth: "600px",
            margin: "0 auto 25px",
            boxShadow: "0 10px 26px rgba(0,0,0,0.15)",
            backdropFilter: "blur(4px)",
          }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              color: "#0a4d68",
              marginBottom: "8px",
            }}
          >
            👤 Patient: {p.patient}
          </h3>

          <p><strong>💊 Prescription:</strong> {p.prescription}</p>
          <p><strong>🧑‍⚕️ Doctor:</strong> {p.doctorDisplayName || p.doctor}</p>
          <p><strong>📅 Date:</strong> {p.date}</p>

          <p>
            <strong>🚚 Delivery Type:</strong>{" "}
            <span style={{ fontWeight: "600", color: "#0a4d68" }}>{p.delivery}</span>
          </p>

          {p.delivery === "Home Delivery" && (
            <p>
              <strong>📍 Address:</strong> {p.patientAddress}
            </p>
          )}

          <p>
            <strong>💳 Payment:</strong>{" "}
            {p.paymentStatus === "Paid"
              ? "Paid 🟢"
              : "Not Paid 🔴"}
          </p>

          <p>
            <strong>💰 Total Amount:</strong> ₹{p.totalAmount}
          </p>

          <div style={{ marginTop: "12px" }}>
            <button
              onClick={() => updateStatus(p.id, "Approved")}
              style={{
                padding: "10px 20px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                marginRight: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Approve ✔
            </button>

            <button
              onClick={() => {
                const msg =
                  window.prompt("Enter rejection reason:") || "No reason provided";
                updateStatus(p.id, "Rejected", msg);
              }}
              style={{
                padding: "10px 20px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reject ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionRequests;
