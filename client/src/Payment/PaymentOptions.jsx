// src/user/Payment/PaymentOptions.js
import React from "react";
import "./styles/PaymentOptions.css";

const PaymentOptions = ({ onSelect, propertyDetails }) => {
  return (
    <div className="payment-options">
      <div className="payment-summary-card">
        <h3>Payment Summary</h3>
        <div className="property-summary">
          <div className="property-image">
            <img
              src={
                `http://localhost:5000${propertyDetails?.images}` ||
                "/api/placeholder/300/200"
              }
              alt="Property"
            />
          </div>
          <div className="property-info">
            <h4>{propertyDetails?.title || "Property Rental"}</h4>
            <p className="property-location">
              <i className="fas fa-map-marker-alt listing-agent-icon"></i>
              {propertyDetails?.location || "Kathmandu, Nepal"}
            </p>
            <p className="property-type">
              <i className="fas fa-home listing-agent-icon"></i>
              {propertyDetails?.propertType || "Apartment"}
            </p>
            <p className="property-duration">
              <i className="fas fa-calendar-alt listing-agent-icon"></i>
              Monthly Rent
            </p>
          </div>
        </div>
        <div className="payment-amount">
          <span>Amount to Pay:</span>
          <span className="amount">
            NPR {propertyDetails?.pricePerMonth?.toLocaleString() || "15,000"}
          </span>
        </div>
      </div>

      <div className="payment-methods-container">
        <h3>Choose Payment Method</h3>
        <div className="payment-methods">
          <div
            className="payment-method-card"
            onClick={() => onSelect("esewa")}
          >
            <div className="payment-logo esewa-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
                alt="eSewa Logo"
              />
              <span>eSewa</span>
            </div>
            <p>Pay using your eSewa account</p>
            <button className="select-method-btn">Select</button>
          </div>

          <div
            className="payment-method-card"
            onClick={() => onSelect("khalti")}
          >
            <div className="payment-logo khalti-logo">
              <img
                src="https://www.pikpng.com/pngl/m/292-2923069_khalti-digital-wallet-logo-khalti-clipart.png"
                alt="Khalti Logo"
              />
              <span>Khalti</span>
            </div>
            <p>Pay using your Khalti wallet</p>
            <button className="select-method-btn">Select</button>
          </div>

          <div className="payment-method-card" onClick={() => onSelect("bank")}>
            <div className="payment-logo bank-logo">
              <img
                src="https://img.icons8.com/?size=100&id=xbAVeXa6Jcbf&format=png&color=000000"
                alt="Bank Transfer Logo"
              />
              <span>Bank Transfer</span>
            </div>
            <p>Direct bank transfer/deposit</p>
            <button className="select-method-btn">Select</button>
          </div>
        </div>
      </div>

      <div className="payment-security-info">
        <div className="security-item">
          <i className="fas fa-lock"></i>
          <span>Secure Payment</span>
        </div>
        <div className="security-item">
          <i className="fas fa-shield-alt"></i>
          <span>Encrypted Data</span>
        </div>
        <div className="security-item">
          <i className="fas fa-undo-alt"></i>
          <span>Easy Refund</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
