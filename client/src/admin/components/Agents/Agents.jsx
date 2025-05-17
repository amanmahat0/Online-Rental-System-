import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { AgentDataContext } from "../../adminContext/AdminContext";
import "./agents.css";

const Agents = () => {
  const { agentData, setAgentData } = useContext(AgentDataContext);
  const [search, setSearch] = useState("");
  const [editingAgent, setEditingAgent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [contactError, setContactError] = useState("");
  const [contactWarning, setContactWarning] = useState("");

  const fetchAgentData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/agent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch agent data");
      }

      const data = await response.json();
      setAgentData(data);
    } catch (error) {
      console.error("Error fetching agent data:", error);
      setErrorMessage(error.message || "Failed to fetch agent data");
    }
  };

  useEffect(() => {
    if (!agentData) {
      fetchAgentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editAgent = (agent) => {
    setEditingAgent({ ...agent });
    setContactError("");
    setContactWarning("");
    setIsEditing(true);
  };

  const confirmDeleteAgent = (agent) => {
    setAgentToDelete(agent);
    setShowDeleteConfirm(true);
  };

  const deleteAgent = async () => {
    if (!agentToDelete) return;

    setIsDeleting(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/agent/${agentToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete agent");
      }

      setAgentData({
        ...agentData,
        data: agentData.data.filter((agent) => agent._id !== agentToDelete._id),
      });

      // Close confirmation modal
      setShowDeleteConfirm(false);
      setAgentToDelete(null);
    } catch (error) {
      console.error("Error deleting agent:", error);
      setErrorMessage(error.message || "Failed to delete agent");
    } finally {
      setIsDeleting(false);
    }
  };

  const validateContact = (contact) => {
    // Check if contact starts with 97 or 98 and is exactly 10 digits
    const contactRegex = /^(97|98)\d{8}$/;
    return contactRegex.test(contact);
  };

  const checkContactPrefix = (contact) => {
    if (!contact || contact.length < 2) return;

    const prefix = contact.substring(0, 2);
    if (prefix !== "97" && prefix !== "98") {
      setContactWarning("Number should start with 97 or 98");
    } else {
      setContactWarning("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Clear previous error
      setContactError("");

      // Only allow numeric input for contact
      if (value && !/^\d*$/.test(value)) {
        return;
      }

      // Check prefix while typing
      checkContactPrefix(value);
    }

    setEditingAgent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // Validate contact number
    if (!validateContact(editingAgent.contact)) {
      setContactError("Contact must be 10 digits starting with 97 or 98");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Make API call to update agent
      const response = await fetch(
        `http://localhost:5000/api/agent/${editingAgent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingAgent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update agent");
      }

      const updatedAgent = await response.json();

      // Update state with the edited Agent
      setAgentData({
        ...agentData,
        data: agentData.data.map((user) =>
          user._id === updatedAgent.data._id ? updatedAgent.data : user
        ),
      });

      // Close the edit modal
      setIsEditing(false);
      setEditingAgent(null);
    } catch (error) {
      console.error("Error updating agent:", error);
      setErrorMessage(error.message || "Failed to update agent");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced search functionality to search by name, email, or contact
  const filteredAgents = agentData?.data?.filter((agent) => {
    const searchTerm = search.toLowerCase();

    return (
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.email.toLowerCase().includes(searchTerm) ||
      agent.contact.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="admin-agent-container">
      <motion.h1
        className="admin-agent-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Agents Overview
      </motion.h1>

      {errorMessage && (
        <div className="admin-agent-error-message">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}

      {/* Search Section */}
      <div className="admin-agent-search-container">
        <input
          type="text"
          placeholder="Search by name, email or contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-agent-search-input"
        />
      </div>

      {/* Agents List */}
      <div className="admin-agent-grid">
        {filteredAgents?.length > 0 ? (
          filteredAgents.map((agent) => (
            <motion.div
              key={agent._id}
              className="admin-agent-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="admin-agent-icon">
                <FaUserTie />
              </div>
              <div className="admin-agent-info">
                <h3>{agent.name}</h3>
                <div className="admin-agent-details">
                  <p>
                    <FaEnvelope /> {agent.email}
                  </p>
                  <p>
                    <FaPhone /> {agent.contact}
                  </p>
                  <p>
                    <FaBuilding /> Number of Properties: {agent.properties.length}
                  </p>
                </div>

                <div className="admin-agent-action-buttons">
                  <button
                    className="admin-agent-edit-btn"
                    onClick={() => editAgent(agent)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-agent-delete-btn"
                    onClick={() => confirmDeleteAgent(agent)}
                    aria-label={`Delete agent ${agent.name}`}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="admin-agent-no-results">No agents found</p>
        )}
      </div>

      {/* Edit Agent Modal */}
      {isEditing && editingAgent && (
        <div className="admin-agent-modal-overlay">
          <motion.div
            className="admin-agent-edit-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-agent-modal-header">
              <h2>Edit Agent</h2>
              <button
                className="admin-agent-close-modal"
                onClick={() => setIsEditing(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit}>
              <div className="admin-agent-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingAgent.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-agent-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editingAgent.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin-agent-form-group">
                <label htmlFor="contact">
                  Contact (10 digits starting with 97 or 98)
                </label>
                <div className="admin-agent-input-wrapper">
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={editingAgent.contact || ""}
                    onChange={handleInputChange}
                    maxLength={10}
                    required
                  />
                  {contactWarning && (
                    <div className="admin-agent-field-warning">
                      <FaExclamationTriangle /> {contactWarning}
                    </div>
                  )}
                </div>
                {contactError && (
                  <div className="admin-agent-field-error">{contactError}</div>
                )}
              </div>

              <div className="admin-agent-modal-actions">
                <button
                  type="button"
                  className="admin-agent-cancel-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-agent-save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && agentToDelete && (
        <div className="admin-agent-modal-overlay">
          <motion.div
            className="admin-agent-delete-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-agent-modal-header">
              <h2>Confirm Deletion</h2>
              <button
                className="admin-agent-close-modal"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAgentToDelete(null);
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-agent-delete-content">
              <p>Are you sure you want to delete the agent:</p>
              <p className="admin-agent-delete-name">{agentToDelete.name}?</p>
              <p>This action cannot be undone.</p>
            </div>

            <div className="admin-agent-modal-actions">
              <button
                type="button"
                className="admin-agent-cancel-btn"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAgentToDelete(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-agent-confirm-delete-btn"
                onClick={deleteAgent}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Agent"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Agents;
