import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRupeeSign, FaUserTie, FaEdit, FaTrash, FaHome, FaTimes } from "react-icons/fa";
import "./properties.css";
import { PropertiesDataContext } from "../../adminContext/AdminContext";

const Properties = () => {
  const { propertiesData, setPropertiesData } = useContext(PropertiesDataContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" }); // type can be "success" or "error"
  const propertyTypes = ['Apartment', 'House', 'Room', 'Commercial', 'Office'];

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  const fetchPropertiesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPropertiesData(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching properties data : ", error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowEditModal(true);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setPropertiesData(prev => ({
            ...prev,
            data: prev.data.filter(property => property._id !== propertyId)
          }));
          showMessage("Property deleted successfully!", "success");
        } else {
          const errorData = await response.json();
          showMessage(errorData.message || "Failed to delete property", "error");
        }
      } catch (error) {
        console.error('Error deleting property:', error);
        showMessage("An error occurred while deleting the property", "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Immediately update the UI (optimistic update)
    setPropertiesData(prev => ({
      ...prev,
      data: prev.data.map(property => 
        property._id === editingProperty._id ? editingProperty : property
      )
    }));
    setShowEditModal(false);
    showMessage("Property updated successfully!", "success");

    // Then update the server
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${editingProperty._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProperty),
      });

      if (!response.ok) {
        // If server update fails, revert the changes
        const errorData = await response.json();
        showMessage(errorData.message || "Failed to update property", "error");
        
        // Fetch fresh data from server to ensure UI is in sync
        fetchPropertiesData();
      }
    } catch (error) {
      console.error('Error updating property:', error);
      showMessage("An error occurred while updating the property", "error");
      // Fetch fresh data from server to ensure UI is in sync
      fetchPropertiesData();
    }
  };

  useEffect(() => {
    if (!propertiesData) {
      fetchPropertiesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="properties-container">
      <motion.h1
        className="properties-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Properties List
      </motion.h1>

      {message.text && (
        <motion.div 
          className={`admin-property-message ${message.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message.text}
          <button 
            className="close-message-btn"
            onClick={() => setMessage({ text: "", type: "" })}
          >
            <FaTimes />
          </button>
        </motion.div>
      )}

      <div className="properties-grid">
        {propertiesData?.data?.map((property) => (
          <motion.div
            key={property._id}
            className="admin-property-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="property-image">
              <img
                src={`http://localhost:5000${property.images}`}
                alt={property.title}
              />
              <span
                className={`property-status ${
                  property.availabilityStatus ? "available" : "booked"
                } `}
              >
                {property.availabilityStatus ? "Available" : "Booked"}
              </span>
            </div>

            <div className="property-details">
              <h3>{property.title}</h3>
              <div className="property-type">
                <FaHome />
                <span>{property.propertyType || 'Apartment'}</span>
              </div>
              <p className="property-location">
                <FaMapMarkerAlt />{" "}
                {property.location.city + " " + property.location.area}
              </p>

              <div className="property-specs">
                <span>Description: {property.description}</span>
              </div>

              <div className="property-price">
                <FaRupeeSign />
                {property.pricePerMonth.toLocaleString()}
              </div>

              <div className="property-agent">
                <FaUserTie />
                <div>
                  <p>
                    {/* {property.agent.name} */}
                    owner name
                  </p>
                  <small>
                    {/* {property.agent.contact} */}
                    owner contact
                  </small>
                </div>
              </div>

              <div className="admin-property-actions">
                <button 
                  className="admin-property-edit-btn"
                  onClick={() => handleEdit(property)}
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  className="admin-property-delete-btn"
                  onClick={() => handleDelete(property._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Property Modal */}
      {showEditModal && editingProperty && (
        <div className="admin-property-modal-overlay">
          <div className="admin-property-modal-content">
            <h2>Edit Property</h2>
            <form onSubmit={handleUpdate}>
              <div className="admin-property-form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({...editingProperty, title: e.target.value})}
                />
              </div>
              <div className="admin-property-form-group">
                <label>Property Type:</label>
                <select
                  value={editingProperty.propertyType || 'Apartment'}
                  onChange={(e) => setEditingProperty({...editingProperty, propertyType: e.target.value})}
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="admin-property-form-group">
                <label>City:</label>
                <input
                  type="text"
                  value={editingProperty.location.city}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    location: {...editingProperty.location, city: e.target.value}
                  })}
                />
              </div>
              <div className="admin-property-form-group">
                <label>Area:</label>
                <input
                  type="text"
                  value={editingProperty.location.area}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    location: {...editingProperty.location, area: e.target.value}
                  })}
                />
              </div>
              <div className="admin-property-form-group">
                <label>Price per Month (Rs.):</label>
                <input
                  type="number"
                  value={editingProperty.pricePerMonth}
                  onChange={(e) => setEditingProperty({...editingProperty, pricePerMonth: e.target.value})}
                />
              </div>
              <div className="admin-property-form-group">
                <label>Description:</label>
                <textarea
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({...editingProperty, description: e.target.value})}
                />
              </div>
              <div className="admin-property-form-group">
                <label>Availability Status:</label>
                <select
                  value={editingProperty.availabilityStatus}
                  onChange={(e) => setEditingProperty({...editingProperty, availabilityStatus: e.target.value === 'true'})}
                >
                  <option value="true">Available</option>
                  <option value="false">Booked</option>
                </select>
              </div>
              <div className="admin-property-modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
