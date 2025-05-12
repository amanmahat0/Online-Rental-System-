import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaBookmark,
} from "react-icons/fa";
import "./SavedProperties.css";

const SavedProperties = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 6;

  // const fetchSavedProperties = async () => {
  //   try {
  //     const storedSaveProperties = localStorage.getItem("saveProperties");
  //     if (!storedSaveProperties) {
  //       console.error("User not found in localStorage");
  //       return;
  //     }

  //     const savePropertiesData = JSON.parse(storedSaveProperties);

  //     if (!savePropertiesData || savePropertiesData.length === 0) {
  //       console.log("No saved properties found for the user");
  //       return;
  //     }
  //     console.log(
  //       "Saved Properties Data:",
  //       JSON.stringify({ propertiesId: savePropertiesData })
  //     );

  //     // Make the POST request to fetch saved properties
  //     const response = await fetch(
  //       "http://localhost:5000/api/properties/savedProperties",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ propertiesId: savePropertiesData }),
  //       }
  //     );

  //     // Handle the response
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch saved properties");
  //     }

  //     const data = await response.json();
  //     // console.log("Fetched saved properties:", data);
  //     setSavedProperties(data.data);
  //   } catch (error) {
  //     console.error("Error fetching saved properties:", error);
  //   }
  // };

  const fetchSavedProperties = async () => {
    try {
      // Retrieve user and role from localStorage
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");

      if (!storedUser || !storedRole) {
        console.error("User or role not found in localStorage");
        return;
      }

      const { id: userId } = JSON.parse(storedUser);

      // Prepare the request body
      const requestBody = {
        id: userId,
        role: storedRole, // Ensure role is in lowercase (e.g., "user", "agent")
      };

      console.log("Request Body:", requestBody);

      // Make the POST request to fetch saved properties
      const response = await fetch(
        "http://localhost:5000/api/properties/savedProperties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Handle the response
      if (!response.ok) {
        throw new Error("Failed to fetch saved properties");
      }

      const data = await response.json();
      console.log("Fetched saved properties:", data);

      // Update the saved properties state
      setSavedProperties(data.data);
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
    // Cleanup function to avoid memory lreaks
  }, []);

  const handleBookmarkClick = async (id) => {
    try {
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
      if (storedRole !== "User" && storedRole !== "Agent") {
        console.error("Invalid role or role is not 'user'");
        return;
      }

      // Make the POST request to save/unsave the property
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
        console.error("Error saving/unsaving property");
        return;
      }

      const data = await response.json();
      // console.log("Property save/unsave response:", data);

      // Update the saved properties state
      if (data.message === "Property unsaved successfully.") {
        setSavedProperties((prev) =>
          prev.filter((property) => property._id !== id)
        );
        const storedSaveProperties = localStorage.getItem("saveProperties");
        if (storedSaveProperties) {
          const savePropertiesData = JSON.parse(storedSaveProperties);
          const updatedSaveProperties = savePropertiesData.filter(
            (propertyId) => propertyId !== id
          );
          localStorage.setItem(
            "saveProperties",
            JSON.stringify(updatedSaveProperties)
          );
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving property:", error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredProperties = savedProperties.filter((property) => {
    if (filter === "All") return true;
    if (filter === "Available") return property.availabilityStatus === true;
    if (filter === "Booked") return property.availabilityStatus === false;
    return false;
  });

  const totalPages = Math.ceil(filteredProperties.length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const currentListings = filteredProperties.slice(
    startIndex,
    startIndex + listingsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="saved-properties-listings-container">
      <div className="saved-properties-header-section">
        <h1>Saved Properties</h1>
      </div>

      {/* Filter Buttons */}
      <div className="saved-properties-filter-buttons">
        {["All", "Available", "Booked"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`saved-properties-filter-button ${
              filter === status ? "active" : ""
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="saved-properties-listings-grid">
        {currentListings.map((listing) => (
          <div
            key={listing._id}
            className="saved-properties-listing-card"
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
                  owner: listing.owner.name,
                },
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="saved-properties-image-container">
              <img
                src={`http://localhost:5000${listing.images}`}
                alt={listing.title}
                className="saved-properties-listing-image"
              />
              <div
                className={`saved-properties-status-badge ${
                  listing.availabilityStatus ? "available" : "booked"
                }`}
              >
                {listing.availabilityStatus ? "Available" : "Booked"}
              </div>
            </div>
            <div className="saved-properties-listing-details">
              <div className="saved-properties-listing-button-section">
                <h2 className="saved-properties-lsiting-details-card-title">
                  {listing.title}
                </h2>
                <button
                  className="saved-properties-listing-save-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(listing._id);
                  }}
                >
                  <FaBookmark className="saved-properties-bookmark-icons" />
                </button>
              </div>
              <p className="saved-properties-listing-details-card">
                <FaHome className="saved-properties-lsitings-cards-icons" />
                {listing.propertyType}
              </p>
              <p className="saved-properties-listing-details-card">
                <FaMapMarkerAlt className="saved-properties-lsitings-cards-icons" />
                `${listing.location.area} ${listing.location.city}`
              </p>
              <p className="saved-properties-listing-details-card">
                <FaRupeeSign className="saved-properties-lsitings-cards-icons" />
                {listing.pricePerMonth} / month
              </p>
              <p className="saved-properties-listing-details-card">
                <FaInfoCircle className="saved-properties-lsitings-cards-icons" />
                {listing.description.length > 100
                  ? listing.description.slice(0, 85) + "..."
                  : listing.description}
              </p>
              <button
                className="saved-properties-listing-book-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/topListings/${listing._id}`, {
                    state: {
                      propertyId: listing._id,
                      title: listing.title,
                      price: listing.pricePerMonth,
                      location: `${listing.location.area} ${listing.location.city}`,
                      imageUrl: listing.images,
                      propertyType: listing.propertyType,
                      status: listing.status,
                      contact: listing.contactNumber,
                    },
                  });
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="saved-properties-pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="saved-properties-list-page-button"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`saved-properties-list-page-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="saved-properties-list-page-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SavedProperties;
