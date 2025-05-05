import React from 'react';
import '../styles/Modals.css';

const TermsModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container terms-modal">
        <div className="modal-header">
          <h3>Terms and Conditions</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="terms-content">
            <h4>1. Payment Terms</h4>
            <p>By making a payment through our system, you agree to the following terms and conditions:</p>
            <ul>
              <li>All payments are to be made in Nepalese Rupees (NPR).</li>
              <li>Payment confirmation is subject to verification from the payment gateway.</li>
              <li>A receipt will be generated for successful payments which can be downloaded for your records.</li>
              <li>Rental payments are typically due on the 1st of each month unless specified otherwise.</li>
            </ul>

            <h4>2. Refund Policy</h4>
            <p>Our refund policy is as follows:</p>
            <ul>
              <li>All refunds must be requested within 7 days of making the payment.</li>
              <li>Approved refunds will be processed within 5-7 working days.</li>
              <li>Refund processing fees may apply depending on the payment method used.</li>
              <li>Security deposits may be partially or fully refundable as per the rental agreement terms.</li>
            </ul>

            <h4>3. Security</h4>
            <p>We take security seriously:</p>
            <ul>
              <li>All payment transactions are encrypted and secured.</li>
              <li>We do not store your credit card or bank details on our servers.</li>
              <li>We partner with trusted payment gateways (eSewa and Khalti) that comply with PCI DSS standards.</li>
              <li>Always verify the payment confirmation on the payment gateway's official site.</li>
            </ul>

            <h4>4. Privacy</h4>
            <p>Your privacy matters to us:</p>
            <ul>
              <li>Personal information collected during payment will only be used for transaction processing and record keeping.</li>
              <li>We will not share your information with third parties except as required to process your payment.</li>
              <li>Payment records are kept for legal and accounting purposes as required by law.</li>
            </ul>

            <h4>5. User Responsibilities</h4>
            <p>As a user of our payment system, you are responsible for:</p>
            <ul>
              <li>Ensuring the accuracy of all information provided.</li>
              <li>Maintaining the security of your payment accounts.</li>
              <li>Notifying us immediately of any unauthorized transactions.</li>
              <li>Understanding that failure to make timely payments may result in penalties as outlined in your rental agreement.</li>
            </ul>

            <h4>6. Landlord/Owner Obligations</h4>
            <p>Property owners or landlords using our system agree to:</p>
            <ul>
              <li>Provide receipts for all payments received.</li>
              <li>Keep accurate records of all transactions.</li>
              <li>Process security deposit returns in accordance with the rental agreement.</li>
              <li>Provide clear payment instructions to tenants.</li>
            </ul>

            <h4>7. Amendments</h4>
            <p>We may update these terms from time to time. Significant changes will be communicated via email or notices on our platform.</p>

            <h4>8. Contact Information</h4>
            <p>For any questions regarding payments or these terms, please contact us at:</p>
            <p>Email: support@onlinerentalsystem.com</p>
            <p>Phone: +977-01-4XXXXXX</p>
            <p>Address: Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;