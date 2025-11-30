import React from "react";
import { useNavigate } from "react-router-dom";

const doctorsList = [
  { name: "Dr. Smith", specialization: "Cardiologist" },
  { name: "Dr. Johnson", specialization: "Dermatologist" },
  { name: "Dr. Lee", specialization: "Neurologist" },
  { name: "Dr. Patel", specialization: "Pediatrician" },
  { name: "Dr. Kumar", specialization: "Orthopedic" },
];

const Doctors = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="home-wrapper"
      style={{
        minHeight: "100vh",
        padding: "20px",
        background:
          "radial-gradient(circle at top right, #eef8ff, #e8faff 40%, #dbeafe 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* ===== TOP BANNER (same style as Home) ===== */}
      <div
        style={{
          padding: "24px 20px",
          background: "linear-gradient(135deg, #0a4d68, #00afc1)",
          color: "white",
          borderRadius: "18px",
          marginBottom: "4px",
          boxShadow: "0 12px 32px rgba(0, 175, 193, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#ffffff",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
          }}
        >
          Back
        </button>

        <div style={{ textAlign: "center", flex: 1 }}>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "4px" }}>
            Our Doctors
          </h1>
          <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>
            Find trusted doctors and book your appointment instantly
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ffffff",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
          }}
        >
          Logout
        </button>
      </div>

      {/* ===== SUBTITLE UNDER BANNER (centered like dashboard) ===== */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        
        <p
          style={{
            fontSize: "1rem",
            color: "#334155",
          }}
        >
          You can book your appointment instantly
        </p>
      </div>

      {/* ===== DOCTOR CARDS (layout same, colors themed) ===== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "22px",
          justifyContent: "center",
        }}
      >
        {doctorsList.map((doc) => (
          <div
            key={doc.name}
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "18px",
              boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
              width: "230px",
              textAlign: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              border: "1px solid #e3fdfc",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(0,175,193,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(15,23,42,0.12)";
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0a4d68",
                marginBottom: "6px",
              }}
            >
              {doc.name}
            </h3>

            <p
              style={{
                color: "#64748b",
                marginBottom: "16px",
                fontSize: "0.95rem",
              }}
            >
              {doc.specialization}
            </p>

            <button
              onClick={() =>
                navigate("/appointment", { state: { doctor: doc.name } })
              }
              style={{
                background: "linear-gradient(135deg, #0a4d68, #00afc1)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "999px",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 10px 24px rgba(0,175,193,0.45)",
              }}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
