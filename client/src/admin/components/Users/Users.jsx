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
} from "react-icons/fa";
import { UserDataContext } from "../../adminContext/AdminContext";
import "./users.css";

const Users = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle opening the edit modal with user data
  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    console.log(editingUser);
    setIsEditing(true);
  };

  // Handle input changes in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for editing a user
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    console.log(editingUser._id);

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

      // Close the edit modal
      setIsEditing(false);
      setEditingUser(null);
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
    } finally {
      // setUserLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users-container">
      <motion.h1
        className="users-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className="users-table-container">
        {isLoading && <div className="loading-overlay">Processing...</div>}

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="users-table">
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
                  <td className="user-info">
                    <FaUser className="user-icon" />
                    <span>{user.name}</span>
                  </td>
                  <td>
                    <FaEnvelope className="email-icon" />
                    {user.email}
                  </td>
                  <td>
                    <FaCalendar className="date-icon" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <FaPhone className="phone-icon" />
                    {user.contact}
                  </td>
                  <td className="actions">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditUser(user)}
                      aria-label="Edit user"
                      disabled={isLoading}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
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
        <div className="modal-overlay">
          <motion.div
            className="edit-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h2>Edit User</h2>
              <button
                className="close-modal"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={editingUser.contact || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Users;
