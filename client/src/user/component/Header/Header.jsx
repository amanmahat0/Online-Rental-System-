import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { UserContext, RoleContext } from "../../Context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const { role } = useContext(RoleContext);
  return (
    <div>
      <header className="landing-header">
        <div className="logo">
          <Link to="/" className="rentIt">
            <img src="/Frame.png" width={40} height={40} alt="map" />
            <p className="rentIt-text">Rent IT</p>
          </Link>
        </div>
        <div className="navigations">
          <nav className="nav-links">
            <Link to="/" className="nav">
              Home
            </Link>
            <Link to="/aboutUs" className="nav">
              About us
            </Link>
            <Link to="/topListings" className="nav">
              Top Listings
            </Link>
          </nav>
        </div>
        {!user ? (
          <div className="login-signup">
            <nav className="nav-links">
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/register" className="signUp">
                Sign Up
              </Link>
            </nav>
          </div>
        ) : (
          <Link to={`/${role}`} className="name-profile">
            {user.name}
          </Link>
        )}
      </header>
    </div>
  );
};

export default Header;
