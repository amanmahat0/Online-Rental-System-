// src/user/Payment/PaymentForm.js
import React from "react";
import "./styles/PaymentForm.css";

const PaymentForm = ({
  formData,
  paymentMethod,
  onChange,
  onSubmit,
  onOpenTerms,
}) => {
  const paymentMethodName = {
    esewa: "eSewa",
    khalti: "Khalti",
    bank: "Bank Transfer",
  };

  return (
    <div className="payment-form-container">
      <div className="payment-method-header">
        <h3>Payment Details</h3>
        <div className={`selected-method ${paymentMethod}`}>
          <i
            className={`fas ${
              paymentMethod === "bank" ? "fa-university" : "fa-wallet"
            }`}
          ></i>
          <span>{paymentMethodName[paymentMethod]}</span>
        </div>
      </div>

      <form className="payment-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="9XXXXXXXX"
              pattern="[9][0-9]{9}"
              title="Phone number must start with 9 and be 10 digits"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount (NPR)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={onChange}
              min="1"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Payment Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={onChange}
              placeholder="Rent payment"
              required
            />
          </div>
        </div>

        {paymentMethod === "bank" && (
          <div className="bank-details">
            <h4>Bank Transfer Details</h4>
            <p>
              <strong>Bank Name:</strong> Nepal Investment Bank Ltd
            </p>
            <p>
              <strong>Account Name:</strong> Online Rental System
            </p>
            <p>
              <strong>Account Number:</strong> 01234567890123456
            </p>
            <p>
              <strong>Branch:</strong> Kathmandu
            </p>
            <p className="note">
              Note: Please upload the payment receipt in the next step
            </p>
          </div>
        )}

        {paymentMethod === "esewa" && (
          <div className="wallet-info">
            <p>You'll be redirected to eSewa to complete your payment.</p>
          </div>
        )}

        {paymentMethod === "khalti" && (
          <div className="wallet-info">
            <p>You'll be redirected to Khalti to complete your payment.</p>
          </div>
        )}

        <div className="form-check">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={onChange}
            required
          />
          <label htmlFor="termsAccepted">
            I agree to the{" "}
            <a href="#terms" onClick={onOpenTerms}>
              Terms and Conditions
            </a>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
