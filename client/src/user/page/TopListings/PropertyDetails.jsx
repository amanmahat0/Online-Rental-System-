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
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingRequested, setBookingRequested] = useState(false);
  // Get today's date in a readable format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Destructure the data passed via navigation
  const { title, price, location: propertyLocation, images, description, propertyType, availabilityStatus, contact } = location.state || {};
  const descriptionText = description ? description.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  )) : null;

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch user's saved properties and set bookmark state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser && storedRole && (storedRole === 'User' || storedRole === 'Agent')) {
      const { id: userId } = JSON.parse(storedUser);
      fetch('http://localhost:5000/api/properties/savedProperties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: storedRole }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.data) {
            setIsBookmarked(data.data.some((p) => p._id === id));
          }
        })
        .catch(() => {});
    }
  }, [id]);

  // Save/unsave property (bookmark)
  const toggleBookmark = async (e) => {
    e && e.stopPropagation && e.stopPropagation();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('User not found in localStorage');
      return;
    }
    const storedUserId = JSON.parse(storedUser).id;
    const sendedData = {
      userId: storedUserId,
      propertyId: id,
    };
    const storedRole = localStorage.getItem('role');
    if (storedRole === 'User' || storedRole === 'Agent') {
      try {
        const response = await fetch(
          `http://localhost:5000/api/${storedRole.toLowerCase()}/saveProperties`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendedData),
          }
        );
        if (!response.ok) {
          console.error('Error saving property');
          return;
        }
        const data = await response.json();
        localStorage.setItem(
          'saveProperties',
          JSON.stringify(data.data.saveProperties)
        );
        setIsBookmarked((prev) => !prev);
      } catch (error) {
        console.error('Error saving property:', error);
      }
    }
  };

  // Booking function
  const onClickBookNow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: id,
            customerId: JSON.parse(localStorage.getItem('user')).id,
            role: localStorage.getItem('role'),
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to send booking request');
      }
      await response.json();
      setBookingRequested(true);
    } catch (error) {
      setError('Booking request failed. Please try again.');
    }
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
          <FaArrowLeft />
        </button>
        <div className="property-actions">
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
            <div className="property-title-contact-row">
              <h2 className="property-title">{title}</h2>
            </div>
            <div className="property-details-section">
              <div className="property-details-meta">
                <div>
                  <span className="property-details-meta__item">
                    <span className="property-details-price">
                    <span className="property-details-price">Rs. {price}</span><strong> per Month</strong>
                    </span>
                  </span>
                  <span className="property-details-meta__item">
                    <span className="property-details-meta__label"><strong>Property Type:</strong>
                    <span className="property-details-meta__value">{propertyType}</span>
                    </span>
                  </span>
                  <span className="property-details-meta__item">
                    <span className="property-details-meta__label"><strong>Location: </strong>
                    <span className="property-details-meta__value">{propertyLocation}</span>
                    </span>
                  </span>
                </div>
                <div className='property-details-status-N-contact'>
                  <span className='propertyDetail-status'>
                    <strong>Status:</strong>
                    <span className={`property-status ${availabilityStatus?"available":"booked"}`}>{availabilityStatus?"Available":"Booked"}</span>
                  </span>
                  <span>
                    <div className="property-details-contact-box">
                      <h4 className="property-details-contact-heading">Contact Us</h4>
                      <div className="property-details-contact">
                        <div className="property-details-contact__info">
                          {contact && <span><strong>Phone:</strong> {contact}</span>}
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="property-description-section">
          <h3 className="agreement-heading">Description</h3>
          <p className="property-description">
            {descriptionText || 'No description available for this property.'}
          </p>
        </div>
        <div className="property-agreement-section">
          <h3 className="agreement-heading">Agreement</h3>
          <div className="agreement-content">
            <p>This Rental Agreement is made between <strong>{contact ? contact : 'the Lessor'}</strong> (the "Lessor") and <strong>the Lessee</strong> on this <strong>{formattedDate}</strong>.</p>
            <p>The Lessor agrees to rent the property <strong>{title ? `"${title}"` : ''}</strong> located at <strong>{propertyLocation || 'N/A'}</strong> to the Lessee.</p>
            <p>The property consists of a {propertyType ? propertyType.toLowerCase() : 'property'} with all amenities as described in the listing.</p>
            <p>The lease shall commence upon approval and confirmation, and the Lessee agrees to pay a monthly rent of <strong>${price}</strong> via the agreed payment method. A security deposit, equivalent to one month's rent, shall be paid by the Lessee at the time of signing. This deposit will be refunded within 30 days after lease termination, subject to deductions for damages or unpaid dues.</p>
            <p>The Lessor is responsible for maintaining the exterior and major repairs of the property, while the Lessee is responsible for interior maintenance, utility payments, minor repairs, and ensuring no alterations are made without written consent.</p>
            <p>The lease may be renewed by mutual written agreement before expiration. Either party may terminate the agreement with a 30-day written notice. Early termination by the Lessee may result in the refund of any prepaid rent for unused months.</p>
            <p>By confirming the booking, both parties consent to all terms mentioned above. This agreement shall be valid and legally binding without physical signatures.</p>
          </div>
          <label className="agreement-radio-label">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={() => setAgreementChecked(!agreementChecked)}
              className="agreement-radio"
            />
            I agree to the terms and conditions of booking this property.
          </label>
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            className="property-detail-book-btn"
            aria-label="Book this property"
            disabled={!agreementChecked || bookingRequested}
            style={{ opacity: agreementChecked && !bookingRequested ? 1 : 0.5, cursor: agreementChecked && !bookingRequested ? 'pointer' : 'not-allowed' }}
            onClick={() => {
              onClickBookNow();
              setShowBookingModal(true);
            }}
          >
            Book Now
          </button>
        </div>
        {showBookingModal && (
          <div className="booking-modal-overlay">
            <div className="booking-modal">
              <h2>Booking Request Sent</h2>
              <p>Your booking request has been submitted and is currently pending approval by the property owner or agent.<br/><br/>
              You will receive an email once your booking is approved or declined.</p>
              <p style={{ fontSize: '0.95em', color: '#666', marginTop: '12px' }}>
                <strong>Note:</strong> Once approved, you can proceed to payment from your profile page.
              </p>
              <button className="booking-modal-ok-btn" onClick={() => { setShowBookingModal(false); setBookingRequested(true); }}>OK</button>
            </div>
          </div>
        )}
        {error && (
          <div className="property-details-error-message">{error}</div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
