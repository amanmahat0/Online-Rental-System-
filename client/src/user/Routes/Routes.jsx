import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../page/LandingPage/LandingPage";
import Register from "../page/Register/Register";
import Login from "../page/Login/Login";
import AdminLogin from "../../admin/pages/AdminLogin";
import TopListings from "../page/TopListings/TopListings";
import PropertyDetails from "../page/TopListings/PropertyDetails";
import UserProfile from "../page/UserDashBoard/MyProfile/UserProfile";
import TermAndCondition from "../component/Footer/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../component/Footer/PrivacyPolicy/PrivacyPolicy";
import Contact from "../component/Footer/Contact/Contact";

// import VerifyEmail from "./VerifyEmail";
// import TopListings from "./TopListings";
import AboutUs from "../page/AboutUs/AboutUs";
// import UserDashboard from "../page/UserDashBoard/UserDashBoard";
import Agent from "../../agent/Agent";
import UserSidebar from "../page/UserDashBoard/Sidebar/UserSidebar";
import UserDashboard from "../page/UserDashBoard/Routes/UserDashboard";
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


    </Routes>
  );
};

export default AppRoutes;
