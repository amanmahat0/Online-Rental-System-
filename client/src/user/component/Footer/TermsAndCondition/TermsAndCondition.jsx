import React from 'react';
import './TermsAndCondition.css'; // Assuming you have some CSS for styling

const TermAndCondition = () => {
  return (
    <div className="termsAndCondition-Container">
      <h1 className="termsAndCondition-heading">Terms & Conditions</h1>

      <section className="termsAndCondition-introduction-section">
        <h2 className="termsAndCondition-introduction-heading">1. Introduction</h2>
        <p>
          Welcome to <strong>RENT IT</strong>. By accessing or using our platform, you agree to be bound by these terms and conditions. Please read them carefully before using our services.
        </p>
      </section>

      <section className="termsAndCondition-user-responsibilities-section">
        <h2 className="termsAndCondition-user-responsibility-heading">2. User Responsibilities</h2>
        <ul className="termsAndCondition-user-responsibility-list">
          <li>You must provide accurate and complete information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>Any activity under your account is your responsibility.</li>
        </ul>
      </section>

      <section className="termsAndCondition-rental-policies-section">
        <h2 className="termsAndCondition-rental-policies-heading">3. Rental Policies</h2>
        <ul className="termsAndCondition-rental-policies-list">
          <li>All rentals must be returned on time and in the condition they were received.</li>
          <li>Late returns may result in additional charges.</li>
          <li>Damage to rented items will be assessed and billed accordingly.</li>
        </ul>
      </section>

      <section className="termsAndCondition-payments-cancellations-section">
        <h2 className="termsAndCondition-payments-cancellations-heading">4. Payments & Cancellations</h2>
        <p>
          All payments are processed securely. Cancellations must be made at least 24 hours before the rental start time to receive a full refund.
        </p>
      </section>

      <section className="termsAndCondition-termination-section">
        <h2 className="termsAndCondition-termination-heading">5. Termination</h2>
        <p>
          RENT IT reserves the right to suspend or terminate your access if any violation of terms is found, without prior notice.
        </p>
      </section>

      <section className="termsAndCondition-modifications-section">
        <h2 className="termsAndCondition-modification-heading">6. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="termsAndCondition-contact-section">
        <h2 className="termsAndCondition-contact-heading">7. Contact Us</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at <strong>support@rentit.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default TermAndCondition;
