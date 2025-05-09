import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import "./Rooms.css";

const Rooms = () => {
  const navigate = useNavigate();
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListingsOfRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://localhost:5000/api/properties/type/Room"
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setListings(data.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError("Failed to load room listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingsOfRoom();

    // Cleanup function to avoid memory leaks
    return () => {
      // Any cleanup code would go here
    };
  }, []);

  const handleBookmarkClick = async (id) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("User not found in localStorage");
      return;
    }

    const storedUserId = JSON.parse(storedUser).id; // Parse only if it exists
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
          "savedProperties",
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
    <div className="rooms-listings-container">
      <div className="rooms-header-section">
        <h1>Rooms</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Loading rooms...</div>
      ) : (
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
                    availabilityStatus: listing.availabilityStatus,
                    contact: listing.contactNumber,
                  },
                });
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="rooms-listing-image-container">
                <img
                  src={`http://localhost:5000/${listing.images}`}
                  alt={listing.title}
                  className="rooms-listing-image"
                />
                <div
                  className={`rooms-status-badge ${
                    listing.availabilityStatus ? "available" : "booked"
                  }`}
                >
                  {listing.availabilityStatus ? "Available" : "Booked"}
                </div>
              </div>

              <div className="rooms-listing-details">
                <div className="rooms-listing-button-section">
                  <h2 className="rooms-lsiting-details-card-title">
                    {listing.title}
                  </h2>
                  <button
                    className="rooms-listing-save-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(listing._id);
                    }}
                    onMouseEnter={() => handleBookmarkHover(listing._id, true)}
                    onMouseLeave={() => handleBookmarkHover(listing._id, false)}
                  >
                    {bookmarkedItems.has(listing._id) ||
                    hoveredItems.has(listing._id) ? (
                      <FaBookmark className="rooms-listing-bookmark-icons" />
                    ) : (
                      <FaRegBookmark className="rooms-listing-bookmark-icons" />
                    )}
                  </button>
                </div>
                <p className="rooms-listing-details-card">
                  <FaHome className="rooms-lsitings-cards-icons" />
                  {listing.propertyType}
                </p>
                <p className="rooms-listing-details-card">
                  <FaMapMarkerAlt className="rooms-lsitings-cards-icons" />
                  {`${listing.location.area} ${listing.location.city}`}
                </p>
                <p className="rooms-listing-details-card">
                  <FaRupeeSign className="rooms-lsitings-cards-icons" />
                  {listing.pricePerMonth} / month
                </p>

                <p className="rooms-listing-details-card">
                  <FaInfoCircle className="rooms-lsitings-cards-icons" />
                  {listing.description.length > 100
                    ? listing.description.slice(0, 85) + "..."
                    : listing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
