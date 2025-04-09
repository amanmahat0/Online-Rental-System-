import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import "./OfficeSpaces.css";

const OfficeSpaces = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const listingsPerPage = 6;

  const fetchListingsOfOffice = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/type/Office"
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
    fetchListingsOfOffice();
    // Cleanup function to avoid memory leaks
  }, []);

  // Only show the first 6 listings
  const currentListings = listings.slice(0, listingsPerPage);

  const handleBookmarkClick = (id) => {
    setBookmarkedItems((prev) => {
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
    setHoveredItems((prev) => {
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
    <div className="office-spaces-listings-container">
      <div className="office-spaces-header-section">
        <h1>Office Spaces</h1>
      </div>

      <div className="office-spaces-listings-grid">
        {currentListings.map((listing) => (
          <div
            key={listing._id}
            className="office-spaces-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing._id}`, {
                state: {
                  description: listing.description,
                  title: listing.title,
                  price: listing.pricePerMonth,
                  location: `${listing.location.city} ${listing.location.area}`,
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
              className="office-spaces-listing-image"
            />
            <div className="office-spaces-listing-details">
              <div className="office-spaces-listing-button-section">
                <h2 className="office-spaces-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button
                  className="office-spaces-listing-save-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(listing._id);
                  }}
                  onMouseEnter={() => handleBookmarkHover(listing._id, true)}
                  onMouseLeave={() => handleBookmarkHover(listing._id, false)}
                >
                  {bookmarkedItems.has(listing._id) ||
                  hoveredItems.has(listing._id) ? (
                    <FaBookmark className="office-spaces-listing-bookmark-icons" />
                  ) : (
                    <FaRegBookmark className="office-spaces-listing-bookmark-icons" />
                  )}
                </button>
              </div>
              <p className="office-spaces-listing-details-card">
                <FaHome
                  width={20}
                  height={20}
                  className="office-spaces-lsitings-cards-icons"
                />
                {listing.propertyType}
              </p>
              <p className="office-spaces-listing-details-card">
                <FaMapMarkerAlt
                  width={20}
                  height={20}
                  className="office-spaces-lsitings-cards-icons"
                />
                {`${listing.location.city} ${listing.location.area}`}
              </p>
              <p className="office-spaces-listing-details-card">
                <FaRupeeSign
                  width={20}
                  height={20}
                  className="office-spaces-lsitings-cards-icons"
                />
                {listing.pricePerMonth} / month
              </p>

              {/* <p className='top-listing-details-card'><FaInfoCircle width={20} height={20} className='top-lsitings-cards-icons'/>{listing.description}</p> */}
              <p className="office-spaces-listing-details-card">
                <FaInfoCircle
                  width={20}
                  height={20}
                  className="office-spaces-lsitings-cards-icons"
                />
                {listing.description.length > 100
                  ? listing.description.slice(0, 85) + "..."
                  : listing.description}
              </p>
            </div>
            <p className="office-spaces-listing-details-card">
              <FaHome
                width={20}
                height={20}
                className="office-spaces-lsitings-cards-icons"
              />
              {listing.propertyType}
            </p>
            <p className="office-spaces-listing-details-card">
              <FaMapMarkerAlt
                width={20}
                height={20}
                className="office-spaces-lsitings-cards-icons"
              />
              `${listing.location.city} ${listing.location.area}`
            </p>
            <p className="office-spaces-listing-details-card">
              <FaRupeeSign
                width={20}
                height={20}
                className="office-spaces-lsitings-cards-icons"
              />
              {listing.pricePerMonth} / month
            </p>

            {/* <p className='top-listing-details-card'><FaInfoCircle width={20} height={20} className='top-lsitings-cards-icons'/>{listing.description}</p> */}
            <p className="office-spaces-listing-details-card">
              <FaInfoCircle
                width={20}
                height={20}
                className="office-spaces-lsitings-cards-icons"
              />
              {listing.description.length > 100
                ? listing.description.slice(0, 85) + "..."
                : listing.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeSpaces;
