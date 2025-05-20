import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaBars, 
  FaUsers, 
  FaBuilding, 
  FaUser, 
  FaMoneyBillWave, 
  FaHome,
  FaUserTie,
  FaSignOutAlt
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("adminToken");
    
    // Redirect to login page
    navigate("/admin");
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
          {/* <li>
            <NavLink 
              to="/admin/manage-team" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserFriends className="icon" />
              {isOpen && <span>Manage Team</span>}
            </NavLink>
          </li> */}
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
          
          {/* Logout Button */}
          <li className="logout-item">
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              <FaSignOutAlt className="icon" />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;