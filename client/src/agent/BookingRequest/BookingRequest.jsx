import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaFilter, FaTimesCircle } from "react-icons/fa";
import "./BookingRequest.css";

const BookingRequest = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [dateSort, setDateSort] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchPropertyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/owner/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }
      const data = await response.json();
      console.log(data.data);
      setBookingRequests(data.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    fetchPropertyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(bookingRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handleRequestAction = async (requestId, customerId, action) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/approveOrReject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            propertyId: requestId,
            customerId: customerId,
            action: action,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to handle request action");
      }
      const data = await response.json();
      console.log(data);
      setBookingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error handling request action:", error);
    }
  };

  const handleSort = (type, value) => {
    if (value === "all") {
      setDateSort(null);
      setPriceSort(null);
    } else {
      if (type === "date") {
        setDateSort(value);
      } else if (type === "price") {
        setPriceSort(value);
      }
    }

    let sortedRequests = [...bookingRequests];

    // Apply date sorting if selected
    if (dateSort) {
      sortedRequests.sort((a, b) => {
        if (dateSort === "latest") {
          return new Date(b._id) - new Date(a._id);
        } else if (dateSort === "oldest") {
          return new Date(a._id) - new Date(b._id);
        }
        return 0;
      });
    }

    // Apply price sorting if selected
    if (priceSort) {
      sortedRequests.sort((a, b) => {
        if (priceSort === "high") {
          return b.property.pricePerMonth - a.property.pricePerMonth;
        } else if (priceSort === "low") {
          return a.property.pricePerMonth - b.property.pricePerMonth;
        }
        return 0;
      });
    }

    setBookingRequests(sortedRequests);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="booking-request-container">
      <div className="booking-request-header-section">
        <h1>Booking Requests</h1>
      </div>

      <div className="booking-request-grid">
        {currentItems.map((property) =>
          property.customerId?.map((customerId) => (
            <div key={property._id} className="booking-request-card">
              <div className="booking-request-image-container">
                <img
                  src={`http://localhost:5000${property.images}`}
                  alt={property.title}
                  className="booking-request-image"
                />
                <div
                  className={`booking-request-properties-status-badge ${
                    property.availabilityStatus ? "available" : "booked"
                  }`}
                >
                  {property.availabilityStatus ? "Available" : "Booked"}
                </div>
              </div>
              <div className="booking-request-details">
                <h2 className="booking-request-details-card-title">
                  {property.title}
                </h2>

                <div className="booking-request-customer">
                  <h3>Requested by:</h3>
                  <p>{customerId.customer.name}</p>
                  <p>{customerId.customer.email}</p>
                </div>
                <div className="booking-request-actions">
                  <button
                    className="booking-request-approve"
                    onClick={() =>
                      handleRequestAction(
                        property._id,
                        customerId.customer._id,
                        "approve"
                      )
                    }
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="booking-request-reject"
                    onClick={() =>
                      handleRequestAction(
                        property._id,
                        customerId.customer._id,
                        "reject"
                      )
                    }
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {bookingRequests.length === 0 && (
        <div className="booking-request-empty">
          <h3>No booking requests</h3>
          <p>You don't have any pending booking requests at the moment.</p>
        </div>
      )}

      {bookingRequests.length > 0 && (
        <div className="booking-request-pagination">
          <button
            className="booking-request-pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`booking-request-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="booking-request-pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingRequest;
