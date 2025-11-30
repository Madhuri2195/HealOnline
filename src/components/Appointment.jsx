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

    const normalizedDoctorName = doctorName.toLowerCase().replace(/\s+/g, "");

    appointments.push({
      doctor: normalizedDoctorName,
      doctorDisplayName: doctorName,
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
        background: "linear-gradient(135deg, #e0f2fe, #eef2ff)",
      }}
    >
      {/* HEADER */}
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
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <button
          onClick={() => navigate("/doctors")}
          style={{
            backgroundColor: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Book Appointment</h1>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      {/* Title */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#0a4d68",
          marginBottom: "25px",
        }}
      >
        Booking Appointment for{" "}
        <span style={{ color: "#00afc1" }}>{doctorName}</span>
      </p>

      {/* FORM CARD */}
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "30px",
          background: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.25)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <input
            type="text"
            value={doctorName}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontWeight: "600",
            }}
          />

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
            }}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
            }}
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
            }}
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
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
            }}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #0a4d68, #00afc1)",
              color: "white",
              padding: "14px",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 14px 32px rgba(0,175,193,0.55)",
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
