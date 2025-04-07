import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaEdit,
  FaTrash,
  FaPhone,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { UserDataContext } from "../../adminContext/AdminContext";
import "./users.css";

const Users = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [contactError, setContactError] = useState("");

  // Handle opening the edit modal with user data
  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setContactError("");
    setIsEditing(true);
  };

  // Handle input changes in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validate contact field
    if (name === "contact") {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, "");
      
      // Validate that contact starts with 98 and is exactly 10 digits
      if (digitsOnly !== "" && (!digitsOnly.startsWith("98") || digitsOnly.length > 10)) {
        setContactError("Contact must be 10 digits and start with 98");
      } else {
        setContactError("");
      }
      
      // Update with digits only
      setEditingUser((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
    } else {
      setEditingUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission for editing a user
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    // Validate contact before submission
    if (!editingUser.contact || editingUser.contact.length !== 10 || !editingUser.contact.startsWith("98")) {
      setContactError("Contact must be exactly 10 digits and start with 98");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Make API call to update user
      const response = await fetch(
        `http://localhost:5000/api/user/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      // Update state with the edited user
      setUserData({
        ...userData,
        data: userData.data.map((user) =>
          user._id === updatedUser.data._id ? updatedUser.data : user
        ),
      });

      // Show success message
      setSuccessMessage(`User ${editingUser.name} successfully updated!`);
      
      // Close the edit modal after a short delay
      setTimeout(() => {
        setIsEditing(false);
        setEditingUser(null);
      }, 1500);
      
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage(error.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Make API call to delete user
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update state to remove deleted user
      setUserData({
        ...userData,
        data: userData.data.filter((user) => user._id !== userId),
      });
      
      // Show success message
      setSuccessMessage("User successfully deleted!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(error.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if userData exists and has data property
  const users = userData?.data || [];

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("Error fetching user data : ", error);
      setErrorMessage("Failed to fetch user data");
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear messages after some time
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="admin-user-container">
      <motion.h1
        className="admin-user-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      {errorMessage && (
        <div className="admin-user-error-message">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>
            <FaTimes />
          </button>
        </div>
      )}
      
      {successMessage && (
        <div className="admin-user-success-message">
          <FaCheckCircle className="admin-user-success-icon" />
          {successMessage}
          <button onClick={() => setSuccessMessage("")}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className="admin-user-table-container">
        {isLoading && <div className="admin-user-loading-overlay">Processing...</div>}

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="admin-user-info">
                    <FaUser className="admin-user-icon" />
                    <span>{user.name}</span>
                  </td>
                  <td>
                    <FaEnvelope className="admin-user-email-icon" />
                    {user.email}
                  </td>
                  <td>
                    <FaCalendar className="admin-user-date-icon" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <FaPhone className="admin-user-phone-icon" />
                    {user.contact}
                  </td>
                  <td className="admin-user-actions">
                    <button
                      className="admin-user-action-btn admin-user-edit"
                      onClick={() => handleEditUser(user)}
                      aria-label="Edit user"
                      disabled={isLoading}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="admin-user-action-btn admin-user-delete"
                      onClick={() => handleDeleteUser(user._id)}
                      aria-label="Delete user"
                      disabled={isLoading}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit User Modal */}
      {isEditing && editingUser && (
        <div className="admin-user-modal-overlay">
          <motion.div
            className="admin-user-edit-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-user-modal-header">
              <h2>Edit User</h2>
              <button
                className="admin-user-close-modal"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit}>
              <div className="admin-user-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingUser.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-user-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editingUser.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-user-form-group">
                <label htmlFor="contact">Contact (must be 10 digits starting with 98)</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={editingUser.contact || ""}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  placeholder="e.g., 9812345678"
                  className={contactError ? "admin-user-input-error" : ""}
                />
                {contactError && <div className="admin-user-input-error-message">{contactError}</div>}
              </div>

              <div className="admin-user-modal-actions">
                <button
                  type="button"
                  className="admin-user-cancel-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-user-save-btn" 
                  disabled={isLoading || contactError}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
              
              {successMessage && (
                <div className="admin-user-modal-success-message">
                  <FaCheckCircle className="admin-user-success-icon" /> {successMessage}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Users;