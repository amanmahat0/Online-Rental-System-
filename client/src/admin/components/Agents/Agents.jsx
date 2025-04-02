import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaTimes,
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

  //
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
    console.log(editingAgent);
    setIsEditing(true);
  };

  const deleteAgent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/agent/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete agent");
      }

      setAgentData({
        ...agentData,
        data: agentData.data.filter((agent) => agent._id !== id),
      });
    } catch (error) {
      console.error("Error deleting agent:", error);
      setErrorMessage(error.message || "Failed to delete agent");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAgent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    console.log(editingAgent._id);

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

  const filteredAgents = agentData?.data?.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="agents-container">
      <motion.h1
        className="agents-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Agents Overview
      </motion.h1>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}

      {/* Search Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Agents List */}
      <div className="agents-grid">
        {filteredAgents?.length > 0 ? (
          filteredAgents.map((agent) => (
            <motion.div
              key={agent._id}
              className="agent-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="agent-icon">
                <FaUserTie />
              </div>
              <div className="agent-info">
                <h3>{agent.name}</h3>
                <div className="agent-details">
                  <p>
                    <FaEnvelope /> {agent.email}
                  </p>
                  <p>
                    <FaPhone /> {agent.contact}
                  </p>
                  <p>
                    <FaBuilding /> {agent.properties} Properties
                  </p>
                </div>

                <div className="agent-actions">
                  <button onClick={() => editAgent(agent)}>Edit</button>
                  <button
                    onClick={() => deleteAgent(agent._id)}
                    aria-label={`Delete agent ${agent.name}`}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No agents found</p>
        )}
      </div>
      {/* Edit Agent Modal */}
      {isEditing && editingAgent && (
        <div className="modal-overlay">
          <motion.div
            className="edit-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h2>Edit Agent</h2>
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
                  value={editingAgent.name || ""}
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
                  value={editingAgent.email || ""}
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
                  value={editingAgent.contact || ""}
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

export default Agents;
