import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaHome } from "react-icons/fa";
import { OwnerDataContext } from "../../adminContext/AdminContext";
import "./Owners.css";

const Owners = () => {
  const { ownerData, setOwnerData } = useContext(OwnerDataContext);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
      console.log("Error fectching owner data : ", error);
    }
  };

  // Fetch owners from an API (replace with actual API URL)
  useEffect(() => {
    if (!ownerData) {
      fetchOwnerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter owners based on search input and status selection
  const filteredOwner = ownerData?.data?.filter((owner) =>
    owner.name.toLowerCase().includes(search.toLowerCase())
  );

  // Action handlers
  const editOwner = (id) => alert(`Editing owner ${id}`);
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
    } catch (error) {
      console.error("Error deleting agent:", error);
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

      {/* Search and Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
                  <FaHome /> {owner.properties} Properties
                </p>
              </div>
              <div className="owner-actions">
                <button onClick={() => editOwner(owner._id)}>Edit</button>
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
