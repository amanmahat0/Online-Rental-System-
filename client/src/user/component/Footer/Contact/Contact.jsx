import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css"; // Assuming you have some CSS for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      
      <div className="contact-form-container">
        <div className="contact-info-container">
          <div className="contact-items-container">
            <FaEnvelope className="contact-envelope" />
            <span>support@rentit.com</span>
          </div>
          <div className="contact-items-container">
            <FaPhoneAlt className="contact-phonealt" />
            <span>+1 234 567 8901</span>
          </div>
          <div className="contact-items-container">
            <FaMapMarkerAlt className="contactmapmarker" />
            <span>123 Main Street, City, Country</span>
          </div>
        </div>

        <form className="contact-form-container">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input-your-name-container"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input-your-email-container"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="contact-input-your-message-container"
          ></textarea>
          <button
            type="submit"
            className="contact-button-send-message-container"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
