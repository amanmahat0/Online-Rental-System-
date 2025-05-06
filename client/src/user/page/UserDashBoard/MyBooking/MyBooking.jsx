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
    availabilityStatus: false, 
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
    availabilityStatus: true, 
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
    availabilityStatus: true, 
    contact: '1122334455' 
  },
  { 
    id: 4, 
    title: 'Spacious Family Home', 
    propertyType: 'House', 
    price: '$2500/month', 
    location: 'Los Angeles', 
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
    description: 'Perfect for families, with a large backyard and modern amenities.', 
    availabilityStatus: true, 
    contact: '2233445566' 
  },
  { 
    id: 5, 
    title: 'Penthouse with City View', 
    propertyType: 'Penthouse', 
    price: '$7000/month', 
    location: 'Chicago', 
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 
    description: 'An exclusive penthouse with a breathtaking skyline view.', 
    availabilityStatus: true, 
    contact: '3344556677' 
  },
  { 
    id: 6, 
    title: 'Countryside Cottage', 
    propertyType: 'Cottage', 
    price: '$1500/month', 
    location: 'Colorado', 
    imageUrl: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 
    description: 'A peaceful cottage surrounded by nature and fresh air.', 
    availabilityStatus: true, 
    contact: '4455667788' 
  },
  { 
    id: 7, 
    title: 'Beachfront Bungalow', 
    propertyType: 'Bungalow', 
    price: '$3000/month', 
    location: 'Miami', 
    imageUrl: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg', 
    description: 'A perfect vacation home right on the beach.', 
    availabilityStatus: true, 
    contact: '5566778899' 
  },
  { 
    id: 8, 
    title: 'Urban Loft in Downtown', 
    propertyType: 'Loft', 
    price: '$2200/month', 
    location: 'San Francisco', 
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', 
    description: 'A trendy loft with high ceilings and modern decor.', 
    availabilityStatus: true, 
    contact: '6677889900' 
  },
  { 
    id: 9, 
    title: 'Farmhouse Retreat', 
    propertyType: 'Farmhouse', 
    price: '$2000/month', 
    location: 'Texas', 
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg', 
    description: 'A spacious farmhouse with land for gardening and animals.', 
    availabilityStatus: false, 
    contact: '7788990011' 
  },
  { 
    id: 10, 
    title: 'Luxury Mansion', 
    propertyType: 'Mansion', 
    price: '$15000/month', 
    location: 'Beverly Hills', 
    imageUrl: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg', 
    description: 'A stunning luxury mansion with private security and a pool.', 
    availabilityStatus: true, 
    contact: '8899001122' 
  }
  // Add more listings here as needed
];

const MyBooking = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([...listing]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 6;

  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

  const cancelBooking = (id) => {
    const updated = listings.filter((listing) => listing.id !== id);
    setListings(updated);
    if (currentPage > Math.ceil(updated.length / listingsPerPage)) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="mybooking-listings-container">
      <div className="mybooking-header-section">
        <h1>My Booking</h1>
      </div>
      <div className="mybooking-listings-grid">
        {currentListings.map((listing) => (
          <div
            className="mybooking-listing-card"
            onClick={() => navigate(`/topListings/${listing.id}`, { state: listing })}
            style={{ cursor: 'pointer' }}
            key={listing.id}
          >
            <div className='mybooking-image-container'>
            <img src={listing.imageUrl} alt={listing.title} className="mybooking-listing-image" />
            <div className={`mybooking-status-badge ${listing.availabilityStatus ? 'approved' : 'pending'}`}>
                {listing.availabilityStatus ? 'Approved' : 'Pending'}
              </div>
            </div>
            
            
            <div className="mybooking-listing-details">
              <div className="mybooking-listing-button-section">
                <h2 className="mybooking-lsiting-details-card-title">{listing.title}</h2>
                <button className="mybooking-listing-save-button">
                  <FaBookmark className='mybooking-bookmark-icons' />
                </button>
              </div>
              <p className="mybooking-listing-details-card"><FaHome className="mybooking-lsitings-cards-icons" />{listing.propertyType}</p>
              <p className="mybooking-listing-details-card"><FaMapMarkerAlt className="mybooking-lsitings-cards-icons" />{listing.location}</p>
              <p className="mybooking-listing-details-card"><FaRupeeSign className="mybooking-lsitings-cards-icons" />{listing.price}</p>
              <p className="mybooking-listing-details-card">
                <FaInfoCircle className="mybooking-lsitings-cards-icons" />
                {listing.description.length > 100 ? listing.description.slice(0, 85) + "..." : listing.description}
              </p>
              {listing.availabilityStatus ? (
                <button
                  className="mybooking-cancel-booking-button pay-now"
                  onClick={e => {
                    e.stopPropagation();
                    // Add your pay now logic here
                  }}
                >
                  Pay Now
                </button>
              ) : (
                <button
                  className="mybooking-cancel-booking-button"
                  onClick={e => {
                    e.stopPropagation();
                    cancelBooking(listing.id);
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mybooking-pagination">
        <button
          className="mybooking-pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`mybooking-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="mybooking-pagination-button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBooking;
