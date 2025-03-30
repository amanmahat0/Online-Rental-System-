import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../page/LandingPage/LandingPage";
import Register from "../page/Register/Register";
import Login from "../page/Login/Login";
import AdminLogin from "../../admin/pages/AdminLogin";
import ForgotPassword from "../../ForgotPassword/ForgotPassword";
import TopListings from "../page/TopListings/TopListings";

// import VerifyEmail from "./VerifyEmail";
// import TopListings from "./TopListings";
import AboutUs from "../page/AboutUs/AboutUs";
import UserDashboard from "../page/UserDashBoard/UserDashBoard";
import Agent from "../../agent/Agent";
import OwnerSidebar from "../../owners/Sidebar/OwnerSidebar";


const AppRoutes = () => {
  const location = useLocation();
  if (location.pathname === "/admin") {
    return <AdminLogin />;
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
      <Route path="/TopListings" element={<TopListings />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/Agent" element={<Agent />} />
      <Route path="/Owner" element={<OwnerSidebar />} />

    </Routes>
  );
};

export default AppRoutes;
