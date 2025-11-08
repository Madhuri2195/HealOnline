import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorPanel = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("user") || "{}");
  const [appointments, setAppointments] = useState([]);
  const [givenResponses, setGivenResponses] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    // Normalize doctor name for reliable matching
    const doctorName = doctor.email?.split("@")[0]?.toLowerCase().replace(/^dr\.?/, "dr.");

    const doctorAppointments = allAppointments.filter((a) => {
      const doc1 = a.doctor?.toLowerCase().replace(/\s+/g, "");
      const doc2 = a.doctorDisplayName?.toLowerCase().replace(/\s+/g, "");
      return (
        doc1 === doctorName.replace(/\s+/g, "") ||
        doc2 === "dr." + doctorName.replace(/^dr\.?/, "").replace(/\s+/g, "")
      );
    });

    setAppointments(doctorAppointments);

    const completed = doctorAppointments.filter(
      (a) => a.response || a.prescription
    );
    setGivenResponses(completed);
  }, [doctor.email]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleResponseChange = (index, field, value) => {
    const updated = [...appointments];
    updated[index][field] = value;
    setAppointments(updated);
  };

  const handleSubmitResponse = (index) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updatedAppointments = allAppointments.map((a) =>
      a.date === appointments[index].date &&
      a.patientEmail === appointments[index].patientEmail
        ? { ...a, ...appointments[index] }
        : a
    );

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert("✅ Response & Prescription submitted successfully!");

    const updatedDoctorAppointments = updatedAppointments.filter((a) => {
      const doc1 = a.doctor?.toLowerCase().replace(/\s+/g, "");
      const doc2 = a.doctorDisplayName?.toLowerCase().replace(/\s+/g, "");
      return (
        doc1.includes(doctor.email?.split("@")[0]?.replace(/\s+/g, "")) ||
        doc2.includes(doctor.email?.split("@")[0]?.replace(/\s+/g, ""))
      );
    });

    setAppointments(updatedDoctorAppointments);
    setGivenResponses(
      updatedDoctorAppointments.filter((a) => a.response || a.prescription)
    );
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
      {/* Header */}
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
        }}
      >
        <h1>Doctor Panel</h1>
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

      {/* Appointments */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {appointments.length === 0 ? (
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e40af" }}>
            No appointments found for you.
          </p>
        ) : (
          appointments.map((app, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                width: "90%",
                maxWidth: "550px",
              }}
            >
              <h3 style={{ color: "#1e40af", fontWeight: "bold" }}>
                Patient: {app.patientName}
              </h3>
              <p><strong>Age:</strong> {app.age}</p>
              <p><strong>Gender:</strong> {app.gender}</p>
              <p><strong>Issue:</strong> {app.issue}</p>
              <p><strong>Date:</strong> {app.date}</p>

              <div style={{ marginTop: "10px" }}>
                <label style={{ fontWeight: "bold" }}>Response:</label>
                <textarea
                  value={app.response || ""}
                  onChange={(e) =>
                    handleResponseChange(index, "response", e.target.value)
                  }
                  rows="3"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />

                <label
                  style={{ fontWeight: "bold", marginTop: "10px", display: "block" }}
                >
                  Prescription:
                </label>
                <textarea
                  value={app.prescription || ""}
                  onChange={(e) =>
                    handleResponseChange(index, "prescription", e.target.value)
                  }
                  rows="3"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />

                <button
                  onClick={() => handleSubmitResponse(index)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#1e40af",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Submit Response
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Responses Section */}
      {givenResponses.length > 0 && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2 style={{ color: "#1e40af", fontWeight: "bold", marginBottom: "20px" }}>
            Responses Given
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {givenResponses.map((resp, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  width: "90%",
                  maxWidth: "550px",
                }}
              >
                <h3 style={{ color: "#1e40af", fontWeight: "bold" }}>
                  Patient: {resp.patientName}
                </h3>
                <p><strong>Issue:</strong> {resp.issue}</p>
                <p><strong>Response:</strong> {resp.response || "N/A"}</p>
                <p><strong>Prescription:</strong> {resp.prescription || "N/A"}</p>
                <p><strong>Date:</strong> {resp.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPanel;
