import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopListings.css';

const agentListings = [
  { id: 1, title: 'Luxury Apartment in Downtown', propertyType: 'Apartment', price: '$1200/month', location: 'Downtown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', description: 'The is the best appartment in the world. It has 1 millions rooms,10 millions toilets, 100 millions kitchens', avaibility:'Booked', contact: '1234567890', ownerName: 'Don', agentName: 'Don' },
  { id: 2, title: 'Cozy Studio Near University', price: '$800/month', location: 'Near University', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', description: 'The is the best appartment in the world. It has 1 millions rooms,10 millions toilets, 100 millions kitchens'},
  { id: 3, title: 'Modern Condo with Pool', price: '$1100/month', location: 'City Center', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 4, title: 'Luxury Apartment in Downtown', price: '$1200/month', location: 'Downtown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 5, title: 'Cozy Studio Near University', price: '$800/month', location: 'Near University', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 6, title: 'Modern Condo with Pool', price: '$1100/month', location: 'City Center', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 7, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 8, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 9, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 10, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 11, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 12, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 13, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 14, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 15, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 16, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 17, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 18, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 19, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 20, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 21, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 22, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 23, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 24, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },

];

const ownerListings = [
  { id: 25, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 26, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 27, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 28, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 29, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 30, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 31, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 32, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 33, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 34, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 35, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 36, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 37, title: 'Luxury Apartment in Downtown', price: '$1200/month', location: 'Downtown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 38, title: 'Cozy Studio Near University', price: '$800/month', location: 'Near University', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 39, title: 'Modern Condo with Pool', price: '$1100/month', location: 'City Center', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 40, title: 'Luxury Apartment in Downtown', price: '$1200/month', location: 'Downtown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 41, title: 'Cozy Studio Near University', price: '$800/month', location: 'Near University', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 42, title: 'Modern Condo with Pool', price: '$1100/month', location: 'City Center', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 43, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 44, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 45, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 46, title: 'Spacious House with Garden', price: '$1500/month', location: 'Suburbs', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 47, title: 'Charming Cottage', price: '$950/month', location: 'Countryside', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: 48, title: 'Penthouse Suite', price: '$2000/month', location: 'Uptown', imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },

];

const TopListings = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 9;

  // Determine which listings to show
  const listings = selectedUser === "All" ? [...agentListings, ...ownerListings] : selectedUser === "Agent" ? agentListings : ownerListings;


  // Pagination Logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="top-listings-container">
      <div className="top-header-section">
        <h1>Properties</h1>
        <select className="top-listing-dropdown" value={selectedUser} onChange={(e) => {
          setSelectedUser(e.target.value);
          setCurrentPage(1); // Reset pagination when changing selection
        }}>
          <option value="All">All</option>
          <option value="Agent">Agent</option>
          <option value="Owner">Owner</option>
        </select>
      </div>

      <div className="top-listings-grid">
        {currentListings.map((listing) => (
          <div
              className="top-listing-card"
              onClick={() => {
                navigate(`/topListings/${listing.id}`, { state: { description: listing.description, title: listing.title, price: listing.price, location: listing.location, imageUrl: listing.imageUrl, propertyType: listing.propertyType, avaibility: listing.avaibility, contact: listing.contact, ownerName: listing.ownerName, agentName: listing.agentName } });
              }}
              style={{ cursor: "pointer" }}
            >
            <img src={listing.imageUrl} alt={listing.title} className="top-listing-image" />
            <div className="top-listing-details">
              <h2>{listing.title}</h2>
              <p>{listing.price}</p>
              <p>{listing.location}</p>
              <p className='top-lisitng-property-description'>{listing.description}</p>
              
            </div>
            <div className='top-listing-button-section'>
            <button className='top-listing-save-button'><img src='/bookmark.png' height={25} width={20}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="top-listing-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            className={`top-list-page-button ${currentPage === index + 1 ? 'active' : ''}`} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopListings;
