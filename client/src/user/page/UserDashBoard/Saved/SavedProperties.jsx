import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaBookmark } from 'react-icons/fa';
import './SavedProperties.css';

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
  // More listings...
];

const SavedProperties = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([...listing]); // Track saved properties
  const listingsPerPage = 6;
  
  // Only show the first 6 listings
  const currentListings = savedProperties.slice(0, listingsPerPage);

  const handleBookmarkClick = (id) => {
    // Remove property from saved properties when clicked
    setSavedProperties(savedProperties.filter(property => property.id !== id));
  };

  return (
    <div className="saved-properties-listings-container">
      <div className="saved-properties-header-section">
        <h1>Saved Properties</h1>
      </div>
      <div className="saved-properties-listings-grid">
        {currentListings.map((listing) => (
          <div
            className="saved-properties-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing.id}`, { state: { description: listing.description, title: listing.title, price: listing.price, location: listing.location, imageUrl: listing.imageUrl, propertyType: listing.propertyType, status: listing.status, contact: listing.contact } });
            }}
            style={{ cursor: "pointer" }}
            key={listing.id}
          >
            <img src={listing.imageUrl} alt={listing.title} className="saved-properties-listing-image" />
            <div className="saved-properties-listing-details">
              <div className='saved-properties-listing-button-section'>
                <h2 className='saved-properties-lsiting-details-card-title'>{listing.title}</h2>
                <button 
                  className='saved-properties-listing-save-button' 
                  onClick={(e) => { 
                    e.stopPropagation(); // Prevent the listing from being clicked
                    handleBookmarkClick(listing.id); // Remove property
                  }}
                >
                  {/* <img src='/bookmark.png' height={25} width={20} alt="bookmark" /> */}
                  <FaBookmark className='saved-properties-bookmark-icons'/>
                </button>
              </div>
              <p className='saved-properties-listing-details-card'>
                <FaHome width={20} height={20} className='saved-properties-lsitings-cards-icons'/>
                {listing.propertyType}
              </p>
              <p className='saved-properties-listing-details-card'>
                <FaMapMarkerAlt width={20} height={20} className='saved-properties-lsitings-cards-icons'/>
                {listing.location}
              </p>
              <p className='saved-properties-listing-details-card'>
                <FaRupeeSign width={20} height={20} className='saved-properties-lsitings-cards-icons'/>
                {listing.price}
              </p>
              <p className='saved-properties-listing-details-card'>
                <FaInfoCircle width={20} height={20} className='saved-properties-lsitings-cards-icons'/>
                {listing.description.length > 100 ? listing.description.slice(0, 85) + "..." : listing.description}
              </p>
              <button 
                className="saved-properties-listing-book-button"
                onClick={(e) => { 
                  e.stopPropagation(); // Prevent card click event
                  alert(`Booking property: ${listing.title}`); // Replace with actual booking logic
                }}
              >
                Book Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
