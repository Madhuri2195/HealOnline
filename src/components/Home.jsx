import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cards = [
    { title: "Doctors", path: "/doctors" },
    { title: "Medical Records", path: "/medical-records" }, // ensure path is correct
    { title: "Virtual Consultation", path: "/virtual-consultation" },
    { title: "E-Prescription", path: "/e-prescription" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="home-wrapper" style={{ minHeight: "100vh", padding: "20px" }}>
      <div
        className="home-welcome"
        style={{
          padding: "25px 20px",
          backgroundColor: "rgba(30, 64, 175, 0.9)",
          color: "white",
          borderRadius: "8px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h1>Welcome, {user.email || "User"}!</h1>
        <p>Your HealOnline Dashboard</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
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

      <div
        className="home-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)} // this ensures medical records navigate correctly
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              width: "220px",
              cursor: "pointer",
              textAlign: "center",
              transition: "0.3s",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1e40af", marginBottom: "10px" }}>
              {card.title}
            </h3>
            <p style={{ color: "#64748b" }}>Click to view {card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
