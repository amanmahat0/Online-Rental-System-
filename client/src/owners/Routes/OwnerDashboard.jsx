import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import OwnerSidebar from '../../owners/Sidebar/OwnerSidebar';
import OwnerProfile from '../../owners/My Profile/OwnerProfile';
import MyListingsOwner from '../../owners/My Listings/MyListingsOwner';
import BookingRequest from '../../agent/BookingRequest/BookingRequest';
import PaymentHistory from '../../Payment History/PaymentHistory';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    
    const toggleSidebar = () => {
            setSidebarActive(!sidebarActive);
        };
    return (
            <div className="owner-dashboard-container">
                <button className="owner-dashboard-toggle-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className={`owner-sidebar-container ${sidebarActive ? 'active' : ''}`}>
                    <OwnerSidebar />
                </div>
                <div className="owner-dashboard-main-content">
                    <Routes>
                        <Route path="/owner/" element={<Navigate to="/owner/profile" replace />} />
                        <Route path="/owner/profile" element={<OwnerProfile />} />
                        <Route path="/owner/mylisting" element={<MyListingsOwner />} />
                        <Route path="/owner/booking-request" element={<BookingRequest />} />
                        {/* <Route path="/owner/booking-requests" element={<OwnerProfile />} /> */}
                        <Route path="/owner/payments" element={<PaymentHistory />} />
                        {/* <Route path="/messages" element={<Messages />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/logout" element={<Logout />} /> */}
                    </Routes>
                </div>
            </div>
        
    );
};

export default OwnerDashboard;