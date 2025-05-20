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
      console.log("booking request ", data.data);
      setListings((prevListings) => [
        ...prevListings,
        ...data.data.filter(
          (newListing) =>
            !prevListings.some((listing) => listing._id === newListing._id)
        ),
      ]);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
    }
  };

  const fetchAcceptedCustomer = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/accepted-customer/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch accepted customer data");
      }
      const data = await response.json();
      console.log("accepted customer ", data.data);
      if (data.data && data.data.length > 0) {
        setListings((prevListings) => [
          ...prevListings,
          ...data.data.filter(
            (newListing) =>
              !prevListings.some((listing) => listing._id === newListing._id)
          ),
        ]);
      }
    } catch (error) {
      console.error("Error fetching accepted customer data:", error);
    }
  };

  useEffect(() => {
    fetchBookingRequest();
    fetchAcceptedCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Updated listings:", listings);
  }, [listings]);

  const cancelBooking = async (propertyId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await fetch(
        "http://localhost:5000/api/properties/cancel-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId,
            customerId: userId,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        // alert("Booking canceled successfully.");
        // Update the listings state to remove the canceled booking
        const updatedListings = listings.filter(
          (listing) => listing._id !== propertyId
        );
        setListings(updatedListings);

        // Adjust pagination if necessary
        if (currentPage > Math.ceil(updatedListings.length / listingsPerPage)) {
          setCurrentPage((prev) => Math.max(1, prev - 1));
        }
      } else {
        alert(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("An error occurred while canceling the booking. Please try again.");
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
                  availabilityStatus: listing.availabilityStatus,
                  contact: listing.contactNumber,
                  owner: listing.owner.name,
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
                  listing.acceptedCustomerId ? "approved" : "pending"
                }`}
              >
                {listing.acceptedCustomerId ? "Approved" : "Pending"}
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
              {listing.acceptedCustomerId &&
              listing.acceptedCustomerId.customer ===
                JSON.parse(localStorage.getItem("user")).id ? (
                listing.acceptedCustomerId.paid ? (
                  <></>
                ) : (
                  <button
                    className="mybooking-cancel-booking-button pay-now"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/payment", {
                        state: {
                          propertyDetails: {
                            id: listing._id,
                            title: listing.title,
                            pricePerMonth: listing.pricePerMonth,
                            images: listing.images,
                            location: `${listing.location.area}, ${listing.location.city}`,
                            propertyType: listing.propertyType,
                            owner: listing.owner._id,
                            role: listing.role,
                          },
                        },
                      });
                      console.log("Pay Now clicked for listing ID:", listing);
                    }}
                  >
                    Pay Now
                  </button>
                )
              ) : (
                <button
                  className="mybooking-cancel-booking-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelBooking(listing._id);
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
