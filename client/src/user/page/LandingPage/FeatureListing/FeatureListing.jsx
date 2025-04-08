import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
} from "react-icons/fa";
import "./FeatureListing.css";

// const ownerListings = [
//   // ... (same data as before)
// ];

const FeatureListing = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const listingsPerPage = 6;

  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data.data);
      // console.log(data.data.slice(0, 6));
      setListings(data.data.slice(0, 6)); // Assuming the backend returns listings in `data.data`
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
    // Cleanup function to avoid memory leaks
  }, []);

  // Only show the first 6 listings
  // const currentListings = listings.slice(0, listingsPerPage);

  return (
    <div className="feature-listings-container">
      <div className="feature-header-section">
        <h1>Feature Listing</h1>
      </div>
      <div className="feature-listings-grid">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="feature-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing._id}`, {
                state: {
                  description: listing.description,
                  title: listing.title,
                  price: listing.pricePerMonth,
                  location: `${listing.location.area} ${listing.location.city}`,
                  imageUrl: listing.images,
                  propertyType: listing.propertyType,
                  status: listing.availabilityStatus,
                  contact: listing.contactNumber,
                },
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:5000${listing.images}`}
              alt={listing.title}
              className="feature-listing-image"
            />
            <div className="feature-listing-details">
              <div className="feature-listing-button-section">
                <h2 className="feature-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button className="feature-listing-save-button">
                  <FaBookmark className="feature-listing-bookmark-icons" />
                </button>
              </div>
              <p className="feature-listing-details-card">
                <FaHome
                  width={20}
                  height={20}
                  className="feature-lsitings-cards-icons"
                />
                {listing.propertyType}
              </p>
              <p className="feature-listing-details-card">
                <FaMapMarkerAlt
                  width={20}
                  height={20}
                  className="feature-lsitings-cards-icons"
                />
                {`${listing.location.area} ${listing.location.city}`}
              </p>
              <p className="feature-listing-details-card">
                <FaRupeeSign
                  width={20}
                  height={20}
                  className="feature-lsitings-cards-icons"
                />
                {listing.pricePerMonth} / month
              </p>

              {/* <p className='top-listing-details-card'><FaInfoCircle width={20} height={20} className='top-lsitings-cards-icons'/>{listing.description}</p> */}
              <p className="feature-listing-details-card">
                <FaInfoCircle
                  width={20}
                  height={20}
                  className="feature-lsitings-cards-icons"
                />
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
