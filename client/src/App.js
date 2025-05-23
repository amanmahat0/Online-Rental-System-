import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./user/component/Header/Header";
import Footer from "./user/component/Footer/Footer";
import AppRoutes from "./Routes/Routes";
import AdminRoutes from "./admin/routes/AdminRoutes";
import Sidebar from "./admin/components/layout/Sidebar";
import { UserProvider } from "./user/Context/UserContext";
import { AdminDataProvider } from "./admin/adminContext/AdminContext";
import UserDashboard from "./user/page/UserDashBoard/Routes/UserDashboard";
import OwnerDashboard from "./owners/Routes/OwnerDashboard";
import AgentDashboard from "./agent/Routes/AgentDashboard";

const AppWithLocation = () => {
  const location = useLocation(); // Get the current route

  // Check if the current route is login or register
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotpassword";
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if the current route is admin
  const isAdminLoginPage = location.pathname === "/admin"; // Check if the current route is admin login
  const isUserRoute = location.pathname.startsWith("/user");
  const isOwnerRoute = location.pathname.startsWith("/owner"); // Check if the current route is owner
  const isAgentRoute = location.pathname.startsWith("/agent"); // Check if the current route is agent

  return isAdminRoute ? (
    <div className="App">
      {!isAdminLoginPage && <Sidebar />}{" "}
      {/* Render Sidebar only if not on Admin Login */}
      <div
        className={`admin-main-content ${isAdminLoginPage ? "full-width" : ""}`}
      >
        <AdminRoutes /> {/* Admin-specific routes */}
      </div>
    </div>
  ) : isUserRoute ? (
    <div className="app-container">
      {!hideHeaderFooter && <Header />} {/* Conditionally render Header */}
      <main className="app-main">
        <UserDashboard /> {/* User-specific dashboard */}
      </main>
      {!hideHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  ) : isOwnerRoute ? (
    <div className="app-container">
      {!hideHeaderFooter && <Header />} {/* Conditionally render Header */}
      <main className="app-main">
        <OwnerDashboard /> {/* Owner-specific dashboard */}
      </main>
      {!hideHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  ) : isAgentRoute ? (
    <div className="app-container">
      {!hideHeaderFooter && <Header />} {/* Conditionally render Header */}
      <main className="app-main">
        <AgentDashboard /> {/* Agent-specific dashboard */}
      </main>
      {!hideHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  ) : (
    <div className="app-container">
      {!hideHeaderFooter && <Header />} {/* Conditionally render Header */}
      <main className="app-main">
        <AppRoutes /> {/* User-specific routes */}
      </main>
      {!hideHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

const App = () => {
  return (
    <AdminDataProvider>
      <UserProvider>
        <Router>
          <AppWithLocation />
        </Router>
      </UserProvider>
    </AdminDataProvider>
  );
};

export default App;
