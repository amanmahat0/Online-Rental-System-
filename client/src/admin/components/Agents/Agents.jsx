import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaPhone, FaEnvelope, FaBuilding } from "react-icons/fa";
import "./agents.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch agents from an API (replace with actual API URL)
  useEffect(() => {
    fetch("https://api.example.com/agents") // Replace with actual API
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.error("Error fetching agents:", error));
  }, []);

  // Filter agents based on search input and status selection
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "All" || agent.status === filterStatus)
  );

  // Action handlers
  const viewProfile = (id) => alert(`Viewing profile of agent ${id}`);
  const editAgent = (id) => alert(`Editing agent ${id}`);
  const deleteAgent = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      alert(`Deleting agent ${id}`);
    }
  };

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

      {/* Search and Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Agents List */}
      <div className="agents-grid">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
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
                <p><FaEnvelope /> {agent.email}</p>
                <p><FaPhone /> {agent.phone}</p>
                <p><FaBuilding /> {agent.properties} Properties</p>
              </div>
              <div className={`agent-status ${agent.status.toLowerCase()}`}>
                {agent.status}
              </div>
              <div className="agent-actions">
                <button onClick={() => viewProfile(agent.id)}>View</button>
                <button onClick={() => editAgent(agent.id)}>Edit</button>
                <button onClick={() => deleteAgent(agent.id)}>Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
