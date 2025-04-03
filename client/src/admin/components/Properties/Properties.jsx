import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDollarSign, FaUserTie } from "react-icons/fa";
import "./properties.css";
import { PropertiesDataContext } from "../../adminContext/AdminContext";

const Properties = () => {

  const { propertiesData, setPropertiesData } = useContext(
    PropertiesDataContext
  );

  const fetchPropertiesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPropertiesData(data);
      console.log(data);
    } catch (error) {
      console.log("Error fectching properties data : ", error);
    }
  };

  useEffect(() => {
    if (!propertiesData) {
      fetchPropertiesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {propertiesData?.data?.map((property) => (
          <motion.div
            key={property._id}
            className="admin-property-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="property-image">
              <img
                src={`http://localhost:5000${property.images}`}
                alt={property.title}
              />
              <span
                className={`property-status ${
                  property.availabilityStatus ? "available" : "booked"
                } `}
              >
                {property.availabilityStatus ? "Available" : "Booked"}
              </span>
            </div>

            <div className="property-details">
              <h3>{property.title}</h3>
              <p className="property-location">
                <FaMapMarkerAlt />{" "}
                {property.location.city + " " + property.location.area}
              </p>

              <div className="property-specs">
                <span>Description: {property.description}</span>
              </div>

              <div className="property-price">
                <FaDollarSign />
                {property.pricePerMonth.toLocaleString()}
              </div>

              <div className="property-agent">
                <FaUserTie />
                <div>
                  <p>
                    {/* {property.agent.name} */}
                    owner name
                  </p>
                  <small>
                    {/* {property.agent.contact} */}
                    owner contact
                  </small>
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
