import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaHome, FaTimes } from "react-icons/fa";
import { OwnerDataContext } from "../../adminContext/AdminContext";
import "./Owners.css";

const Owners = () => {
  const { ownerData, setOwnerData } = useContext(OwnerDataContext);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    ownerId: null,
    ownerName: ""
  });

  const fetchOwnerData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/owner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOwnerData(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching owner data: ", error);
      showMessage("Failed to load owner data", "error");
    }
  };

  // Fetch owners from an API
  useEffect(() => {
    if (!ownerData) {
      fetchOwnerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show message with auto-dismiss
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  // Filter owners based on search input
  // Add a null check for owner.name in the filter function
  const filteredOwner = ownerData?.data?.filter((owner) =>
    owner?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle contact number input with enhanced validation
  const handleContactChange = (e) => {
    const value = e.target.value;
    
    // Always allow emptying the field
    if (value === "") {
      setEditingOwner({ ...editingOwner, contact: value });
      setPhoneError("");
      return;
    }
    
    // Only allow digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setEditingOwner({ ...editingOwner, contact: value });
      
      // Validate that the number starts with 98 when it has at least 2 digits
      if (value.length >= 2 && !value.startsWith("98")) {
        setPhoneError("Phone number must start with 98");
      } 
      // Validate that the number is exactly 10 digits when submitting
      else if (value.length > 0 && value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      }
      else {
        setPhoneError("");
      }
    }
  };

  // Validate phone number before saving
  const validatePhone = () => {
    if (!editingOwner.contact) {
      setPhoneError("Phone number is required");
      return false;
    }
    
    if (editingOwner.contact.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return false;
    }
    
    if (!editingOwner.contact.startsWith("98")) {
      setPhoneError("Phone number must start with 98");
      return false;
    }
    
    return true;
  };

  // Start editing an owner
  const editOwner = (owner) => {
    setEditingOwner({ ...owner });
    setIsEditing(true);
    setPhoneError(""); // Reset error message when starting to edit
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingOwner(null);
    setPhoneError(""); // Reset error message when canceling
  };

  // Open delete confirmation modal
  const openDeleteConfirmation = (owner) => {
    setDeleteConfirmation({
      isOpen: true,
      ownerId: owner._id,
      ownerName: owner.name
    });
  };

  // Close delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      ownerId: null,
      ownerName: ""
    });
  };

  // Save owner changes
  const saveOwner = async () => {
    // Validate phone number before saving
    if (!validatePhone()) {
      return; // Stop the save process if validation fails
    }
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/owner/${editingOwner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingOwner),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update owner");
      }

      const updatedOwner = await response.json();

      // Make sure we're getting the right data structure
      const updatedOwnerData = updatedOwner.data || updatedOwner;

      // Update the owner in the local state
      setOwnerData({
        ...ownerData,
        data: ownerData.data.map((owner) =>
          owner._id === editingOwner._id ? updatedOwnerData : owner
        ),
      });

      setIsEditing(false);
      setEditingOwner(null);
      setPhoneError(""); // Reset error message after successful save
      showMessage("Owner updated successfully", "success");

      // Re-fetch data to ensure consistency
      fetchOwnerData();
    } catch (error) {
      console.error("Error updating owner:", error);
      showMessage("Failed to update owner", "error");
    }
  };

  // Delete an owner
  const deleteOwner = async () => {
    const id = deleteConfirmation.ownerId;
    if (!id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/owner/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete owner");
      }

      setOwnerData({
        ...ownerData,
        data: ownerData.data.filter((owner) => owner._id !== id),
      });

      showMessage("Owner deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting owner:", error);
      showMessage("Failed to delete owner", "error");
    } finally {
      setIsDeleting(false);
      closeDeleteConfirmation();
    }
  };

  return (
    <div className="admin-owner-container">
      <motion.h1
        className="admin-owner-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Owners Overview
      </motion.h1>

      {/* Message display */}
      {message.text && (
        <div className={`admin-owner-message ${message.type}`}>{message.text}</div>
      )}

      {/* Search and Filter Section */}
      <div className="admin-owner-filter-container">
        <input
          type="text"
          placeholder="Search owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Edit Owner Modal */}
      {isEditing && (
        <div className="admin-owner-edit-modal">
          <div className="admin-owner-edit-modal-content">
            <h2>Edit Owner</h2>
            <div className="admin-owner-form-group">
              <label>Name:</label>
              <input
                type="text"
                value={editingOwner.name}
                onChange={(e) =>
                  setEditingOwner({ ...editingOwner, name: e.target.value })
                }
              />
            </div>
            <div className="admin-owner-form-group">
              <label>Email:</label>
              <input
                type="email"
                value={editingOwner.email}
                onChange={(e) =>
                  setEditingOwner({ ...editingOwner, email: e.target.value })
                }
              />
            </div>
            <div className="admin-owner-form-group">
              <label>Contact:</label>
              <input
                type="text"
                value={editingOwner.contact}
                onChange={handleContactChange}
                className={phoneError ? "error-input" : ""}
              />
              {phoneError ? (
                <small className="error-text">{phoneError}</small>
              ) : (
                <small>Must be 10 digits and start with 98</small>
              )}
            </div>
            <div className="admin-owner-edit-actions">
              <button onClick={cancelEdit}>Cancel</button>
              <button onClick={saveOwner} disabled={!!phoneError}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="admin-owner-modal-overlay">
          <div className="admin-owner-delete-modal">
            <div className="admin-owner-modal-header">
              <h2>Confirm Deletion</h2>
              <button className="admin-owner-close-modal" onClick={closeDeleteConfirmation}>
                <FaTimes />
              </button>
            </div>
            
            <div className="admin-owner-delete-content">
              {/* Changed order: name first, then warning text */}
              <div className="admin-owner-delete-name">{deleteConfirmation.ownerName}</div>
              <p className="admin-owner-delete-warning">
                Are you sure you want to delete this owner? This action cannot be undone.
              </p>
            </div>
            
            <div className="admin-owner-modal-actions">
              <button 
                className="admin-owner-cancel-btn" 
                onClick={closeDeleteConfirmation}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="admin-owner-confirm-delete-btn" 
                onClick={deleteOwner}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Owner"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owners List */}
      <div className="admin-owner-grid">
        {filteredOwner?.map((owner) => (
          <motion.div
            key={owner._id}
            className="admin-owner-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="admin-owner-icon">
              <FaUser />
            </div>
            <div className="admin-owner-info">
              <h3>{owner.name}</h3>
              <div className="admin-owner-details">
                <p>
                  <FaEnvelope /> {owner.email}
                </p>
                <p>
                  <FaPhone /> {owner.contact}
                </p>
                <p>
                  <FaHome /> Number of Properties: {owner.properties.length}
                </p>
              </div>
              <div className="admin-owner-actions">
                <button onClick={() => editOwner(owner)}>Edit</button>
                <button onClick={() => openDeleteConfirmation(owner)}>
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Owners;