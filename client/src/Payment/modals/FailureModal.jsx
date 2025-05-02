import React from 'react';
import '../styles/Modals.css';

const FailureModal = ({ onTryAgain, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container failure-modal">
        <div className="modal-header">
          <h3>Payment Failed</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="failure-animation">
            <div className="failure-circle">
              <i className="fas fa-times-circle"></i>
            </div>
          </div>
          <div className="failure-message">
            <h4>Oops! Something went wrong.</h4>
            <p>Your payment could not be processed at this time.</p>
            <div className="possible-reasons">
              <p>Possible reasons:</p>
              <ul>
                <li>Insufficient funds</li>
                <li>Connection timeout</li>
                <li>Payment gateway error</li>
                <li>Invalid card or account details</li>
              </ul>
            </div>
            <p className="failure-note">No amount has been deducted from your account. If any amount was deducted, it will be refunded within 5-7 working days.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn" onClick={onTryAgain}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;