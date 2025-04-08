import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaHome } from "react-icons/fa";
import { OwnerDataContext } from "../../adminContext/AdminContext";
import "./Owners.css";

const Owners = () => {
  const { ownerData, setOwnerData } = useContext(OwnerDataContext);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);

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

  // Handle contact number input - only allow integers up to 10 digits
  const handleContactChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setEditingOwner({ ...editingOwner, contact: value });
    }
  };

  // Start editing an owner
  const editOwner = (owner) => {
    setEditingOwner({ ...owner });
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingOwner(null);
  };

  // Save owner changes
  const saveOwner = async () => {
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
      showMessage("Owner updated successfully", "success");

      // Re-fetch data to ensure consistency
      fetchOwnerData();
    } catch (error) {
      console.error("Error updating owner:", error);
      showMessage("Failed to update owner", "error");
    }
  };

  // Delete an owner
  const deleteOwner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) {
      return;
    }

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
    }
  };

  return (
    <div className="owners-container">
      <motion.h1
        className="owners-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Owners Overview
      </motion.h1>

      {/* Message display */}
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Search and Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Edit Owner Modal */}
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
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
              />
              <small>Numbers only, max 10 digits</small>
            </div>
            {/* <div className="admin-owner-form-group">
              <label>Properties:</label>
              <div className="non-editable-field">{editingOwner.properties}</div>
              <small className="info-text">Properties count cannot be edited directly</small>
            </div> */}
            <div className="edit-actions">
              <button onClick={cancelEdit}>Cancel</button>
              <button onClick={saveOwner}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Owners List */}
      <div className="owners-grid">
        {filteredOwner?.map((owner) => (
          <motion.div
            key={owner._id}
            className="owner-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="owner-icon">
              <FaUser />
            </div>
            <div className="owner-info">
              <h3>{owner.name}</h3>
              <div className="owner-details">
                <p>
                  <FaEnvelope /> {owner.email}
                </p>
                <p>
                  <FaPhone /> {owner.contact}
                </p>
                <p>
                  <FaHome /> Number of Properties: {owner.properties}
                </p>
              </div>
              <div className="owner-actions">
                <button onClick={() => editOwner(owner)}>Edit</button>
                <button onClick={() => deleteOwner(owner._id)}>
                  {isDeleting ? "Deleting..." : "Delete"}
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
