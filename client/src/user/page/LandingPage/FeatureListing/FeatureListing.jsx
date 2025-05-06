import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import "./FeatureListing.css";

const FeatureListing = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [hoveredItems, setHoveredItems] = useState(new Set());

  const listingsPerPage = 6;

  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setListings(data.data.slice(0, 6)); // Assuming the backend returns listings in `data.data`
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
    // Fetch saved properties from API for User or Agent and set bookmarks
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedRole && (storedRole === "User" || storedRole === "Agent")) {
      const { id: userId } = JSON.parse(storedUser);
      fetch("http://localhost:5000/api/properties/savedProperties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: storedRole }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data) {
            setBookmarkedItems(new Set(data.data.map((p) => p._id)));
          }
        })
        .catch(() => {});
    }
    // Cleanup function to avoid memory leaks
  }, []);

  const handleBookmarkClick = async (id) => {
    console.log("Bookmark clicked for ID:", id);
    // Update local state
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    // Handle backend saving
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("User not found in localStorage");
      return;
    }

    const storedUserId = JSON.parse(storedUser).id;
    const sendedData = {
      userId: storedUserId,
      propertyId: id,
    };

    const storedRole = localStorage.getItem("role");
    if (storedRole === "User" || storedRole === "Agent") {
      try {
        const response = await fetch(
          `http://localhost:5000/api/${storedRole.toLowerCase()}/saveProperties`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendedData),
          }
        );
        if (!response.ok) {
          console.error("Error saving property");
          return;
        }
        const data = await response.json();
        localStorage.setItem(
          "saveProperties",
          JSON.stringify(data.data.saveProperties)
        );
      } catch (error) {
        console.error("Error saving property:", error);
      }
    }
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
                  images: listing.images,
                  propertyType: listing.propertyType,
                  status: listing.availabilityStatus,
                  contact: listing.contactNumber,
                },
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-listing-image-container">
              <img
                src={`http://localhost:5000${listing.images}`}
                alt={listing.title}
                className="feature-listing-image"
              />
              <div className={`feature-listing-properties-status-badge ${listing.availabilityStatus ? 'available' : 'booked'}`}>
                {listing.availabilityStatus ? 'Available' : 'Booked'}
              </div>
            </div>
            <div className="feature-listing-details">
              <div className="feature-listing-button-section">
                <h2 className="feature-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button
                  className="feature-listing-save-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(listing._id);
                  }}
                  onMouseEnter={() => handleBookmarkHover(listing._id, true)}
                  onMouseLeave={() => handleBookmarkHover(listing._id, false)}
                >
                  {bookmarkedItems.has(listing._id) ||
                  hoveredItems.has(listing._id) ? (
                    <FaBookmark className="feature-listing-bookmark-icons" />
                  ) : (
                    <FaRegBookmark className="feature-listing-bookmark-icons" />
                  )}
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
