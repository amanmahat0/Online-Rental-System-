// src/user/Payment/Receipt.js
import React, { useEffect, useRef } from "react";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js";
import "./styles/Receipt.css";
import { useNavigate } from "react-router-dom";

const Receipt = ({ receiptData }) => {
  const receiptRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const downloadReceipt = async () => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Payment_Receipt_${receiptData.transactionId}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Failed to download receipt. Please try again.");
    }
  };

  const printReceipt = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Receipt</title></head><body>"
    );
    printWindow.document.write(receiptRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const bookingFee = parseFloat(receiptData.amount) * 0.1; // 10% booking fee
  const totalAmount = parseFloat(receiptData.amount) + bookingFee; // Total amount including booking fee
  const saveReceipt = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: receiptData.fullName,
            email: receiptData.email,
            contact: receiptData.phone,
            address: receiptData.address,
            propertyId: receiptData.propertyId,
            amount: receiptData.amount,
            paymentMethod: receiptData.paymentMethod,
            transactionId: receiptData.transactionId,
            to: receiptData.to,
            toModel: receiptData.toModel,
            from: receiptData.from,
            fromModel: receiptData.fromModel,
          }),
        }
      );
      console.log(receiptData);
      if (!response.ok) {
        throw new Error("Failed to save receipt data.");
      }
      const data = await response.json();
      if (data.status) {
        console.log("Receipt saved successfully:", data.data);
      } else {
        console.error("Failed to save receipt:", data.message);
        alert("Failed to save receipt. Please try again.");
      }
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert("Failed to save receipt. Please try again.");
    }
  };
  useEffect(() => {
    saveReceipt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="receipt-page">
      <div className="receipt-container" ref={receiptRef}>
        <div className="receipt-header">
          <div className="receipt-logo">
            <i className="fas fa-home"></i>
            <h2>Online Rental System</h2>
          </div>
          <div className="receipt-title">
            <h3>Payment Receipt</h3>
            <span className="receipt-status">✓ PAID</span>
          </div>
        </div>

        <div className="receipt-body">
          <div className="receipt-section">
            <div className="receipt-info">
              <div className="info-item">
                <span className="info-label">Transaction ID:</span>
                <span className="info-value">{receiptData.transactionId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date & Time:</span>
                <span className="info-value">{receiptData.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Payment Method:</span>
                <span className="info-value payment-method">
                  {receiptData.paymentMethod === "esewa" && (
                    <>
                      <i className="fas fa-wallet esewa-color"></i>
                      eSewa
                    </>
                  )}
                  {receiptData.paymentMethod === "khalti" && (
                    <>
                      <i className="fas fa-wallet khalti-color"></i>
                      Khalti
                    </>
                  )}
                  {receiptData.paymentMethod === "bank" && (
                    <>
                      <i className="fas fa-university"></i>
                      Bank Transfer
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="receipt-section">
            <h4>Customer Details</h4>
            <div className="customer-details">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{receiptData.fullName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{receiptData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{receiptData.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{receiptData.address}</span>
              </div>
            </div>
          </div>

          <div className="receipt-section payment-details">
            <h4>Payment Details</h4>
            <div className="payment-item">
              <span className="payment-description">{receiptData.purpose}</span>
              <span className="payment-amount">
                NPR {parseFloat(receiptData.amount).toLocaleString()}
              </span>
            </div>
            <div className="payment-subtotal">
              <span>Subtotal</span>
              <span>NPR {parseFloat(receiptData.amount).toLocaleString()}</span>
            </div>
            <div className="payment-item">
              <span className="payment-description">Booking Fee (10%)</span>
              <span className="payment-amount">
                NPR {bookingFee.toLocaleString()}
              </span>
            </div>
            <div className="payment-total">
              <span>Total (Including Booking Fee)</span>
              <span>NPR {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="receipt-section">
            <div className="receipt-note">
              <div className="thank-you-message">
                <i className="fas fa-heart"></i>
                <p>Thank you for your payment!</p>
              </div>
              <p className="note">
                This is an electronically generated receipt and does not require
                a signature.
              </p>
            </div>
          </div>
        </div>

        <div className="receipt-footer">
          <div className="footer-info">
            <p>Online Rental System</p>
            <p>Contact: support@rentit.com | +977-01-XXXXXXX</p>
          </div>
          <div className="qr-code">
            <i className="fas fa-qrcode"></i>
          </div>
        </div>
      </div>

      <div className="receipt-actions">
        <button className="print-btn" onClick={printReceipt}>
          <i className="fas fa-print"></i> Print Receipt
        </button>
        <button className="download-btn" onClick={downloadReceipt}>
          <i className="fas fa-download"></i> Download Receipt
        </button>
        <button className="close-btn" onClick={() => navigate("/")}>
          <i className="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  );
};

export default Receipt;
