import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [issue, setIssue] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (location.state && location.state.doctor) {
      setDoctorName(location.state.doctor.trim());
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !age || !gender || !issue || !phone) {
      alert("Please fill all details");
      return;
    }

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    // ✅ normalize doctor name (case-insensitive, trimmed)
    const normalizedDoctorName = doctorName.toLowerCase().replace(/\s+/g, "");

    appointments.push({
      doctor: normalizedDoctorName, // store normalized name
      doctorDisplayName: doctorName, // keep original for display
      patientName,
      patientEmail: user.email,
      age,
      gender,
      issue,
      phone,
      response: "",
      prescription: "",
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));
    alert("Appointment booked successfully!");
    navigate("/doctors");
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
          onClick={() => navigate("/doctors")}
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

        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Book Appointment</h1>

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

      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#000",
          marginBottom: "25px",
        }}
      >
        Booking Appointment for <span style={{ color: "#1e40af" }}>{doctorName}</span>
      </p>

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            value={doctorName}
            readOnly
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontWeight: "bold",
            }}
          />
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Health Issue / Symptoms"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1e40af",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
