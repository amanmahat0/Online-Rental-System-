import React from 'react';
import '../styles/Modals.css';

const SuccessModal = ({ transactionId, onViewReceipt }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container success-modal">
        <div className="modal-header">
          <h3>Payment Successful</h3>
        </div>
        <div className="modal-body">
          <div className="success-animation">
            <div className="checkmark-circle">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="success-message">
            <h4>Thank You!</h4>
            <p>Your payment has been processed successfully.</p>
            <div className="transaction-details">
              <p>Transaction ID: <span>{transactionId}</span></p>
              <p>Date: <span>{new Date().toLocaleDateString()}</span></p>
              <p>Time: <span>{new Date().toLocaleTimeString()}</span></p>
            </div>
            <p className="success-note">A confirmation email has been sent to your registered email address.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onViewReceipt}>
            View Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
