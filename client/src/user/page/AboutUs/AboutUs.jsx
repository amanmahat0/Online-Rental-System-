import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="hero-section">
        <h1>About Rent IT</h1>
        <p className="hero-text">
          Welcome to Rent IT! We are a leading online rental platform dedicated to connecting people with the best rental opportunities.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a user-friendly platform that empowers individuals and businesses to find and offer rental solutions with ease.
          We believe in making rental experiences seamless, efficient, and trustworthy for everyone involved.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Trust</h3>
            <p>Building trust through transparent transactions and verified listings</p>
          </div>
          <div className="value-card">
            <h3>Convenience</h3>
            <p>Making rental processes simple and hassle-free</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Fostering a community of reliable renters and providers</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image1"></div>
            <h3>Bishwo Raj Dhami</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <div className="member-image2"></div>
            <h3>God</h3>
            <p>Operations Director</p>
          </div>
          <div className="team-member">
            <div className="member-image3"></div>
            <h3>Amresh Kumar Yadav</h3>
            <p>Customer Success Lead</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <div className="contact-info">
          <p>Email: support@rentit.com</p>
          <p>Phone: +977 01-XXXXXXX</p>
          <div className="social-links">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our Facebook page"
            >
              <FaFacebook className="social-icon" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our X (Twitter) page"
            >
              <FaTwitter className="social-icon" />
              <span>X (Twitter)</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our LinkedIn page"
            >
              <FaLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram className="social-icon" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;