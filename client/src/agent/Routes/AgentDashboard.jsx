import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import AgentSidebar from '../Sidebar/AgentSidebar';
import AgentProfile from '../My Profile/AgentProfile';
import MyListingsAgent from '../My Listings/MyListingsAgent';
import AgentBookings from '../MyBookings/AgentBookings';
import BookingRequest from '../BookingRequest/BookingRequest';
// import Saved from '../Saved/Saved';
import './AgentDashboard.css';
import MyBooking from '../../user/page/UserDashBoard/MyBooking/MyBooking';

const AgentDashboard = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    return (
        <div className="agent-dashboard-container">
            <button className="agent-dashboard-toggle-button" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`agent-sidebar-container ${sidebarActive ? 'active' : ''}`}>
                <AgentSidebar />
            </div>
            <div className="agent-dashboard-main-content">
                <Routes>
                    <Route path="/agent/" element={<Navigate to="/agent/profile" replace />} />
                    <Route path="/agent/profile" element={<AgentProfile />} />
                    <Route path="/agent/listings" element={<MyListingsAgent />} />
                    <Route path="/agent/bookings" element={<MyBooking />} />
                    <Route path="/agent/booking-request" element={<BookingRequest />} />
                    {/* <Route path="/agent/saved" element={<Saved />} /> */}
                    {/* Add any additional agent-specific routes below as needed */}
                </Routes>
            </div>
        </div>
    );
};

export default AgentDashboard;