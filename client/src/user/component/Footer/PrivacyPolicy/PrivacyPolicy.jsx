import React from 'react';
import './PrivacyPolicy.css'; // Assuming you have some CSS for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-heading">Privacy Policy</h1>

      <p className="privacy-policy-intro">
        At <strong>RENT IT</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
      </p>

      <h2 className="privacy-policy-information-heading">1. Information We Collect</h2>
      <ul className="privacy-policy-information-list">
        <li>Personal information (name, email, phone number, address).</li>
        <li>Rental preferences and search history.</li>
        <li>Payment and transaction details.</li>
        <li>Device and usage data (browser type, IP address, etc.).</li>
      </ul>

      <h2 className="privacy-policy-information2-heading">2. How We Use Your Information</h2>
      <ul className="privacy-policy-information2-list">
        <li>To facilitate rental bookings and manage your account.</li>
        <li>To improve user experience and platform functionality.</li>
        <li>To process payments securely.</li>
        <li>To send updates, promotions, or service-related notifications.</li>
      </ul>

      <h2 className="privacy-policy-information3-heading">3. Information Sharing</h2>
      <p className="privacy-policy-information3-intro">
        We do not sell your data. We may share your information with:
      </p>
      <ul className="privacy-policy-information3-list">
        <li>Trusted third-party service providers (e.g., payment gateways).</li>
        <li>Law enforcement if required by law.</li>
        <li>Property owners or renters as needed for transactions.</li>
      </ul>

      <h2 className="privacy-policy-information4-heading">4. Data Security</h2>
      <p className="privacy-policy-information4-intro">
        We use industry-standard security measures to protect your personal information. However, no system is 100% secure, and we recommend users take personal precautions.
      </p>

      <h2 className="privacy-policy-information5-heading">5. Your Choices</h2>
      <ul className="privacy-policy-information5-list">
        <li>You may update or delete your profile information at any time.</li>
        <li>You can opt out of marketing emails via the unsubscribe link.</li>
      </ul>

      <h2 className="privacy-policy-information6-heading">6. Changes to This Policy</h2>
      <p className="privacy-policy-information6-intro">
        We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
      </p>

      <h2 className="privacy-policy-information7-heading">7. Contact Us</h2>
      <p className="privacy-policy-information7-intro">
        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@rentit.com" className="support-rent-it-com">support@rentit.com</a>.
      </p>

      <p className="privacy-policy-effective-data">Effective Date: April 6, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
