// src/user/Payment/PaymentSummary.js
import React, { useState } from 'react';
import './styles/PaymentSummary.css';

const PaymentSummary = ({ formData, paymentMethod, onConfirm, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Ensure formData.amount is treated as a number
  const amount = parseFloat(formData.amount) || 0; // Default to 0 if amount is invalid
  const bookingFee = amount * 0.1; // Calculate 10% booking fee
  const totalAmount = amount + bookingFee; // Total amount including booking fee

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const paymentMethodDisplay = {
    esewa: {
      name: 'eSewa',
      // logo: <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp" alt="eSewa Logo" className="payment-logo" />,
      instructions: 'You will be redirected to eSewa to complete this payment.'
    },
    khalti: {
      name: 'Khalti',
      // logo: <img src="https://www.pikpng.com/pngl/m/292-2923069_khalti-digital-wallet-logo-khalti-clipart.png" alt="Khalti Logo" className="payment-logo" />,
      instructions: 'You will be redirected to Khalti to complete this payment.'
    },
    bank: {
      name: 'Bank Transfer',
      // logo: <img src="https://img.icons8.com/?size=100&id=xbAVeXa6Jcbf&format=png&color=000000" alt="Bank Transfer Logo" className="payment-logo" />,
      instructions: 'Please upload your bank deposit receipt.'
    }
  };

  return (
    <div className="payment-summary">
      <h3>Review Your Payment</h3>

      <div className="summary-container">
        <div className="summary-section">
          <h4>Personal Details</h4>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{formData.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{formData.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{formData.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Address:</span>
            <span className="info-value">{formData.address}</span>
          </div>
        </div>

        <div className="summary-section">
          <h4>Payment Details</h4>
          <div className="info-row">
            <span className="info-label">Amount:</span>
            <span className="info-value">NPR {amount.toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Booking Fee (10%):</span>
            <span className="info-value">NPR {bookingFee.toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Payment Method:</span>
            <span className="info-value method-badge">
              {paymentMethodDisplay[paymentMethod].logo}
              {paymentMethodDisplay[paymentMethod].name}
            </span>
          </div>
        </div>

        {paymentMethod === 'bank' && (
          <div className="receipt-upload">
            <label htmlFor="receipt">Upload Payment Receipt</label>
            <div className="upload-area">
              {receipt ? (
                <div className="file-selected">
                  <i className="fas fa-file-alt"></i>
                  <span>{receipt.name}</span>
                  <button type="button" onClick={() => setReceipt(null)} className="remove-file">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="receipt"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required={paymentMethod === 'bank'}
                  />
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Click to upload or drag and drop</p>
                    <span>Supports: JPG, PNG, PDF (Max: 5MB)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="payment-instructions">
          <i className="fas fa-info-circle"></i>
          <p>{paymentMethodDisplay[paymentMethod].instructions}</p>
        </div>

        <div className="summary-total">
          <span>Total Amount (Including Booking Fee):</span>
          <span className="total-amount">NPR {totalAmount.toLocaleString()}</span>
        </div>

        <div className="summary-actions">
          <button
            type="button"
            className="back-btn"
            onClick={onBack}
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            type="button"
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={isProcessing || (paymentMethod === 'bank' && !receipt)}
          >
            {isProcessing ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Processing...
              </>
            ) : (
              <>Confirm Payment</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;