import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cards = [
    { title: "Doctors", path: "/doctors" },
    { title: "Medical Records", path: "/medical-records" },
    { title: "Virtual Consultation", path: "/virtual-consultation" },
    { title: "E-Prescription", path: "/e-prescription" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div
      className="home-wrapper"
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "radial-gradient(circle at top right, #eef8ff, #e8faff 40%, #dbeafe 100%)",
      }}
    >
      {/* Welcome Banner */}
      <div
        className="home-welcome"
        style={{
          padding: "25px 20px",
          background: "linear-gradient(135deg, #0a4d68, #00afc1)",
          color: "white",
          borderRadius: "12px",
          marginBottom: "30px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0, 175, 193, 0.3)",
          animation: "fadeInDown 0.7s ease-out",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
          Welcome, {user.email || "User"}!
        </h1>

        <p style={{ marginTop: "6px", opacity: "0.9" }}>Your HealOnline Dashboard</p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            background: "#ffffff",
            color: "#0a4d68",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
            transition: "0.25s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
          Logout
        </button>
      </div>

      {/* Cards Section */}
      <div
        className="home-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          animation: "fadeInUp 0.8s ease-out",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              width: "220px",
              cursor: "pointer",
              textAlign: "center",
              transition: "0.3s",
              border: "1px solid #e3fdfc",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,175,193,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#0a4d68",
                marginBottom: "10px",
              }}
            >
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
