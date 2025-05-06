import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
} from "react-icons/fa";
import "./MyBooking.css";

const MyBooking = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 6;

  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const fetchBookingRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/request/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch booking requests");
      }
      const data = await response.json();
      console.log(data);
      setListings(data.data);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
    }
  };
  useEffect(() => {
    fetchBookingRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelBooking = (id) => {
    const updated = listings.filter((listing) => listing._id !== id);
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
            onClick={() =>
              navigate(`/topListings/${listing._id}`, {
                state: {
                  description: listing.description,
                  title: listing.title,
                  price: listing.pricePerMonth,
                  location: `${listing.location.area}, ${listing.location.city}`,
                  images: listing.images,
                  propertyType: listing.propertyType,
                  status: listing.status,
                  contact: listing.contact,
                },
              })
            }
            style={{ cursor: "pointer" }}
            key={listing._id}
          >
            <div className="mybooking-image-container">
              <img
                src={`http://localhost:5000${listing.images}`}
                alt={listing.title}
                className="mybooking-listing-image"
              />
              <div
                className={`mybooking-status-badge ${
                  listing.availabilityStatus ? "approved" : "pending"
                }`}
              >
                {listing.availabilityStatus ? "Approved" : "Pending"}
              </div>
            </div>

            <div className="mybooking-listing-details">
              <div className="mybooking-listing-button-section">
                <h2 className="mybooking-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button className="mybooking-listing-save-button">
                  <FaBookmark className="mybooking-bookmark-icons" />
                </button>
              </div>
              <p className="mybooking-listing-details-card">
                <FaHome className="mybooking-lsitings-cards-icons" />
                {listing.propertyType}
              </p>
              <p className="mybooking-listing-details-card">
                <FaMapMarkerAlt className="mybooking-lsitings-cards-icons" />
                {`${listing.location.area} ${listing.location.city}`}
              </p>
              <p className="mybooking-listing-details-card">
                <FaRupeeSign className="mybooking-lsitings-cards-icons" />
                {listing.pricePerMonth} / month
              </p>
              <p className="mybooking-listing-details-card">
                <FaInfoCircle className="mybooking-lsitings-cards-icons" />
                {listing.description.length > 100
                  ? listing.description.slice(0, 85) + "..."
                  : listing.description}
              </p>
              {listing.acceptedCustomerId ===
              JSON.parse(localStorage.getItem("user")).id ? (
                <button
                  className="mybooking-cancel-booking-button pay-now"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add your pay now logic here
                  }}
                >
                  Pay Now
                </button>
              ) : (
                <button
                  className="mybooking-cancel-booking-button"
                  onClick={(e) => {
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
            className={`mybooking-pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="mybooking-pagination-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBooking;
