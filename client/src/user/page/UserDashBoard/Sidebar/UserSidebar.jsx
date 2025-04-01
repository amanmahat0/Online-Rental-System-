import React from 'react';
import './UserSidebar.css';
import { FaUser, FaCalendarCheck, FaBookmark, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const UserSidebar = () => {
    const location = useLocation();
    
    return (
        <div className="user-sidebar">
            <h2 className="user-title">User Dashboard</h2>
            <ul className="user-menu">
                <li className="user-menu-item">
                    <NavLink 
                        to="/user/user-profile" 
                        className={({ isActive }) => isActive ? "user-active-link" : ""}
                    >
                        <FaUser className="user-sidebar-icon" />
                        <span>My Profile</span>
                    </NavLink>
                </li>
                <li className="user-menu-item">
                    <NavLink 
                        to="/user/booking" 
                        className={({ isActive }) => isActive ? "user-active-link" : ""}
                    >
                        <FaCalendarCheck className="user-sidebar-icon" />
                        <span>My Booking</span>
                    </NavLink>
                </li>
                <li className="user-menu-item">
                    <NavLink 
                        to="user/bookmark" 
                        className={({ isActive }) => isActive ? "user-active-link" : ""}
                    >
                        <FaBookmark className="user-sidebar-icon" />
                        <span>Bookmark</span>
                    </NavLink>
                </li>
                <li className="user-menu-item">
                    <NavLink 
                        to="/settings" 
                        className={({ isActive }) => isActive ? "user-active-link" : ""}
                    >
                        <FaCog className="user-sidebar-icon" />
                        <span>Settings</span>
                    </NavLink>
                </li>
            </ul>
            <div className="user-logout">
                <NavLink 
                    to="/logout"
                    className={({ isActive }) => isActive ? "user-active-link" : ""}
                >
                    <FaSignOutAlt className="user-sidebar-icon" />
                    <span>Logout</span>
                </NavLink>
            </div>
        </div>
    );
};

export default UserSidebar;