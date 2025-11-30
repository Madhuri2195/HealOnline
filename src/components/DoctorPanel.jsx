import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorPanel = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("user") || "{}");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    const doctorName = doctor.email
      ?.split("@")[0]
      ?.toLowerCase()
      .replace(/^dr\.?/, "dr.");

    const doctorAppointments = allAppointments.filter((a) => {
      const doc1 = a.doctor?.toLowerCase().replace(/\s+/g, "");
      const doc2 = a.doctorDisplayName?.toLowerCase().replace(/\s+/g, "");
      return (
        doc1 === doctorName.replace(/\s+/g, "") ||
        doc2 === "dr." + doctorName.replace(/^dr\.?/, "").replace(/\s+/g, "")
      );
    });

    setAppointments(doctorAppointments);
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

    alert("Response & Prescription submitted!");

    // REMOVE the submitted appointment from doctor panel view
    const remaining = appointments.filter((_, i) => i !== index);
    setAppointments(remaining);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background:
          "radial-gradient(circle at top right, #eef8ff 0, #e8faff 45%, #dbeafe 100%)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "linear-gradient(90deg, #0a4d68, #00afc1, #7fe7dc)",
          color: "white",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.20)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Doctor Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      {/* APPOINTMENT CARDS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {appointments.length === 0 ? (
          <p style={{ fontSize: "1.3rem", fontWeight: "600", color: "#0a4d68" }}>
            No appointments found.
          </p>
        ) : (
          appointments.map((app, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                width: "95%",
                maxWidth: "550px",
              }}
            >
              <h3
                style={{
                  color: "#0a4d68",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                Patient: {app.patientName}
              </h3>

              <p><strong>Age:</strong> {app.age}</p>
              <p><strong>Gender:</strong> {app.gender}</p>
              <p><strong>Issue:</strong> {app.issue}</p>
              <p><strong>Date:</strong> {app.date}</p>

              {/* RESPONSE */}
              <label style={{ fontWeight: "600", marginTop: "10px" }}>Response:</label>
              <textarea
                value={app.response || ""}
                onChange={(e) =>
                  handleResponseChange(index, "response", e.target.value)
                }
                rows="3"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                }}
              />

              {/* PRESCRIPTION */}
              <label style={{ fontWeight: "600", marginTop: "10px" }}>
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
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                }}
              />

              <button
                onClick={() => handleSubmitResponse(index)}
                style={{
                  marginTop: "10px",
                  background: "linear-gradient(135deg, #0a4d68, #00afc1)",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: "999px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0,175,193,0.35)",
                }}
              >
                Submit Response
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorPanel;
