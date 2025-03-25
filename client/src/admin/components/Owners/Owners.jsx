import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaHome } from "react-icons/fa";
import "./Owners.css";

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch owners from an API (replace with actual API URL)
  useEffect(() => {
    fetch("https://api.example.com/owners") // Replace with actual API
      .then((response) => response.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error("Error fetching owners:", error));
  }, []);

  // Filter owners based on search input and status selection
  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "All" || owner.status === filterStatus)
  );

  // Action handlers
  const viewProfile = (id) => alert(`Viewing profile of owner ${id}`);
  const editOwner = (id) => alert(`Editing owner ${id}`);
  const deleteOwner = (id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      alert(`Deleting owner ${id}`);
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

      {/* Search and Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Owners List */}
      <div className="owners-grid">
        {filteredOwners.map((owner) => (
          <motion.div
            key={owner.id}
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
                <p><FaEnvelope /> {owner.email}</p>
                <p><FaPhone /> {owner.phone}</p>
                <p><FaHome /> {owner.properties} Properties</p>
              </div>
              <div className={`owner-status ${owner.status.toLowerCase()}`}>
                {owner.status}
              </div>
              <div className="owner-actions">
                <button onClick={() => viewProfile(owner.id)}>View</button>
                <button onClick={() => editOwner(owner.id)}>Edit</button>
                <button onClick={() => deleteOwner(owner.id)}>Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Owners;