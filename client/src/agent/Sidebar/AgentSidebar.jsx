import React from "react";
import "./AgentSidebar.css";
import {
  FaUser,
  FaHome,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaCalendarCheck,
  FaBookmark,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AgentSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("saveProperties");
  };

  return (
    <div className="agent-sidebar">
      <h2 className="agent-title">Agent Dashboard</h2>
      <ul className="agent-menu">
        <li className="agent-menu-item">
          <NavLink
            to="/agent/profile"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaUser className="agent-sidebar-icon" />
            <span>My Profile</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/listings"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaHome className="agent-sidebar-icon" />
            <span>My Listing</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/bookings"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaCalendarCheck className="agent-sidebar-icon" />
            <span>My Booking</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/saved"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaBookmark className="agent-sidebar-icon" />
            <span>Saved Properties</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/messages"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaEnvelope className="agent-sidebar-icon" />
            <span>Messages</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/settings"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaCog className="agent-sidebar-icon" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
      <div className="agent-logout">
        <NavLink
          to="/"
          onClick={handleLogout}
          className={({ isActive }) => (isActive ? "agent-active-link" : "")}
        >
          <FaSignOutAlt className="agent-sidebar-icon" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AgentSidebar;