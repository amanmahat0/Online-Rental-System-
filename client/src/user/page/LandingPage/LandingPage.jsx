import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./LandingPage.css";
import FeatureListing from "./FeatureListing/FeatureListing";
import Rooms from "./Rooms/Rooms";
import OfficeSpaces from "./OfficeSpaces/OfficeSpaces";

const LandingPage = () => {
  const [propertyCount, setPropertyCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        // If API returns { data: [...] }
        if (data && Array.isArray(data.data)) {
          setPropertyCount(data.data.length);
        } else if (Array.isArray(data)) {
          setPropertyCount(data.length);
        } else {
          setPropertyCount(0);
        }
      })
      .catch(() => setPropertyCount(0));
  }, []);

  return (
    <>
    <div className="landing-container">
      <main className="landing-main">
        <h3>Rent Your Properties</h3>
        <h3>Easily With Rent It</h3>
        <p className="landing-page-small-description">A great platform to rent your rooms, properties, and apartments.</p>
        <ul className="landing-page-points">
          <li>✔️ List your property in minutes</li>
          <li>✔️ Wide reach to potential renters</li>
          <li>✔️ Secure and verified listings</li>
          <li>✔️ Manage bookings and payments online</li>
        </ul>
        {/* <p className="landing-page-small-description">apartments.</p> */}

        <div className="data-container">
          {/* <div className="data">
            <h1>50k+</h1>
            <p>renters</p>
          </div> */}
          <div className="data">
            <h1>{propertyCount !== null ? propertyCount : "..."}</h1>
            <p>properties</p>
          </div>
        </div>
        {/* <div className="label-container">
          <label className="label">Rent</label>
        </div>

        <div className="home-search-bar">
          <div className="search-input-container">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-btn">Browse Properties</button>
          </div>
        </div> */}
      </main>
      
    </div>
    <div>
    <FeatureListing />

    </div>
    <div>
      <Rooms />

    </div>
    <div>
      <OfficeSpaces />
    </div>
    </>
    
  );
};

export default LandingPage;
