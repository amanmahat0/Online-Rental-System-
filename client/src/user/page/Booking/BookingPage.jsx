import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import "./BookingPage.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state;

  const handleSendRequest = () => {
    // Show rental application summary in an alert
    const summary = `
      Rental Request Summary:
      Property: ${propertyData.title}
      Monthly Rent: ₹${propertyData.price}
    `;
    
    alert(summary);
    // Navigate back to saved properties
    navigate(-1);
  };

  if (!propertyData) {
    return <div className="booking-error">Property data not found</div>;
  }

  return (
    <div className="booking-page-container">
      <div className="booking-header">
        <button className="booking-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>Rental Request</h1>
      </div>

      <div className="booking-content">
        <div className="booking-property-summary">
          <div className="booking-property-image">
            <img src={`http://localhost:5000${propertyData.imageUrl}`} alt={propertyData.title} />
          </div>
          
          <div className="booking-property-info">
            <h2>{propertyData.title}</h2>
            <div className="booking-property-details">
              <div className="booking-detail-item">
                <FaHome className="booking-property-icon" />
                <span>{propertyData.propertyType}</span>
              </div>
              <div className="booking-detail-item">
                <FaMapMarkerAlt className="booking-property-icon" />
                <span>{propertyData.location}</span>
              </div>
              <div className="booking-detail-item">
                <FaRupeeSign className="booking-property-icon" />
                <span>{propertyData.price} / month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-actions">
          <button onClick={handleSendRequest} className="booking-submit-btn">
            Send Rental Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 