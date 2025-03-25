import React, { useState } from 'react';
import './Owners.css';

const Owners = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Luxury Apartment',
      address: '123 Main St, Cityville',
      status: 'Available',
      monthlyRent: '$2,500',
      isBooked: false,
      image: '/placeholder-apartment1.jpg'
    },
    {
      id: 2,
      name: 'Cozy Studio',
      address: '456 Elm St, Townsburg',
      status: 'Partially Booked',
      monthlyRent: '$1,200',
      isBooked: true,
      image: '/placeholder-apartment2.jpg'
    },
    {
      id: 3,
      name: 'Modern Loft',
      address: '789 Urban Ave, Metropolis',
      status: 'Available',
      monthlyRent: '$3,000',
      isBooked: false,
      image: '/placeholder-apartment3.jpg'
    }
  ]);

  const [filter, setFilter] = useState('All');
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const filteredProperties = properties.filter(property => {
    if (filter === 'All') return true;
    if (filter === 'Booked') return property.isBooked;
    if (filter === 'Available') return !property.isBooked;
    return true;
  });

  const handleAddProperty = () => {
    setCurrentProperty({
      name: '',
      address: '',
      monthlyRent: '',
      image: '',
      status: 'Available'
    });
    setIsAddPropertyModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setCurrentProperty({...property});
    setIsAddPropertyModalOpen(true);
  };

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter(p => p.id !== propertyId));
  };

  const handleToggleBooking = (propertyId) => {
    setProperties(properties.map(p => 
      p.id === propertyId ? { ...p, isBooked: !p.isBooked } : p
    ));
  };

  const handleSaveProperty = () => {
    if (currentProperty.id) {
      // Edit existing property
      setProperties(properties.map(p => 
        p.id === currentProperty.id ? currentProperty : p
      ));
    } else {
      // Add new property
      setProperties([
        ...properties, 
        { ...currentProperty, id: Date.now() }
      ]);
    }
    setIsAddPropertyModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">RentIT</div>
        <nav>
          <div className="nav-item">My Profile</div>
          <div className="nav-item">My Listings</div>
          <div className="nav-item">Messages</div>
        </nav>
      </div>

      <main className="main-content">
        <header>
          <h1>Welcome Aman</h1>
        </header>

        <div className="listings-section">
          <div className="listings-header">
            <h2>My Listings</h2>
            <div className="filter-buttons">
              <button 
                className={filter === 'All' ? 'active' : ''} 
                onClick={() => setFilter('All')}
              >
                All
              </button>
              <button 
                className={filter === 'Available' ? 'active' : ''} 
                onClick={() => setFilter('Available')}
              >
                Available
              </button>
              <button 
                className={filter === 'Booked' ? 'active' : ''} 
                onClick={() => setFilter('Booked')}
              >
                Booked
              </button>
            </div>
            <button 
              className="add-property-btn" 
              onClick={handleAddProperty}
            >
              Add Property
            </button>
          </div>

          <div className="property-list">
            {filteredProperties.map(property => (
              <div key={property.id} className="property-card">
                <img 
                  src={property.image || '/default-property.jpg'} 
                  alt={property.name} 
                  className="property-image"
                />
                <div className="property-details">
                  <h3>{property.name}</h3>
                  <p>{property.address}</p>
                  <p className="rent">{property.monthlyRent}</p>
                  <div className={`status ${property.isBooked ? 'booked' : 'available'}`}>
                    {property.isBooked ? 'Booked' : 'Available'}
                  </div>
                </div>
                <div className="property-actions">
                  <button onClick={() => handleEditProperty(property)}>Edit</button>
                  <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                  <button onClick={() => handleToggleBooking(property.id)}>
                    {property.isBooked ? 'Unbook' : 'Book'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isAddPropertyModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentProperty.id ? 'Edit Property' : 'Add New Property'}</h2>
            <input 
              placeholder="Property Name"
              value={currentProperty.name || ''}
              onChange={(e) => setCurrentProperty({
                ...currentProperty, 
                name: e.target.value
              })}
            />
            <input 
              placeholder="Address"
              value={currentProperty.address || ''}
              onChange={(e) => setCurrentProperty({
                ...currentProperty, 
                address: e.target.value
              })}
            />
            <input 
              placeholder="Monthly Rent"
              value={currentProperty.monthlyRent || ''}
              onChange={(e) => setCurrentProperty({
                ...currentProperty, 
                monthlyRent: e.target.value
              })}
            />
            <input 
              placeholder="Image URL"
              value={currentProperty.image || ''}
              onChange={(e) => setCurrentProperty({
                ...currentProperty, 
                image: e.target.value
              })}
            />
            <div className="modal-actions">
              <button onClick={() => setIsAddPropertyModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSaveProperty}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owners;