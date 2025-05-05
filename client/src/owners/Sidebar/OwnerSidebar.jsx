import React from "react";
import "./OwnerSidebar.css";
import {
  FaUser,
  FaHome,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const OwnerSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <div className="owner-sidebar">
      <h2 className="owner-title">Owner Dashboard</h2>
      <ul className="owner-menu">
        <li className="owner-menu-item">
          <NavLink
            to="/owner/profile"
            className={({ isActive }) => (isActive ? "owner-active-link" : "")}
          >
            <FaUser className="owner-sidebar-icon" />
            <span>My Profile</span>
          </NavLink>
        </li>
        <li className="owner-menu-item">
          <NavLink
            to="/owner/mylisting"
            className={({ isActive }) => (isActive ? "owner-active-link" : "")}
          >
            <FaHome className="owner-sidebar-icon" />
            <span>My Listing</span>
          </NavLink>
        </li>
        <li className="owner-menu-item">
          <NavLink
            to="/owner/booking-requests"
            className={({ isActive }) => (isActive ? "owner-active-link" : "")}
          >
            <FaCalendarAlt className="owner-sidebar-icon" />
            <span>Booking Requests</span>
          </NavLink>
        </li>
        <li className="owner-menu-item">
          <NavLink
            to="/owner/payments"
            className={({ isActive }) => (isActive ? "owner-active-link" : "")}
          >
            <FaMoneyBillWave className="owner-sidebar-icon" />
            <span>Payment History</span>
          </NavLink>
        </li>
        <li className="owner-menu-item">
          <NavLink
            to="/owner/settings"
            className={({ isActive }) => (isActive ? "owner-active-link" : "")}
          >
            <FaCog className="owner-sidebar-icon" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
      <div className="owner-logout" onClick={handleLogout}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "owner-active-link" : "")}
        >
          <FaSignOutAlt className="owner-sidebar-icon" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default OwnerSidebar;