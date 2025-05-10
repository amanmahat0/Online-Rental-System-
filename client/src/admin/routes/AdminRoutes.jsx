import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';  // Adjust path if needed
import Dashboard from '../components/Dashboard/dashboard';
import Agents from '../components/Agents/Agents';
import Properties from '../components/Properties/Properties';
import Users from '../components/Users/Users';
import Owners from '../components/Owners/Owners';

const AdminRoutes = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('adminToken'); // Check token/flag

  if (location.pathname === "/admin") {
    if (isAuthenticated) {
      return <Navigate to="/admin/home" replace />;
    }
    return <AdminLogin />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Routes>
      <Route path="/admin/home" element={<Dashboard />} />
      <Route path="/admin/agents" element={<Agents />} />
      <Route path="/admin/properties" element={<Properties />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/owner-profile" element={<Owners />} />
    </Routes>
  );
};

export default AdminRoutes;
