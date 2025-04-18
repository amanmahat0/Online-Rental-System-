import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <h2>Filter Properties</h2>
        <div className="filter-section">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>
        
        <div className="filter-section">
          <label>Property Type</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="office">Office Space</option>
            <option value="room">Room</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Price Range</label>
          <div className="price-range">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min price"
            />
            <span>to</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max price"
            />
          </div>
        </div>

        <div className="filter-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 