// src/user/Payment/Receipt.js
import React, { useRef } from 'react';
import html2canvas from 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js';
import './styles/Receipt.css';

const Receipt = ({ receiptData, onClose }) => {
  const receiptRef = useRef(null);

  const downloadReceipt = async () => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Payment_Receipt_${receiptData.transactionId}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to download receipt. Please try again.');
    }
  };

  const printReceipt = () => {
    window.print();
  };

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
                  {receiptData.paymentMethod === 'esewa' && (
                    <>
                      <i className="fas fa-wallet esewa-color"></i>
                      eSewa
                    </>
                  )}
                  {receiptData.paymentMethod === 'khalti' && (
                    <>
                      <i className="fas fa-wallet khalti-color"></i>
                      Khalti
                    </>
                  )}
                  {receiptData.paymentMethod === 'bank' && (
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
              <span className="payment-amount">NPR {parseFloat(receiptData.amount).toLocaleString()}</span>
            </div>
            <div className="payment-subtotal">
              <span>Subtotal</span>
              <span>NPR {parseFloat(receiptData.amount).toLocaleString()}</span>
            </div>
            <div className="payment-tax">
              <span>Transaction Fee</span>
              <span>NPR 0.00</span>
            </div>
            <div className="payment-total">
              <span>Total</span>
              <span>NPR {parseFloat(receiptData.amount).toLocaleString()}</span>
            </div>
          </div>

          <div className="receipt-section">
            <div className="receipt-note">
              <div className="thank-you-message">
                <i className="fas fa-heart"></i>
                <p>Thank you for your payment!</p>
              </div>
              <p className="note">This is an electronically generated receipt and does not require a signature.</p>
            </div>
          </div>
        </div>

        <div className="receipt-footer">
          <div className="footer-info">
            <p>Online Rental System</p>
            <p>Contact: support@onlinerentalsystem.com | +977-01-4XXXXXX</p>
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
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  );
};

export default Receipt;