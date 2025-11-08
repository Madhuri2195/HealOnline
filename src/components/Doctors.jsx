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
    localStorage.removeItem("user"); // clear user
    navigate("/");                   // navigate to login
  };

  return (
    <div
      className="doctors-wrapper"
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "url('/home-background.jpg') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      {/* Header with Back & Logout */}
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

        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Our Doctors</h1>

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

      {/* Subtitle */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "black",
          marginBottom: "10px",
        }}
      >
        Find Trusted doctors near you
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "black",
          marginBottom: "25px",
        }}
      >
        You can now book your appointment
      </p>

      {/* Doctor Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {doctorsList.map((doc) => (
          <div
            key={doc.name}
            className="card"
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              width: "220px",
              textAlign: "center",
              transition: "0.3s",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#1e40af",
                marginBottom: "10px",
              }}
            >
              {doc.name}
            </h3>
            <p style={{ color: "#64748b", marginBottom: "15px" }}>
              {doc.specialization}
            </p>
            <button
              onClick={() => navigate("/appointment", { state: { doctor: doc.name } })}
              style={{
                backgroundColor: "#1e40af",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
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
