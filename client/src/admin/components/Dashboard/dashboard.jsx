import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaHome, FaCalendarAlt } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { icon: <FaUsers />, title: "Total Users", count: "1,234", color: "#ffcc00" },
    { icon: <FaUserTie />, title: "Active Agents", count: "85", color: "#ff6666" },
    { icon: <FaHome />, title: "Properties", count: "456", color: "#66ccff" },
    { icon: <FaCalendarAlt />, title: "Upcoming Events", count: "12", color: "#66ff99" },
  ];

  return (
    <div className="dashboard-container">
      <motion.h1 
        className="dashboard-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Overview
      </motion.h1>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <motion.div className="calendar-section" {...fadeIn}>
          <h2>Upcoming Events</h2>
          <div className="calendar-placeholder">Calendar Component</div>
        </motion.div>

        <motion.div className="recent-activities" {...fadeIn}>
          <h2>Recent Activities</h2>
          <div className="activity-list">
            <div className="activity-item">New user registration</div>
            <div className="activity-item">Property listing updated</div>
            <div className="activity-item">New agent onboarded</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
