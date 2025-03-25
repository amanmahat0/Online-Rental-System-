import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaBars, 
  FaUserFriends, 
  FaUsers, 
  FaBuilding, 
  FaUser, 
  FaMoneyBillWave, 
  FaHome,
  FaUserTie 
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger menu to toggle sidebar visibility */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars className="menu-icon" />
      </div>

      {/* Sidebar container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            {/* Empty container for logo or title */}
          </div>
        </div>
        
        {/* Sidebar menu */}
        <ul className="sidebar-menu">
          <li>
            <NavLink 
              to="/admin/home" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaHome className="icon" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/manage-team" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserFriends className="icon" />
              {isOpen && <span>Manage Team</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUsers className="icon" />
              {isOpen && <span>Users</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/agents" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserTie className="icon" />
              {isOpen && <span>Agents</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/properties" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaBuilding className="icon" />
              {isOpen && <span>Properties</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/owner-profile" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUser className="icon" />
              {isOpen && <span>Owner Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/payment-history" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaMoneyBillWave className="icon" />
              {isOpen && <span>Payment History</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;