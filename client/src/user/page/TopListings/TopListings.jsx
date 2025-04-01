import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopListings.css';

const agentListings = [
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
const ownerListings = [ 
  { 
    id: 11, 
    title: 'Charming Suburban Home', 
    propertyType: 'House', 
    price: '$1800/month', 
    location: 'Seattle', 
    imageUrl: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', 
    description: 'A cozy home with a beautiful garden and quiet neighborhood.', 
    status: 'Available', 
    contact: '9001122334' 
  },
  { 
    id: 12, 
    title: 'Luxury Condo with Lake View', 
    propertyType: 'Condo', 
    price: '$3200/month', 
    location: 'Toronto', 
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', 
    description: 'A high-end condo with breathtaking views of the lake.', 
    status: 'Booked', 
    contact: '9112233445' 
  },
  { 
    id: 13, 
    title: 'Rustic Mountain Cabin', 
    propertyType: 'Cabin', 
    price: '$1700/month', 
    location: 'Aspen', 
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg', 
    description: 'A charming wooden cabin perfect for nature lovers.', 
    status: 'Available', 
    contact: '9223344556' 
  },
  { 
    id: 14, 
    title: 'Modern Smart Home', 
    propertyType: 'House', 
    price: '$4500/month', 
    location: 'San Diego', 
    imageUrl: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg', 
    description: 'A fully automated smart home with state-of-the-art security.', 
    status: 'Available', 
    contact: '9334455667' 
  },
  { 
    id: 15, 
    title: 'Luxury Lakehouse', 
    propertyType: 'Villa', 
    price: '$8000/month', 
    location: 'Lake Tahoe', 
    imageUrl: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg', 
    description: 'A magnificent villa with private lake access.', 
    status: 'Booked', 
    contact: '9445566778' 
  },
  { 
    id: 16, 
    title: 'Downtown Office Space', 
    propertyType: 'Commercial', 
    price: '$6000/month', 
    location: 'New York City', 
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', 
    description: 'A spacious office space in a prime business district.', 
    status: 'Available', 
    contact: '9556677889' 
  },
  { 
    id: 17, 
    title: 'Seaside Villa with Infinity Pool', 
    propertyType: 'Villa', 
    price: '$10000/month', 
    location: 'Malibu', 
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 
    description: 'An elegant villa with stunning ocean views and a large pool.', 
    status: 'Booked', 
    contact: '9667788990' 
  },
  { 
    id: 18, 
    title: 'Minimalist Loft', 
    propertyType: 'Loft', 
    price: '$2700/month', 
    location: 'Brooklyn', 
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 
    description: 'A sleek, open-space loft with modern design.', 
    status: 'Available', 
    contact: '9778899001' 
  },
  { 
    id: 19, 
    title: 'Historic Brownstone', 
    propertyType: 'Townhouse', 
    price: '$5000/month', 
    location: 'Boston', 
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
    description: 'A classic brownstone with beautiful architectural details.', 
    status: 'Available', 
    contact: '9889900112' 
  },
  { 
    id: 20, 
    title: 'Modern Glass House', 
    propertyType: 'House', 
    price: '$9000/month', 
    location: 'Los Angeles', 
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg', 
    description: 'A futuristic home with floor-to-ceiling glass walls.', 
    status: 'Booked', 
    contact: '9990011223' 
  }
];

const TopListings = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("None");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 9;

  let listings = [...agentListings, ...ownerListings];

  // Apply status filter
  if (filterStatus !== "All") {
    listings = listings.filter(listing => listing.status === filterStatus);
  }

  // Apply sorting
  if (sortOrder === "High to Low") {
    listings.sort((a, b) => parseFloat(b.price.replace(/\D/g, '')) - parseFloat(a.price.replace(/\D/g, '')));
  } else if (sortOrder === "Low to High") {
    listings.sort((a, b) => parseFloat(a.price.replace(/\D/g, '')) - parseFloat(b.price.replace(/\D/g, '')));
  }

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
        <div className="top-listing-filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="None">Sort By</option>
            <option value="High to Low">High Price to Low Price</option>
            <option value="Low to High">Low Price to High Price</option>
          </select>
        </div>
      </div>

      <div className="top-listings-grid">
        {currentListings.map((listing) => (
          <div
            className="top-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing.id}`, { state: { description: listing.description, title: listing.title, price: listing.price, location: listing.location, imageUrl: listing.imageUrl, propertyType: listing.propertyType, status: listing.status, contact: listing.contact } });
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={listing.imageUrl} alt={listing.title} className="top-listing-image" />
            <div className="top-listing-details">
              <h2>{listing.title}</h2>
              <p>{listing.price}</p>
              <p>{listing.location}</p>
              <p className='top-listing-property-description'>{listing.description}</p>
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
