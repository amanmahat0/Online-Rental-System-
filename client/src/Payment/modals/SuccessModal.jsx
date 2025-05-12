import React from 'react';
import '../styles/Modals.css';

const SuccessModal = ({ onClose, transactionDetails }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container success-modal">
        <div className="modal-header">
          <h3>Payment Successful</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="success-animation">
            <div className="checkmark-circle">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
          </div>
          
          <div className="success-message">
            <h4>Transaction Completed</h4>
            <p>Your payment has been processed successfully.</p>
          </div>
          
          <div className="transaction-details">
            <p>Transaction ID: <span>{transactionDetails?.id || 'TXN12345678'}</span></p>
            <p>Amount: <span>{transactionDetails?.amount || 'NPR 10,000'}</span></p>
            <p>Date: <span>{transactionDetails?.date || new Date().toLocaleDateString()}</span></p>
            <p>Payment Method: <span>{transactionDetails?.method || 'eSewa'}</span></p>
          </div>
          
          <div className="success-note">
            {/* <p>A receipt has been sent to your registered email address.</p> */}
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Close
          </button>
          <button className="modal-btn">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;