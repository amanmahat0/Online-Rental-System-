import React from "react";
import "./UserSidebar.css";
import {
  FaUser,
  FaCalendarCheck,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("saveProperties");
  };

  return (
    <div className="user-sidebar">
      <h2 className="user-title">Profile</h2>
      <ul className="user-menu">
        <li className="user-menu-item">
          <NavLink
            to="/user/user-profile"
            className={({ isActive }) => (isActive ? "user-active-link" : "")}
          >
            <FaUser className="user-sidebar-icon" />
            <span>My Profile</span>
          </NavLink>
        </li>
        <li className="user-menu-item">
          <NavLink
            to="/user/mybooking"
            className={({ isActive }) => (isActive ? "user-active-link" : "")}
          >
            <FaCalendarCheck className="user-sidebar-icon" />
            <span>My Booking</span>
          </NavLink>
        </li>
        <li className="user-menu-item">
          <NavLink
            to="user/saved"
            className={({ isActive }) => (isActive ? "user-active-link" : "")}
          >
            <FaBookmark className="user-sidebar-icon" />
            <span>Saved Properties</span>
          </NavLink>
        </li>
        <li className="user-menu-item">
          <NavLink
            to="/user/payment"
            className={({ isActive }) => (isActive ? "user-active-link" : "")}
          >
            <FaCog className="user-sidebar-icon" />
            <span>Payment History</span>
          </NavLink>
        </li>
      </ul>
      <div className="user-logout">
        <NavLink
          to="/"
          onClick={handleLogout}
          className={({ isActive }) => (isActive ? "user-active-link" : "")}
        >
          <FaSignOutAlt className="user-sidebar-icon" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserSidebar;
