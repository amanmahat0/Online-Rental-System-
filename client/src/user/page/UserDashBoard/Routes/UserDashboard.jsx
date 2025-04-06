import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import UserSidebar from '../Sidebar/UserSidebar';
import UserProfile from '../MyProfile/UserProfile';
import SavedProperties from '../Saved/SavedProperties';
import MyBooking from '../MyBooking/MyBooking';
import './UserDashboard.css';

const UserDashboard = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    
    const toggleSidebar = () => {
            setSidebarActive(!sidebarActive);
        };
    return (
            <div className="user-dashboard-container">
                <button className="user-dashboard-toggle-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className={`user-sidebar-container ${sidebarActive ? 'active' : ''}`}>
                    <UserSidebar />
                </div>
                <div className="user-dashboard-main-content">
                    <Routes>
                        <Route path="/user/" element={<Navigate to="/user/user-profile" replace />} />
                        <Route path="/user/user-profile" element={<UserProfile />} />
                        <Route path="/user/saved" element={<SavedProperties />} />
                        <Route path="/user/mybooking" element={<MyBooking />} />
                        {/* <Route path="/owner/mylisting" element={<MyListingsOwner />} /> */}
                        {/* <Route path="/messages" element={<Messages />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/logout" element={<Logout />} /> */}
                    </Routes>
                </div>
            </div>
        
    );
};

export default UserDashboard;