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
import OwnerSidebar from "../owners/Sidebar/OwnerSidebar";
import PropertyDetails from "../user/page/TopListings/PropertyDetails";
import UserProfile from "../user/page/UserDashBoard/MyProfile/UserProfile";
import TermAndCondition from "../user/component/Footer/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../user/component/Footer/PrivacyPolicy/PrivacyPolicy";
import Contact from "../user/component/Footer/Contact/Contact";

// Payment Routes
import PaymentGateway from "../Payment/PaymentGateway";
import SuccessModal from "../Payment/modals/SuccessModal";
import FailureModal from "../Payment/modals/FailureModal";
import Receipt from "../Payment/Receipt";



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
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
      <Route path="/toplistings" element={<TopListings />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/owner" element={<OwnerSidebar />} />
      <Route path="/TopListings/:id" element={<PropertyDetails />} />
      {/* <Route path="/booking/:id" element={<BookingPage />} /> */}
      {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}

      <Route path="/user" element={<UserSidebar />} />
      <Route path="/user/user-profile" element={<UserProfile/>} />
      <Route path="/termsAndCondition" element={<TermAndCondition />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />

      {/* Payment Routes */}
      <Route path="/payment" element={<PaymentGateway />} />
      <Route path="/payment/success" element={<SuccessModal />} />
      <Route path="/payment/failure" element={<FailureModal />} />
      <Route path="/payment/receipt" element={<Receipt />} />

      {/* User Dashboard Routes */}


      {/* <Route path="/Owner" element={<OwnerSidebar />} /> */}

    </Routes>
  );
};

export default AppRoutes;
