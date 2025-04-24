import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Destructure the data passed via navigation
  const { title, price, location: propertyLocation, images, description, propertyType, status, contact } = location.state || {};

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (isLoading) {
    return (
      <div className="property-details-container loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!location.state) {
    return (
      <div className="property-details-container error">
        <h2>Property Not Found</h2>
        <p>We couldn't find the property details you're looking for.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-details-header">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          <FaArrowLeft /> Back
        </button>
        
        <div className="property-actions">
          <button 
            className="property-detail-book-btn"
            aria-label="Book this property"
          >
            Book Now
          </button>
          <button 
            className="property-detail-save-btn"
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked ? <FaBookmark className='property-details-bookmark-btn'/> : <FaRegBookmark className='property-details-bookmark-btn'/>}
          </button>
        </div>
      </div>
      
      <div className="property-details-content">
        <div className="property-details-main">
          <div className="property-details-image-container">
            {images ? (
              <img 
                src={`http://localhost:5000${images}`} 
                alt={title || 'Property image'} 
                className="details-property-image"
                loading="lazy"
              />
            ) : (
              <div className="property-image-placeholder">
                No image available
              </div>
            )}
          </div>

          <div className="property-details-info">
            <div className="property-details-section">
              <h2 className="property-title">{title}</h2>
              <div className="property-meta">
                <span className="property-details-price">${price}</span>
                <span className="property-details-type">{propertyType}</span>
                <span className="property-status">{status}</span>
              </div>
              <p className="property-location">
                <FaMapMarkerAlt className="location-icon" /> {propertyLocation}
              </p>
            </div>

            <div className="property-contact-section">
              <h3>Contact Information</h3>
              <div className="contact-details">
                {contact && <p><strong>Phone:</strong> {contact}</p>}
                
              </div>
            </div>
          </div>
        </div>

        <div className="property-description-section">
          <h3>Description</h3>
          <p className="property-description">
            {description || 'No description available for this property.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
