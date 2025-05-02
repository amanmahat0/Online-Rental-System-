import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
  FaRegBookmark,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import "./TopListings.css";

const TopListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const listingsPerPage = 6;

  // New state variables for filter modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFetch = async () => {
    try {
      // Construct query parameters dynamically
      const queryParams = new URLSearchParams();

      if (searchQuery) queryParams.append("location", searchQuery);
      if (propertyTypeFilter)
        queryParams.append("propertyType", propertyTypeFilter);
      if (filterStatus === "Available" || filterStatus === "Booked") {
        queryParams.append("status", filterStatus === "Available");
      }
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);

      // Fetch filtered properties from the backend
      const response = await fetch(
        `http://localhost:5000/api/properties/filter?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      console.log("Fetched Data: ", data.data);
      setListings(data.data); // Update the listings state with filtered data
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get unique property types for filter dropdowns
  const uniquePropertyTypes = [
    "Apartment",
    "House",
    "Room",
    "Commercial",
    "Office",
  ];

  // Pagination Logic
  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

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

  // Reset filters
  const resetFilters = () => {
    setLocationFilter("");
    setPropertyTypeFilter("");
    setFilterStatus("All");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // Apply filters
  const applyFilters = () => {
    handleFetch();
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div className="top-listings-container">
      <div className="top-header-section">
        <h1>Properties</h1>
        <div className="top-listing-search-btn-section">
          <input
            type="text"
            className="top-listing-search-input"
            placeholder="search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button
            className="top-listing-search-btn"
            onClick={() => {
              handleFetch();
            }}
          >
            Search
          </button>
        </div>
        <div className="top-listing-filters">
          <button
            className="top-listing-filter-btn"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="top-listing-filter-btn-icon" />
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="filter-modal-overlay">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <h2>Filter Properties</h2>
              <button
                className="close-filter-btn"
                onClick={() => setShowFilterModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="filter-modal-body">
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                  }}
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Booked</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Property Type</label>
                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                >
                  <option value="">All Property Types</option>
                  {uniquePropertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-range-inputs">
                  <input
                    type="text"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setMinPrice(value);
                    }}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  <span>to</span>
                  <input
                    type="text"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setMaxPrice(value);
                    }}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>

            <div className="filter-modal-footer">
              <button className="reset-filter-btn" onClick={resetFilters}>
                Reset
              </button>
              <button className="apply-filter-btn" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="top-listings-grid">
        {currentListings.map((listing) => (
          <div
            key={listing._id}
            className="top-listing-card"
            onClick={() => {
              navigate(`/topListings/${listing._id}`, {
                state: {
                  description: listing.description,
                  title: listing.title,
                  price: listing.pricePerMonth,
                  location: `${listing.location.area}, ${listing.location.city}`,
                  imageUrl: listing.images,
                  propertyType: listing.propertyType,
                  status: listing.status,
                  contact: listing.contact,
                },
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:5000${listing.images}`}
              alt={listing.title}
              className="top-listing-image"
            />
            <div className="top-listing-details">
              <div className="top-listing-button-section">
                <h2 className="top-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button
                  className="top-listing-save-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(listing.id);
                  }}
                  onMouseEnter={() => handleBookmarkHover(listing._id, true)}
                  onMouseLeave={() => handleBookmarkHover(listing._id, false)}
                >
                  {bookmarkedItems.has(listing._id) ||
                  hoveredItems.has(listing._id) ? (
                    <FaBookmark className="top-listing-bookmark-icons" />
                  ) : (
                    <FaRegBookmark className="top-listing-bookmark-icons" />
                  )}
                </button>
              </div>
              <p className="top-listing-details-card">
                <FaHome
                  width={20}
                  height={20}
                  className="top-lsitings-cards-icons"
                />
                {listing.propertyType}
              </p>
              <p className="top-listing-details-card">
                <FaMapMarkerAlt
                  width={20}
                  height={20}
                  className="top-lsitings-cards-icons"
                />
                {listing.location.area}, {listing.location.city}
              </p>
              <p className="top-listing-details-card">
                <FaRupeeSign
                  width={20}
                  height={20}
                  className="top-lsitings-cards-icons"
                />
                {listing.pricePerMonth} / month
              </p>

              <p className="top-listing-details-card">
                <FaInfoCircle
                  width={20}
                  height={20}
                  className="top-lsitings-cards-icons"
                />
                {listing.description.length > 100
                  ? listing.description.slice(0, 85) + "..."
                  : listing.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="toplisting-pagination">
        <button
          className="toplisting-pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`toplisting-pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="toplisting-pagination-button"
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

export default TopListings;
