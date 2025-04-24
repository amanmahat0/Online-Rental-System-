import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaBookmark, FaTimes } from 'react-icons/fa';
import './AgentBookings.css';

const listing = [
  { 
    id: 1, 
    title: 'Luxury Apartment', 
    propertyType: 'Apartment', 
    price: '42200/month', 
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
    price: '45000/month', 
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
    price: '48800/month', 
    location: 'New York City', 
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 
    description: 'A compact and stylish studio in the heart of NYC.', 
    status: 'Available', 
    contact: '1122334455' 
  },
  { 
    id: 4, 
    title: 'Spacious Family Home', 
    propertyType: 'House', 
    price: '42500/month', 
    location: 'Los Angeles', 
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
    description: 'Perfect for families, with a large backyard and modern amenities.', 
    status: 'Booked', 
    contact: '2233445566' 
  },
  { 
    id: 5, 
    title: 'Penthouse with City View', 
    propertyType: 'Penthouse', 
    price: '47000/month', 
    location: 'Chicago', 
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 
    description: 'An exclusive penthouse with a breathtaking skyline view.', 
    status: 'Available', 
    contact: '3344556677' 
  },
  { 
    id: 6, 
    title: 'Countryside Cottage', 
    propertyType: 'Cottage', 
    price: '51500/month', 
    location: 'Colorado', 
    imageUrl: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 
    description: 'A peaceful cottage surrounded by nature and fresh air.', 
    status: 'Booked', 
    contact: '4455667788' 
  },
  { 
    id: 7, 
    title: 'Beachfront Bungalow', 
    propertyType: 'Bungalow', 
    price: '53000/month', 
    location: 'Miami', 
    imageUrl: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg', 
    description: 'A perfect vacation home right on the beach.', 
    status: 'Available', 
    contact: '5566778899' 
  },
  { 
    id: 8, 
    title: 'Urban Loft in Downtown', 
    propertyType: 'Loft', 
    price: '42200/month', 
    location: 'San Francisco', 
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', 
    description: 'A trendy loft with high ceilings and modern decor.', 
    status: 'Available', 
    contact: '6677889900' 
  },
  { 
    id: 9, 
    title: 'Farmhouse Retreat', 
    propertyType: 'Farmhouse', 
    price: '52000/month', 
    location: 'Texas', 
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg', 
    description: 'A spacious farmhouse with land for gardening and animals.', 
    status: 'Booked', 
    contact: '7788990011' 
  },
  { 
    id: 10, 
    title: 'Luxury Mansion', 
    propertyType: 'Mansion', 
    price: '115000/month', 
    location: 'Beverly Hills', 
    imageUrl: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg', 
    description: 'A stunning luxury mansion with private security and a pool.', 
    status: 'Available', 
    contact: '8899001122' 
  }
];

const AgentBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listings, setListings] = useState([...listing]);
  
  // Get the initial page from URL or sessionStorage, or default to 1
  const getInitialPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const urlPage = parseInt(queryParams.get('page'), 10);
    
    if (!isNaN(urlPage) && urlPage > 0) {
      return urlPage;
    }
    
    const storedPage = parseInt(sessionStorage.getItem('agentBookingsPage'), 10);
    return !isNaN(storedPage) && storedPage > 0 ? storedPage : 1;
  };
  
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [savedProperties, setSavedProperties] = useState([]);
  const listingsPerPage = 6;

  const totalPages = Math.ceil(listings.length / listingsPerPage);
  
  // Ensure current page is valid based on available listings
  useEffect(() => {
    const maxValidPage = Math.max(1, Math.ceil(listings.length / listingsPerPage));
    if (currentPage > maxValidPage) {
      setCurrentPage(maxValidPage);
    }
  }, [listings, currentPage]);
  
  // Update URL and store page in sessionStorage when page changes
  useEffect(() => {
    // Update URL with current page
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', currentPage.toString());
    
    // Replace state instead of push to avoid creating new history entries for pagination
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    
    // Store current page in sessionStorage
    sessionStorage.setItem('agentBookingsPage', currentPage.toString());
  }, [currentPage, navigate, location.pathname, location.search]);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  const cancelBooking = (id) => {
    const updated = listings.filter((listing) => listing.id !== id);
    setListings(updated);
    
    // If current page would be empty after deletion, go to previous page
    const newTotalPages = Math.ceil(updated.length / listingsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  };

  const toggleSaveProperty = (e, id) => {
    e.stopPropagation();
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter(propId => propId !== id));
    } else {
      setSavedProperties([...savedProperties, id]);
    }
  };

  const changePage = (newPage) => {
    // Validate page number
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="agent-bookings-container">
      <div className="agent-bookings-header">
        <h1>Agent Bookings</h1>
        <p className="agent-bookings-subtitle">Manage all your property bookings in one place</p>
      </div>
      
      <div className="agent-bookings-grid">
        {currentListings.map((listing) => (
          <div
            className="agent-bookings-card"
            onClick={() => navigate(`/agent/listings/${listing.id}`, { state: listing })}
            key={listing.id}
          >
            <div className="agent-bookings-image-container">
              <img src={listing.imageUrl} alt={listing.title} className="agent-bookings-image" />
              <div className="agent-bookings-status">{listing.status}</div>
            </div>
            
            <div className="agent-bookings-details">
              <div className="agent-bookings-title-section">
                <h2 className="agent-bookings-title">{listing.title}</h2>
                <button 
                  className={`agent-bookings-save-button ${savedProperties.includes(listing.id) ? 'saved' : ''}`}
                  onClick={(e) => toggleSaveProperty(e, listing.id)}
                >
                  <FaBookmark className="agent-bookings-bookmark-icon" />
                </button>
              </div>
              
              <div className="agent-bookings-info">
                <p className="agent-bookings-detail"><FaHome className="agent-bookings-icon" /> {listing.propertyType}</p>
                <p className="agent-bookings-detail"><FaMapMarkerAlt className="agent-bookings-icon" /> {listing.location}</p>
                <p className="agent-bookings-detail"><FaRupeeSign className="agent-bookings-icon" /> {listing.price}</p>
                <p className="agent-bookings-description">
                  <FaInfoCircle className="agent-bookings-icon" />
                  {listing.description.length > 100 ? listing.description.slice(0, 85) + "..." : listing.description}
                </p>
              </div>
              
              {/* Button container to push button to bottom */}
              <div className="agent-bookings-button-container">
                <button
                  className="agent-bookings-cancel-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelBooking(listing.id);
                  }}
                >
                  <FaTimes className="agent-bookings-cancel-icon" /> Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="agent-bookings-empty">
          <h3>No bookings available</h3>
          <p>Your booking list is currently empty.</p>
        </div>
      )}

      {listings.length > 0 && (
        <div className="agent-bookings-pagination" data-max-pages={totalPages}>
          <button
            className="agent-bookings-pagination-button"
            data-action="prev"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              data-page={index + 1}
              className={`agent-bookings-pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="agent-bookings-pagination-button"
            data-action="next"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentBookings;