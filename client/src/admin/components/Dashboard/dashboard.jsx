import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaHome, FaUser } from "react-icons/fa";
import "./Dashboard.css";
import {
  UserDataContext,
  AgentDataContext,
  PropertiesDataContext,
} from "../../adminContext/AdminContext";

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { agentData, setAgentData } = useContext(AgentDataContext);
  const { propertiesData, setPropertiesData } = useContext(
    PropertiesDataContext
  );
  const [userLoading, setUserLoading] = useState(true);
  const [agentLoading, setAgentLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);

  // Owners state
  const [ownersData, setOwnersData] = useState(null);
  const [ownersLoading, setOwnersLoading] = useState(true);

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

  const fetchPropertiesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPropertiesData(data);
    } catch (error) {
      console.log("Error fectching properties data : ", error);
    } finally {
      setPropertiesLoading(false);
    }
  };

  // Fetch owners data
  const fetchOwnersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/owner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch owners data");
      }
      const data = await response.json();
      setOwnersData(data);
    } catch (error) {
      console.log("Error fetching owners data : ", error);
    } finally {
      setOwnersLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    setUserLoading(false);
    if (!agentData) {
      fetchAgentData();
    }
    setAgentLoading(false);
    if (!propertiesData) {
      fetchPropertiesData();
    }
    setPropertiesLoading(false);
    if (!ownersData) {
      fetchOwnersData();
    }
    setOwnersLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    {
      icon: <FaHome />,
      title: "Properties",
      count: propertiesLoading ? "Loading..." : propertiesData?.data?.length,
      color: "#66ccff",
    },
    {
      icon: <FaUser />,
      title: "Owners",
      count: ownersLoading ? "Loading..." : ownersData?.data?.length,
      color: "#66ff99",
    },
  ];

  // Visual representation data
  const total =
    (userData?.data?.length || 0) +
    (agentData?.data?.length || 0) +
    (propertiesData?.data?.length || 0) +
    (ownersData?.data?.length || 0);

  const chartData = [
    {
      label: "Users",
      value: userData?.data?.length || 0,
      color: "#ffcc00",
    },
    {
      label: "Agents",
      value: agentData?.data?.length || 0,
      color: "#ff6666",
    },
    {
      label: "Properties",
      value: propertiesData?.data?.length || 0,
      color: "#66ccff",
    },
    {
      label: "Owners",
      value: ownersData?.data?.length || 0,
      color: "#66ff99",
    },
  ];

  // Pie chart calculation
  let cumulative = 0;
  const pieSlices = chartData.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = 100 + 90 * Math.cos(startAngle);
    const y1 = 100 + 90 * Math.sin(startAngle);
    const x2 = 100 + 90 * Math.cos(endAngle);
    const y2 = 100 + 90 * Math.sin(endAngle);
    const pathData = `
      M 100 100
      L ${x1} ${y1}
      A 90 90 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;
    return (
      <path key={i} d={pathData} fill={d.color} stroke="#fff" strokeWidth="2" />
    );
  });

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

      {/* Visual Representation */}
      <div className="visual-data-flex-unique">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="visual-data-container-unique"
        >
          <h2 className="visual-data-title-unique">Data Distribution</h2>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {pieSlices}
          </svg>
          <div className="visual-data-legend-unique">
            {chartData.map((d, i) => (
              <div key={i} className="visual-data-legend-row-unique">
                <span
                  className="visual-data-legend-color-unique"
                  style={{ background: d.color }}
                ></span>
                <span style={{ fontWeight: 500 }}>{d.label}:</span>
                <span style={{ marginLeft: 6 }}>{d.value}</span>
              </div>
            ))}
          </div>
          {/* Additional backend data summaries */}
          <div className="visual-data-extra-unique">
            <h3 className="visual-data-extra-title-unique">Quick Stats</h3>
            <ul className="visual-data-extra-list-unique">
              <li className="visual-data-extra-listitem-unique">
                <span className="visual-data-extra-label-unique">
                  Total Users:
                </span>
                <span className="visual-data-extra-value-unique">
                  {userData?.data?.length || 0}
                </span>
              </li>
              <li className="visual-data-extra-listitem-unique">
                <span className="visual-data-extra-label-unique">
                  Total Agents:
                </span>
                <span className="visual-data-extra-value-unique">
                  {agentData?.data?.length || 0}
                </span>
              </li>
              <li className="visual-data-extra-listitem-unique">
                <span className="visual-data-extra-label-unique">
                  Total Properties:
                </span>
                <span className="visual-data-extra-value-unique">
                  {propertiesData?.data?.length || 0}
                </span>
              </li>
              <li className="visual-data-extra-listitem-unique">
                <span className="visual-data-extra-label-unique">
                  Total Owners:
                </span>
                <span className="visual-data-extra-value-unique">
                  {ownersData?.data?.length || 0}
                </span>
              </li>
              {userData?.data?.length > 0 && (
                <li className="visual-data-extra-listitem-unique">
                  <span className="visual-data-extra-label-unique">
                    Latest User:
                  </span>
                  <span className="visual-data-extra-value-unique">
                    {userData.data[userData.data.length - 1]?.name || "N/A"}
                  </span>
                </li>
              )}
              {agentData?.data?.length > 0 && (
                <li className="visual-data-extra-listitem-unique">
                  <span className="visual-data-extra-label-unique">
                    Latest Agent:
                  </span>
                  <span className="visual-data-extra-value-unique">
                    {agentData.data[agentData.data.length - 1]?.name || "N/A"}
                  </span>
                </li>
              )}
              {propertiesData?.data?.length > 0 && (
                <li className="visual-data-extra-listitem-unique">
                  <span className="visual-data-extra-label-unique">
                    Latest Property:
                  </span>
                  <span className="visual-data-extra-value-unique">
                    {propertiesData.data[propertiesData.data.length - 1]
                      ?.title || "N/A"}
                  </span>
                </li>
              )}
              {ownersData?.data?.length > 0 && (
                <li className="visual-data-extra-listitem-unique">
                  <span className="visual-data-extra-label-unique">
                    Latest Owner:
                  </span>
                  <span className="visual-data-extra-value-unique">
                    {ownersData.data[ownersData.data.length - 1]?.name || "N/A"}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
