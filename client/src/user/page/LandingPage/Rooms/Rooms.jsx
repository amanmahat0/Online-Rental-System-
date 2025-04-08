import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
} from "react-icons/fa";
import "./Rooms.css";

const Rooms = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const listingsPerPage = 6;

  const fetchListingsOfRoom = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/type/Room"
      );
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
    fetchListingsOfRoom();
    // Cleanup function to avoid memory leaks
  }, []);

  // Only show the first 6 listings
  const currentListings = listings.slice(0, listingsPerPage);

  return (
    <div className="rooms-listings-container">
      <div className="rooms-header-section">
        <h1>Rooms</h1>
      </div>

      <div className="rooms-listings-grid">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="rooms-listing-card"
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
              src={listing.imageUrl}
              alt={listing.title}
              className="rooms-listing-image"
            />
            <div className="rooms-listing-details">
              <div className="rooms-listing-button-section">
                <h2 className="rooms-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button className="rooms-listing-save-button">
                  <FaBookmark className="rooms-listing-bookmark-icons" />
                </button>
              </div>
              <p className="rooms-listing-details-card">
                <FaHome
                  width={20}
                  height={20}
                  className="rooms-lsitings-cards-icons"
                />
                {listing.propertyType}
              </p>
              <p className="rooms-listing-details-card">
                <FaMapMarkerAlt
                  width={20}
                  height={20}
                  className="rooms-lsitings-cards-icons"
                />
                {`${listing.location.area} ${listing.location.city}`}
              </p>
              <p className="rooms-listing-details-card">
                <FaRupeeSign
                  width={20}
                  height={20}
                  className="rooms-lsitings-cards-icons"
                />
                {listing.pricePerMonth} / month
              </p>

              {/* <p className='top-listing-details-card'><FaInfoCircle width={20} height={20} className='top-lsitings-cards-icons'/>{listing.description}</p> */}
              <p className="rooms-listing-details-card">
                <FaInfoCircle
                  width={20}
                  height={20}
                  className="rooms-lsitings-cards-icons"
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

export default Rooms;
