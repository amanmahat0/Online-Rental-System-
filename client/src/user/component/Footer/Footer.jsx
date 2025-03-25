import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="logo">
        <div>
          <img
            src="/Frame.png"
            width={40}
            height={40}
            className="footer-logo"
            alt="Logo"
          />
        </div>
        <div>
          <h1>Rent IT</h1>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Rent IT</h3>
          <ul>
            <li>Agents and Brokers</li>
            <li>Rent home, Apartment</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Terms & Privacy</h3>
          <ul>
            <li>Terms and Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li>Company</li>
            <li>How it works</li>
            <li>Contact</li>
            <li>Investors</li>
          </ul>
        </div>
      </div>
      <p>&copy; 2025 Rent IT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
