import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaUser, FaFileAlt } from "react-icons/fa";
import "./BookingPage.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state;

  const [rentalData, setRentalData] = useState({
    moveInDate: "",
    leaseDuration: "12", // Default to 12 months
    numberOfOccupants: 1,
    additionalNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData({
      ...rentalData,
      [name]: value,
    });
  };

  const calculateTotalRent = () => {
    if (!rentalData.leaseDuration || !propertyData.price) {
      return 0;
    }
    
    return rentalData.leaseDuration * propertyData.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show rental application summary in an alert
    const summary = `
      Rental Application Summary:
      Property: ${propertyData.title}
      Move-in Date: ${rentalData.moveInDate}
      Lease Duration: ${rentalData.leaseDuration} months
      Number of Occupants: ${rentalData.numberOfOccupants}
      Monthly Rent: ₹${propertyData.price}
      Total Rent for Lease Period: ₹${calculateTotalRent()}
      Additional Notes: ${rentalData.additionalNotes || 'None'}
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
        <h1>Rental Application</h1>
      </div>

      <div className="booking-content">
        <div className="property-summary">
          <h2>{propertyData.title}</h2>
          <div className="property-details">
            <p>
              <FaHome className="property-icon" /> {propertyData.propertyType}
            </p>
            <p>
              <FaMapMarkerAlt className="property-icon" /> {propertyData.location}
            </p>
            <p>
              <FaRupeeSign className="property-icon" /> {propertyData.price} / month
            </p>
          </div>
          <div className="property-image">
            <img src={`http://localhost:5000${propertyData.imageUrl}`} alt={propertyData.title} />
          </div>
        </div>

        <div className="booking-form-container">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="moveInDate">
                <FaCalendarAlt className="form-icon" /> Desired Move-in Date
              </label>
              <input
                type="date"
                id="moveInDate"
                name="moveInDate"
                value={rentalData.moveInDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="leaseDuration">
                <FaCalendarAlt className="form-icon" /> Lease Duration (months)
              </label>
              <select
                id="leaseDuration"
                name="leaseDuration"
                value={rentalData.leaseDuration}
                onChange={handleInputChange}
                required
              >
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">3 months</option>
                <option value="4">4 months</option>
                <option value="5">5 months</option>
                <option value="6">6 months</option>
                <option value="7">7 months</option>
                <option value="8">8 months</option>
                <option value="9">9 months</option>
                <option value="10">10 months</option>
                <option value="11">11 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfOccupants">
                <FaUser className="form-icon" /> Number of Occupants
              </label>
              <input
                type="number"
                id="numberOfOccupants"
                name="numberOfOccupants"
                value={rentalData.numberOfOccupants}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes">
                <FaFileAlt className="form-icon" /> Additional Information
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={rentalData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional information about your rental application?"
                rows="4"
              ></textarea>
            </div>

            <div className="booking-summary">
              <h3>Rental Summary</h3>
              <p>Monthly Rent: ₹{propertyData.price}</p>
              <p>Total Rent for {rentalData.leaseDuration} months: ₹{calculateTotalRent()}</p>
            </div>

            <button type="submit" className="submit-booking-btn">
              Submit Rental Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 