import React, { useState, useEffect } from 'react';
import './MyBooking.css';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaPhone, FaTimes, FaCheck } from 'react-icons/fa';

const MyBooking = () => {
    const [bookedProperties, setBookedProperties] = useState([
        { id: 1, title: "Modern 2BHK Apartment", propertyType: "Apartment", location: { area: "Baneshwor", city: "Kathmandu" }, price: 25000, description: "Fully furnished apartment with modern amenities, 24/7 water supply, and secure parking.", isAvailable: false, contactNo: "9801234567", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: true },
        { id: 2, title: "Spacious Family House", propertyType: "House", location: { area: "Baluwatar", city: "Kathmandu" }, price: 45000, description: "Beautiful 3BHK house with garden, perfect for families. Located in a quiet neighborhood.", isAvailable: false, contactNo: "9807654321", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: true }
    ]);

    const cancelBooking = (id) => {
        setBookedProperties(bookedProperties.filter(property => property.id !== id));
    };

    return (
        <div className="userdashboard-my-booking">
            <div className="userdashboard-my-booking-header">
                <h2>My Bookings</h2>
            </div>
            
            <div className="userdashboard-my-booking-list">
                {bookedProperties.map(property => (
                    <div key={property.id} className="userdashboard-mybooking-property-card">
                        <img src={property.image} alt={property.title} className="userdashboard-mybooking-property-image" />
                        <div className="userdashboard-mybooking-property-details">
                            <h3 className="userdashboard-mybooking-property-title">{property.title}</h3>
                            <p><FaHome /> {property.propertyType}</p>
                            <p><FaMapMarkerAlt /> {property.location.area}, {property.location.city}</p>
                            <p><FaRupeeSign /> Rs. {property.price.toLocaleString()}/month</p>
                            <p><FaInfoCircle /> {property.description}</p>
                            <p><FaPhone /> {property.contactNo}</p>
                        </div>
                        <div className="userdashboard-mybooking-property-actions">
                            <button className="userdashboard-mybooking-cancel-btn" onClick={() => cancelBooking(property.id)}>
                                <FaTimes /> Cancel Booking
                            </button>
                            <button className="userdashboard-mybooking-view-btn">
                                <FaCheck /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBooking;
