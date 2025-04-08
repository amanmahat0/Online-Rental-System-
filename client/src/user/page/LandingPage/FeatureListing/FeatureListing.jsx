import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './FeatureListing.css';

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
  { 
    id: 4, 
    title: 'Spacious Family Home', 
    propertyType: 'House', 
    price: '$2500/month', 
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
    price: '$7000/month', 
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
    price: '$1500/month', 
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
    price: '$3000/month', 
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
    price: '$2200/month', 
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
    price: '$2000/month', 
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
    price: '$15000/month', 
    location: 'Beverly Hills', 
    imageUrl: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg', 
    description: 'A stunning luxury mansion with private security and a pool.', 
    status: 'Available', 
    contact: '8899001122' 
  }
];

// const ownerListings = [
//   // ... (same data as before)
// ];

const FeatureListing = () => {
  const navigate = useNavigate();
  const listings = [...listing];
  const listingsPerPage = 6;
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [hoveredItems, setHoveredItems] = useState(new Set());
  
  // Only show the first 6 listings
  const currentListings = listings.slice(0, listingsPerPage);

  const handleBookmarkClick = (id) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleBookmarkHover = (id, isHovering) => {
    setHoveredItems(prev => {
      const newSet = new Set(prev);
      if (isHovering) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="feature-listings-container">
      <div className="feature-header-section">
        <h1>Feature Listing</h1>
      </div>
      <div className="feature-listings-grid">
              {currentListings.map((listing) => (
                <div
                  className="feature-listing-card"
                  onClick={() => {
                    navigate(`/topListings/${listing.id}`, { state: { description: listing.description, title: listing.title, price: listing.price, location: listing.location, imageUrl: listing.imageUrl, propertyType: listing.propertyType, status: listing.status, contact: listing.contact } });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={listing.imageUrl} alt={listing.title} className="feature-listing-image" />
                  <div className="feature-listing-details">
                    
                    <div className='feature-listing-button-section'>
                    <h2 className='feature-lsiting-details-card-title'>{listing.title}</h2>
                    <button 
                      className='feature-listing-save-button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(listing.id);
                      }}
                      onMouseEnter={() => handleBookmarkHover(listing.id, true)}
                      onMouseLeave={() => handleBookmarkHover(listing.id, false)}
                    >
                      {bookmarkedItems.has(listing.id) || hoveredItems.has(listing.id) ? (
                        <FaBookmark className='feature-listing-bookmark-icons' />
                      ) : (
                        <FaRegBookmark className='feature-listing-bookmark-icons' />
                      )}
                    </button>
                  </div>
                    <p className='feature-listing-details-card'><FaHome width={20} height={20} className='feature-lsitings-cards-icons'/>{listing.propertyType}</p>
                    <p className='feature-listing-details-card'><FaMapMarkerAlt width={20} height={20} className='feature-lsitings-cards-icons'/>{listing.location}</p>
                    <p className='feature-listing-details-card'><FaRupeeSign width={20} height={20} className='feature-lsitings-cards-icons'/>{listing.price}</p>
                    
                    {/* <p className='top-listing-details-card'><FaInfoCircle width={20} height={20} className='top-lsitings-cards-icons'/>{listing.description}</p> */}
                    <p className='feature-listing-details-card'>
                        <FaInfoCircle width={20} height={20} className='feature-lsitings-cards-icons'/>
                        {listing.description.length > 100 
                          ? listing.description.slice(0, 85) + "..." 
                          : listing.description}
                    </p>
      
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
};

export default FeatureListing;
