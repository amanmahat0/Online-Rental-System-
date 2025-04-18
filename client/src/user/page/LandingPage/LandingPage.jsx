import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./LandingPage.css";
import FeatureListing from "./FeatureListing/FeatureListing";
import Rooms from "./Rooms/Rooms";
import OfficeSpaces from "./OfficeSpaces/OfficeSpaces";
import {FaFilter} from "react-icons/fa";
import FilterModal from "./FilterModal/FilterModal";

const LandingPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically make an API call to filter the properties
    console.log('Applied filters:', newFilters);
  };

  return (
    <>
    <div className="landing-container">
      <main className="landing-main">
        <h3>Rent Your Properties</h3>
        <h3>Easily With Rent It</h3>
        <p className="landing-page-small-description">A greate platform to rent your rooms, properties, apartments,</p>
        <p className="landing-page-small-description">apartments.</p>

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

        <div className="home-search-bar">
          <div className="search-input-container">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="landing-page-filter-btn" onClick={handleFilterClick}><FaFilter className="landing-page-search-filter-icon"/></button>
            <button className="search-btn">Browse Properties</button>
          </div>
        </div>
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

    <FilterModal
      isOpen={isFilterOpen}
      onClose={handleCloseFilter}
      onApplyFilters={handleApplyFilters}
    />
    </>
    
  );
};

export default LandingPage;
