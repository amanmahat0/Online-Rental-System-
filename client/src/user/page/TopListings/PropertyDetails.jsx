import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure the data passed via navigation
  const { title, price, location: propertyLocation, imageUrl, description, propertyType, avaibility, contact, ownerName, agentName } = location.state || {};

  return (
    <div className="property-details-container">
      <div className='property-details-buttons-section'>
      <div className='property-details-back-btn'>
      <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back
        </button>
      </div>
        
        <div className='property-book-save-button'>
        <button className='property-detail-book-btn'>Book</button>
        <button className='property-detail-save-btn'><img src='/bookmark.png' height={30} width={25}/></button>
        </div>
      </div>
      
        
      
      
      {/* Display the details of the property */}
      <div className='property-details-card-grids'>
      <div className='property-details-image-container'>
      {imageUrl && <img src={imageUrl} alt={title} className="details-property-image"/>}
      </div>
      <div className='property-details-1'>
        <div className='property-detail-agent-info'>
        <strong>Agent Info</strong>
        </div>
      
      {contact && <p><strong>Contact:</strong>{contact}</p>}
      
      <p><strong>Email:</strong>sample@example.com</p>
      {/* {ownerName && <p><strong>Owner:</strong>{ownerName}</p>}
      {agentName && <p><strong>Agent:</strong>{agentName}</p>} */}
      </div>
      
      <div className='property-details-2'>
      
      <div>
      <h3>Property Details</h3>
      {title && <p>{title}</p>}
      {avaibility && <p><strong>Status:</strong>{avaibility}</p>}
      
      {description && <p><strong>Description:</strong> {description}</p>}

      </div>
      <div>
      {price && <p className='property-details-price'><strong>Price:</strong> {price}</p>}
      {propertyLocation && <p><strong>Location:</strong> {propertyLocation}</p>}
      {propertyType && <p><strong>Property Type:</strong>{propertyType}</p>}
      </div>
        
      </div>
      </div>
      
    </div>
  );
};

export default PropertyDetails;
