import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';  // Adjust the import if necessary
import Dashboard from '../components/Dashboard/dashboard';  // Adjust the import if necessary
import Agents from '../components/Agents/Agents';  // Adjust the import if necessary
// import ManageTeam from '../components/ManageTeam/ManageTeam';  // Adjust the import if necessary
import Properties from '../components/Properties/Properties';  // Adjust the import if necessary
import Users from '../components/Users/Users';  // Adjust the import if necessary
import Owners from '../components/Owners/Owners';

const AdminRoutes = () => {
  const location = useLocation();

  // If the current route is "/admin", render only AdminLogin
  if (location.pathname === "/admin") {
    return <AdminLogin />;
  }

  // Otherwise, render the main layout (Sidebar + Routes)
  return (
    <Routes>
      <Route path="/admin/home" element={<Dashboard />} />
      <Route path="/admin/agents" element={<Agents />} />
      {/* <Route path="/admin/manage-team" element={<ManageTeam />} /> */}
      <Route path="/admin/properties" element={<Properties />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/owner-profile" element={<Owners />} />
    </Routes>
  );
};

export default AdminRoutes;
