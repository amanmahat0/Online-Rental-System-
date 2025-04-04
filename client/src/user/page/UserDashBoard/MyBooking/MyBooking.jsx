import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaBookmark } from 'react-icons/fa';
import './MyBooking.css';

const listing = [
    { 
        id: 1, 
        title: 'Luxury Apartment in Downtown', 
        propertyType: 'Apartment', 
        price: '$1200/month', 
        location: 'Downtown', 
        imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
        description: 'This is the best apartment in the world. It has 1 million rooms, 10 million toilets, 100 million kitchens.', 
        status: 'Booked', 
        contact: '1234567890' 
      },
      { 
        id: 2, 
        title: 'Modern Villa with Pool', 
        propertyType: 'Villa', 
        price: '$5000/month', 
        location: 'Beverly Hills', 
        imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 
        description: 'A beautiful villa with a private pool and stunning ocean views.', 
        status: 'Available', 
        contact: '9876543210' 
      },
      { 
        id: 3, 
        title: 'Cozy Studio Apartment', 
        propertyType: 'Apartment', 
        price: '$800/month', 
        location: 'New York City', 
        imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 
        description: 'A compact and stylish studio in the heart of NYC.', 
        status: 'Available', 
        contact: '1122334455' 
      },
];

const MyBooking = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([...listing]);
  
  const cancelBooking = (id) => {
    setListings(listings.filter((listing) => listing.id !== id)); // Remove the listing
  };

  const listingsPerPage = 6;
  const currentListings = listings.slice(0, listingsPerPage);

  return (
    <div className="mybooking-listings-container">
      <div className="mybooking-header-section">
        <h1>My Booking</h1>
      </div>
      <div className="mybooking-listings-grid">
        {currentListings.map((listing) => (
          <div
            className="mybooking-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing.id}`, { state: { description: listing.description, title: listing.title, price: listing.price, location: listing.location, imageUrl: listing.imageUrl, propertyType: listing.propertyType, status: listing.status, contact: listing.contact } });
            }}
            style={{ cursor: 'pointer' }}
            key={listing.id}
          >
            <img src={listing.imageUrl} alt={listing.title} className="mybooking-listing-image" />
            <div className="mybooking-listing-details">
              <div className="mybooking-listing-button-section">
                <h2 className="mybooking-lsiting-details-card-title">{listing.title}</h2>
                <button className="mybooking-listing-save-button">
                  {/* <img src="/bookmark.png" height={25} width={20} /> */}
                  <FaBookmark className='mybooking-bookmark-icons'/>
                </button>
              </div>
              <p className="mybooking-listing-details-card"><FaHome width={20} height={20} className="mybooking-lsitings-cards-icons" />{listing.propertyType}</p>
              <p className="mybooking-listing-details-card"><FaMapMarkerAlt width={20} height={20} className="mybooking-lsitings-cards-icons" />{listing.location}</p>
              <p className="mybooking-listing-details-card"><FaRupeeSign width={20} height={20} className="mybooking-lsitings-cards-icons" />{listing.price}</p>
              <p className="mybooking-listing-details-card">
                <FaInfoCircle width={20} height={20} className="mybooking-lsitings-cards-icons" />
                {listing.description.length > 100 ? listing.description.slice(0, 85) + "..." : listing.description}
              </p>
              
              <button
                className="mybooking-cancel-booking-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  cancelBooking(listing.id);
                }}
              >
                Cancel Booking
              </button>
            
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
