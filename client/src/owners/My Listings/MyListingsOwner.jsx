import React, { useState, useEffect } from "react";
import "./MyListingsOwner.css";
import {
  FaHome,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaPhone,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaCheck, // Added for tick mark
} from "react-icons/fa";

const MyListingsOwner = () => {
  // Sample data for property listings
  const [listings, setListings] = useState([]);

  const fetchOwnerProperties = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedRole = localStorage.getItem("role");

      console.log(`${storedRole} ${storedUser.id}`);
      const response = await fetch(
        `http://localhost:5000/api/properties/${storedRole}/${storedUser.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties data");
      }
      const data = await response.json();
      console.log(data);
      setListings(data.data);
    } catch (error) {
      console.error("Error fetching properties data:", error);
    }
  };

  useEffect(() => {
    fetchOwnerProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  // const [filteredListings, setFilteredListings] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "Apartment",
    area: "",
    city: "",
    price: "",
    description: "",
    isAvailable: true,
    contactNo: "",
    image: null,
    imagePreview: null,
  });

  // Apply filters whenever listings or activeFilter changes
  // useEffect(() => {
  //   if (activeFilter === "all") {
  //     setFilteredListings(listings);
  //   } else if (activeFilter === "available") {
  //     setFilteredListings(listings.filter((listing) => listing.isAvailable));
  //   } else if (activeFilter === "booked") {
  //     setFilteredListings(listings.filter((listing) => !listing.isAvailable));
  //   }
  // }, [listings, activeFilter]);

  const propertyTypes = ["Apartment", "House", "Room", "Commercial", "Office"];

  const handleEdit = (id) => {
    const listing = listings.find((item) => item._id === id);
    if (listing) {
      setFormData({
        title: listing.title,
        propertyType: listing.propertyType,
        area: listing.location.area,
        city: listing.location.city,
        price: listing.pricePerMonth,
        description: listing.description,
        isAvailable: listing.isAvailable,
        contactNo: listing.contactNumber,
        image: `http://localhost:5000${listing.images}`,
        imagePreview: `http://localhost:5000${listing.images}`,
      });
      setEditingId(id);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error while deleting property.");
      return;
    }
    const data = await response.json();
    console.log(data);
    setListings(listings.filter((listing) => listing._id !== id));
    // alert("Property deleted successfully.");
  };

  const handleAddProperty = () => {
    setFormData({
      title: "",
      propertyType: "Apartment",
      area: "",
      city: "",
      price: "",
      description: "",
      isAvailable: true,
      contactNo: "",
      image: null,
      imagePreview: null,
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files[0]) {
      setFormData({
        ...formData,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else if (name === "price") {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else if (name === "contactNo") {
      // Only allow up to 10 digits
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image for the property.");
      return;
    }
    if (
      !formData.title ||
      !formData.propertyType ||
      !formData.area ||
      !formData.city ||
      !formData.price ||
      !formData.description ||
      !formData.contactNo
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedRole = localStorage.getItem("role");

      const formDataToSend = new FormData();
      formDataToSend.append("owner", storedUser.id);
      formDataToSend.append("role", storedRole);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("propertyType", formData.propertyType);
      formDataToSend.append("location[city]", formData.city);
      formDataToSend.append("location[area]", formData.area);
      formDataToSend.append("pricePerMonth", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("availabilityStatus", formData.isAvailable);
      formDataToSend.append("contactNumber", formData.contactNo);

      if (formData.image) {
        formDataToSend.append("propertyImage", formData.image);
      }
      let response;
      if (editingId) {
        response = await fetch(
          `http://localhost:5000/api/properties/${editingId}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/properties", {
          method: "POST",
          body: formDataToSend,
        });
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to add property");
      }
      if (editingId) {
        setListings(
          listings.map((listing) =>
            listing._id === editingId ? data.data : listing
          )
        );
      } else {
        setListings([...listings, data.data]);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({
        title: "",
        propertyType: "Apartment",
        area: "",
        city: "",
        price: "",
        description: "",
        isAvailable: true,
        contactNo: "",
        image: null,
        imagePreview: null,
      });
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="owner-listings">
      <div className="owner-listings-header">
        <h2>My Properties</h2>
        <p>Manage your property listings</p>

        <div className="owner-listings-controls">
          <button
            className="owner-add-property-btn"
            onClick={handleAddProperty}
          >
            + Add New Property
          </button>

          <div className="owner-filter-controls">
            <button
              className={`owner-filter-btn ${
                activeFilter === "all" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`owner-filter-btn ${
                activeFilter === "available" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("available")}
            >
              Available
            </button>
            <button
              className={`owner-filter-btn ${
                activeFilter === "booked" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("booked")}
            >
              Booked
            </button>
          </div>
        </div>
      </div>

      <div className="owner-listings-container">
        {listings?.length > 0 ? (
          listings.map((listing, index) => (
            <div
              className="owner-property-card"
              key={listing._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="owner-property-image">
                <img
                  src={`http://localhost:5000${listing.images}`}
                  alt={listing.title}
                />
                <div
                  className={`owner-availability-badge ${
                    listing.availabilityStatus ? "available" : "unavailable"
                  }`}
                >
                  {listing.availabilityStatus ? "Available" : "Rented"}
                </div>
              </div>

              <div className="owner-property-details">
                <h3 className="owner-property-title">{listing.title}</h3>

                <div className="owner-property-type">
                  <FaHome className="listing-owner-icon" />
                  <span>{listing.propertyType}</span>
                </div>

                <div className="owner-property-location">
                  <FaMapMarkerAlt className="listing-owner-icon" />
                  <span>
                    {listing.location.area}, {listing.location.city}
                  </span>
                </div>

                <div className="owner-property-price">
                  <FaRupeeSign className="listing-owner-icon" />
                  <span>
                    Rs. {listing.pricePerMonth.toLocaleString()}/month
                  </span>
                </div>

                <div className="owner-property-description">
                  <FaInfoCircle className="listing-owner-icon" />
                  <span>{typeof listing.description === "string" &&
                    listing.description.length > 100
                      ? `${listing.description.slice(0, 50)}...`
                      : listing.description}</span>
                </div>

                <div className="owner-property-contact">
                  <FaPhone className="listing-owner-icon" />
                  <span>{listing.contactNumber}</span>
                </div>
              </div>

              <div className="owner-property-actions">
                <button
                  className="owner-edit-btn"
                  onClick={() => handleEdit(listing._id)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="owner-delete-btn"
                  onClick={() => handleDelete(listing._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="owner-no-listings">
            <p>No properties found matching your filter criteria.</p>
            <button
              className="owner-add-property-btn"
              onClick={handleAddProperty}
            >
              Add New Property
            </button>
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      {showModal && (
        <div className="owner-modal-overlay">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>{editingId ? "Edit Property" : "Add New Property"}</h3>
              <button
                className="owner-modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="owner-property-form"
            >
              <div className="owner-form-image-upload">
                <div
                  className="owner-image-preview"
                  style={{
                    backgroundImage: formData.imagePreview
                      ? `url(${formData.imagePreview})`
                      : "none",
                  }}
                >
                  {!formData.imagePreview && (
                    <div className="owner-no-image">
                      <FaImage />
                      <p>Upload Property Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="propertyImage"
                    id="property-image"
                    accept="image/*"
                    onChange={handleFormChange}
                    className="owner-image-input"
                  />
                  <label
                    htmlFor="property-image"
                    className="owner-upload-image-btn"
                  >
                    Choose Image
                  </label>
                </div>
              </div>

              <div className="owner-form-group">
                <label htmlFor="title">Property Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="owner-form-row">
                <div className="owner-form-group">
                  <label htmlFor="propertyType">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleFormChange}
                    required
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="price">Price (Rs./month)</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="15000"
                    required
                  />
                </div>
              </div>

              <div className="owner-form-row">
                <div className="owner-form-group">
                  <label htmlFor="area">Area</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="owner-form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="owner-form-group">
                <label htmlFor="contactNo">Contact Number</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleFormChange}
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    style={{ paddingRight: "2rem" }}
                  />
                  {formData.contactNo.length === 10 && (
                    <FaCheck
                      style={{
                        position: "absolute",
                        right: "0.7rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "green",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="owner-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="owner-form-check">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleFormChange}
                />
                <label htmlFor="isAvailable">
                  Property is currently available
                </label>
              </div>

              <div className="owner-form-actions">
                <button
                  type="button"
                  className="owner-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="owner-submit-btn">
                  {editingId ? "Update Property" : "Add Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsOwner;
