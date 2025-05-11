import React from "react";
import "./AgentSidebar.css";
import {
  FaUser,
  FaHome,
  FaEnvelope,

  FaSignOutAlt,
  FaCalendarCheck,
  FaBookmark,
  FaMoneyBillWave,
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
            to="/agent/booking-request"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaEnvelope className="agent-sidebar-icon" />
            <span>Booking Request</span>
          </NavLink>
        </li>
        <li className="agent-menu-item">
          <NavLink
            to="/agent/payment"
            className={({ isActive }) => (isActive ? "agent-active-link" : "")}
          >
            <FaMoneyBillWave className="agent-sidebar-icon" />
            <span>Payment History</span>
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
