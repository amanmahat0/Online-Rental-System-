import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaHome, FaCalendarAlt } from "react-icons/fa";
import "./Dashboard.css";
import {
  UserDataContext,
  AgentDataContext,
} from "../../adminContext/AdminContext";

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { agentData, setAgentData } = useContext(AgentDataContext);
  const [userLoading, setUserLoading] = useState(true);
  const [agentLoading, setAgentLoading] = useState(true);
  // const [user, setUser] = useState(null);

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
      // setUser(data);
    } catch (error) {
      console.log("Error fetching user data : ", error);
    } finally {
      setUserLoading(false);
    }
  };
  const fetchAgentData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/agent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Faild to fetch agent data");
      }

      const data = await response.json();
      setAgentData(data);
    } catch (error) {
      console.log("Error fetching agent data : ", error);
    } finally {
      setAgentLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchAgentData();
  });

  useEffect(() => {
    if (userData) {
      console.log("User data:", userData);
    }
    if (agentData) {
      console.log("Agent data: ", agentData);
    }
  }, [userData, agentData]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    {
      icon: <FaUsers />,
      title: "Total Users",
      count: userLoading ? "Loading..." : userData?.data?.length,
      color: "#ffcc00",
    },
    {
      icon: <FaUserTie />,
      title: "Active Agents",
      count: agentLoading ? "Loading..." : agentData?.data?.length,
      color: "#ff6666",
    },
    { icon: <FaHome />, title: "Properties", count: "456", color: "#66ccff" },
    {
      icon: <FaCalendarAlt />,
      title: "Upcoming Events",
      count: "12",
      color: "#66ff99",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <motion.h1
        className="admin-dashboard-title"
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
