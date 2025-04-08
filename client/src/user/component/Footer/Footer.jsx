import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="app-footer">
      <div className="foooter-compoents-container">
      <div className="logo" onClick={() => {
              navigate(`/`)}}>
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
          <h3 className="footer-rentIt">Rent IT</h3>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Rent IT</h3>
          <ul>
            <li onClick={() => {
              navigate(`/agentAndOwner`)}}>Agents and Owner</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Terms & Privacy</h3>
          <ul>
            <li onClick={() => {
              navigate(`/termsAndCondition`)}}>Terms and Condition</li>
            <li onClick={() => {
              navigate(`/privacyPolicy`)}}>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li onClick={() => {
              navigate(`/contact`)}}>Contact</li>
          </ul>
        </div>
      </div>

      </div>
    
      <p>&copy; 2025 Rent IT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
