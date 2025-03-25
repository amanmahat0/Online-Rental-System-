import React from "react";
// import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <main className="landing-main">
        <h3>Rent Your Properties</h3>
        <h3>Easily With Rent It</h3>
        <p>A greate platform to rent your rooms, properties, apartments,</p>
        <p>apartments.</p>

        <div className="data-container">
          <div className="data">
            <h1>50k+</h1>
            <p>renters</p>
          </div>
          <div className="data">
            <h1>10k+</h1>
            <p>properties</p>
          </div>
        </div>
        <div className="label-container">
          <label className="label">Rent</label>
        </div>

        <div className="search-bar">
          <div className="search-input-container">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-btn">Browse Properties</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
