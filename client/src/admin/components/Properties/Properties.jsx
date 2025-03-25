import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaDollarSign, FaUserTie } from 'react-icons/fa';
import './properties.css';

const Properties = () => {
  const [properties] = useState([
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "123 Palm Street, Beverly Hills",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      image: "https://example.com/property1.jpg",
      agent: {
        name: "John Doe",
        contact: "+1 234-567-8900"
      },
      status: "For Sale",
      type: "Residential"
    },
    // Add more properties as needed
  ]);

  return (
    <div className="properties-container">
      <motion.h1 
        className="properties-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Properties List
      </motion.h1>

      <div className="properties-grid">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            className="property-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="property-image">
              <img src={property.image} alt={property.title} />
              <span className="property-status">{property.status}</span>
            </div>
            
            <div className="property-details">
              <h3>{property.title}</h3>
              <p className="property-location">
                <FaMapMarkerAlt /> {property.location}
              </p>
              
              <div className="property-specs">
                <span><FaBed /> {property.bedrooms} Beds</span>
                <span><FaBath /> {property.bathrooms} Baths</span>
                <span><FaRuler /> {property.sqft} sqft</span>
              </div>
              
              <div className="property-price">
                <FaDollarSign />
                {property.price.toLocaleString()}
              </div>
              
              <div className="property-agent">
                <FaUserTie />
                <div>
                  <p>{property.agent.name}</p>
                  <small>{property.agent.contact}</small>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Properties;