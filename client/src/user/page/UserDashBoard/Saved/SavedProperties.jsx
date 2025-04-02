import React, { useState, useEffect } from 'react';
import './SavedProperties.css';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaPhone, FaBookmark, FaBookOpen } from 'react-icons/fa';

const SavedProperties = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const savedListings = JSON.parse(localStorage.getItem("savedListings")) || [
            { id: 1, title: "Modern 2BHK Apartment", propertyType: "Apartment", location: { area: "Baneshwor", city: "Kathmandu" }, price: 25000, description: "Fully furnished apartment with modern amenities, 24/7 water supply, and secure parking.", isAvailable: true, contactNo: "9801234567", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: false },
            { id: 2, title: "Spacious Family House", propertyType: "House", location: { area: "Baluwatar", city: "Kathmandu" }, price: 45000, description: "Beautiful 3BHK house with garden, perfect for families. Located in a quiet neighborhood.", isAvailable: true, contactNo: "9807654321", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: false },
            { id: 3, title: "Commercial Space for Office", propertyType: "Commercial", location: { area: "Thamel", city: "Kathmandu" }, price: 60000, description: "Prime location commercial space ideal for office, restaurant or retail business.", isAvailable: false, contactNo: "9801122334", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: false },
            { id: 4, title: "Single Room with Attached Bathroom", propertyType: "Room", location: { area: "Lazimpat", city: "Kathmandu" }, price: 8000, description: "Furnished single room with attached bathroom, suitable for students or working professionals.", isAvailable: true, contactNo: "9809988776", image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg", isSaved: false, isBooked: false }
        ];
        setListings(savedListings);
    }, []);

    const toggleSaveProperty = (id) => {
        const updatedListings = listings.filter(listing => listing.id !== id); // Remove the property from the list
        setListings(updatedListings);
        localStorage.setItem("savedListings", JSON.stringify(updatedListings));
    };
    

    const bookProperty = (id) => {
        const updatedListings = listings.map(listing => listing.id === id ? { ...listing, isBooked: true, isAvailable: false } : listing);
        setListings(updatedListings);
        localStorage.setItem("savedListings", JSON.stringify(updatedListings));
        localStorage.setItem("bookedProperties", JSON.stringify(updatedListings.filter(listing => listing.isBooked)));
    };

    return (
        <div className="userdashboard-saved-properties">
            <div className="userdashboard-saved-properties-header">
                <h2>Saved Properties</h2>
            </div>
            
            <div className="userdashboard-saved-properties-list">
                {listings.map(listing => (
                    <div key={listing.id} className="userdashboard-saved-property-card">
                        <img src={listing.image} alt={listing.title} className="userdashboard-saved-property-image" />
                        <div className="userdashboard-saved-property-details">
                            <h3 className='userdashboard-saved-properties-card-title'>{listing.title}</h3>
                            <p><FaHome className='userdashboard-saved-properties-icon'/> {listing.propertyType}</p>
                            <p><FaMapMarkerAlt className='userdashboard-saved-properties-icon'/> {listing.location.area}, {listing.location.city}</p>
                            <p><FaRupeeSign className='userdashboard-saved-properties-icon'/> Rs. {listing.price.toLocaleString()}/month</p>
                            <p><FaInfoCircle className='userdashboard-saved-properties-icon'/> {listing.description}</p>
                            <p><FaPhone className='userdashboard-saved-properties-icon'/> {listing.contactNo}</p>
                        </div>
                        <div className="userdashboard-saved-property-actions">
                            <button className={`userdashboard-save-property-save-btn ${listing.isSaved ? 'saved' : ''}`} onClick={() => toggleSaveProperty(listing.id)}>
                                <FaBookmark className='userdashboard-saved-properties-icon'/> {listing.isSaved ? 'Unsave' : 'Remove'}
                            </button>
                            {!listing.isBooked && (
                                <button className="userdashboard-save-property-book-btn" onClick={() => bookProperty(listing.id)}>
                                    <FaBookOpen className='userdashboard-saved-properties-icon'/> Book
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedProperties;
