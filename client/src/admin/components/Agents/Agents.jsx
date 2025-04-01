import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaPhone, FaEnvelope, FaBuilding } from "react-icons/fa";
import { AgentDataContext } from "../../adminContext/AdminContext";
import "./agents.css";

const Agents = () => {
  const { agentData, setAgentData } = useContext(AgentDataContext);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    fetchAgentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editAgent = (id) => alert(`Editing agent ${id}`);

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
                  <button
                    onClick={() => editAgent(agent._id)}
                    aria-label={`Edit agent ${agent.name}`}
                  >
                    Edit
                  </button>
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
    </div>
  );
};

export default Agents;
