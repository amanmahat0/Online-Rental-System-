import React from 'react';
import './TopListings.css';

const TopListings = () => {
  const listings = [
    { id: 1, title: 'Luxury Apartment in Downtown', price: '$1200/month', location: 'Downtown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 2, title: 'Cozy Studio Near University', price: '$800/month', location: 'Near University', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 3, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 4, title: 'Modern Condo with Pool', price: '$1100/month', location: 'City Center', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 5, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
    { id: 6, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  ];

  return (
    <div className="top-listings-container">
        <div>
            <h1>Top Listings</h1>
            <button className='browseProperties'>Browse Properties</button>
        </div>
      
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
            <div className="listing-details">
              <h2>{listing.title}</h2>
              <p>{listing.price}</p>
              <p>{listing.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopListings;