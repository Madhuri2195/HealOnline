import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EPrescription = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [prescriptions, setPrescriptions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [deliveryType, setDeliveryType] = useState("");
  const [address, setAddress] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // medicine rate list (lowercase keys)
  const medicineRates = {
    dolo: 20,
    paracetamol: 15,
    azithromycin: 50,
    amoxicillin: 30,
  };

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const userPrescriptions = allAppointments.filter(
      (a) => a.patientEmail === user.email && a.prescription
    );
    setPrescriptions(userPrescriptions);
  }, [user.email]);

  const handleBack = () => navigate("/home");

  const openDeliveryModal = (presc) => {
    setSelectedPrescription(presc);
    calculateTotal(presc.prescription);
    setShowPaymentModal(true);
  };

  // FIXED FUNCTION: Convert to lowercase for matching
  const calculateTotal = (prescription) => {
    const meds = prescription.split(",").map((m) => m.trim());
    let sum = 0;

    meds.forEach((m) => {
      const med = m.split(" ")[0].toLowerCase(); // Convert to lowercase
      sum += medicineRates[med] || 0;
    });

    setTotalPrice(sum);
  };

  const confirmPayment = () => {
    setPaymentDone(true);
    setShowPaymentModal(false);
    setShowModal(true);
  };

  const sendToPharmacy = () => {
    if (!deliveryType) {
      alert("Please choose a delivery type.");
      return;
    }

    if (deliveryType === "Home Delivery" && address.trim() === "") {
      alert("Please enter your address.");
      return;
    }

    let requests = JSON.parse(localStorage.getItem("pharmacyRequests") || "[]");

    requests.push({
      ...selectedPrescription,
      patient: user.email,
      delivery: deliveryType,
      patientAddress: deliveryType === "Home Delivery" ? address : "Not Required",
      status: "Pending",
      pharmacistMessage: "",
      paymentStatus: paymentDone ? "Paid" : "Not Paid",
      totalAmount: totalPrice,
      id: Date.now(),
    });

    localStorage.setItem("pharmacyRequests", JSON.stringify(requests));

    setShowModal(false);
    setDeliveryType("");
    setAddress("");
    setPaymentDone(false);

    alert("Prescription sent to pharmacist!");
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
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: "white",
            color: "#0a4d68",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>E‑Prescriptions</h1>
        <div />
      </div>

      {/* MAIN */}
      {prescriptions.map((presc, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "20px",
            maxWidth: "650px",
            margin: "0 auto 25px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
            border: "1px solid #e3fdfc",
          }}
        >
          <h2
            style={{
              color: "#0a4d68",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            🧑‍⚕️ Doctor: {presc.doctorDisplayName || presc.doctor}
          </h2>

          <p>
            <strong>📝 Issue:</strong> {presc.issue}
          </p>
          <p>
            <strong>💊 Prescription:</strong> {presc.prescription}
          </p>
          <p>
            <strong>📅 Date:</strong> {presc.date}
          </p>

          <button
            onClick={() => openDeliveryModal(presc)}
            style={{
              marginTop: "12px",
              background: "linear-gradient(135deg, #0a4d68, #00afc1)",
              color: "white",
              padding: "12px 22px",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 12px 28px rgba(0,175,193,0.35)",
            }}
          >
            Send to Pharmacist 📮
          </button>
        </div>
      ))}

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "16px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px" }}>
              Pay Consultation Fee 💳
            </h3>

            <p style={{ marginBottom: "15px" }}>
              Amount to Pay: <strong>₹{totalPrice}</strong>
            </p>

            <button
              onClick={confirmPayment}
              style={{
                width: "100%",
                background: "#0a4d68",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                marginBottom: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Pay Now & Continue
            </button>

            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                width: "100%",
                background: "#ccc",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DELIVERY MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "16px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>
              Select Delivery Option
            </h3>

            <select
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                marginTop: "12px",
                marginBottom: "15px",
              }}
            >
              <option value="">Choose Delivery Type</option>
              <option value="Home Delivery">Home Delivery</option>
              <option value="Store Pickup">Store Pickup</option>
            </select>

            {deliveryType === "Home Delivery" && (
              <textarea
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  marginBottom: "15px",
                }}
              />
            )}

            <button
              onClick={sendToPharmacy}
              style={{
                width: "100%",
                background: "#0a4d68",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                marginBottom: "10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Confirm & Send 📮
            </button>

            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%",
                background: "#ccc",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EPrescription;
