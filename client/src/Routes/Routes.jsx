import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "../user/page/LandingPage/LandingPage";
import Register from "../user/page/Register/Register";
import Login from "../user/page/Login/Login";
import AdminLogin from "../admin/pages/AdminLogin";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import TopListings from "../user/page/TopListings/TopListings";

// import VerifyEmail from "./VerifyEmail";
// import TopListings from "./TopListings";
import AboutUs from "../user/page/AboutUs/AboutUs";
import UserSidebar from "../user/page/UserDashBoard/Sidebar/UserSidebar";
import UserDashboard from "../user/page/UserDashBoard/Routes/UserDashboard";
import Agent from "../agent/Agent";
import OwnerSidebar from "../owners/Sidebar/OwnerSidebar";
import PropertyDetails from "../user/page/TopListings/PropertyDetails";
import UserProfile from "../user/page/UserDashBoard/MyProfile/UserProfile";
import TermAndCondition from "../user/component/Footer/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../user/component/Footer/PrivacyPolicy/PrivacyPolicy";
import Contact from "../user/component/Footer/Contact/Contact";



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
      <Route path="/TopListings/:id" element={<PropertyDetails />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}
      <Route path="/Agent" element={<Agent />} />

      <Route path="/user" element={<UserSidebar />} />
      <Route path="/user/user-profile" element={<UserProfile/>} />
      <Route path="/termsAndCondition" element={<TermAndCondition />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />


      {/* <Route path="/Owner" element={<OwnerSidebar />} /> */}


    </Routes>
  );
};

export default AppRoutes;
