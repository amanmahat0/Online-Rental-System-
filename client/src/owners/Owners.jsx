import React, { useState, useRef } from 'react';
import { 
  Home, 
  User, 
  MessageSquare, 
  PlusCircle, 
  Check, 
  X,
  Filter,
  Settings,
  LogOut,
  Upload 
} from 'lucide-react';
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
      image: null
    },
    {
      id: 2,
      name: 'Cozy Studio',
      address: '456 Elm St, Townsburg',
      status: 'Partially Booked',
      monthlyRent: '$1,200',
      isBooked: true,
      image: null
    },
    {
      id: 3,
      name: 'Modern Loft',
      address: '789 Urban Ave, Metropolis',
      status: 'Available',
      monthlyRent: '$3,000',
      isBooked: false,
      image: null
    }
  ]);

  const [activeSection, setActiveSection] = useState('listings');
  const [filter, setFilter] = useState('All');
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const fileInputRef = useRef(null);

  const filteredProperties = properties.filter(property => {
    if (filter === 'All') return true;
    if (filter === 'Booked') return property.isBooked;
    if (filter === 'Available') return !property.isBooked;
    return true;
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProperty(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProperty = () => {
    if (currentProperty) {
      const newProperty = {
        ...currentProperty,
        id: properties.length + 1
      };
      setProperties(prev => [...prev, newProperty]);
      setIsAddPropertyModalOpen(false);
      setCurrentProperty(null);
    }
  };

  const renderAddPropertyModal = () => {
    if (!isAddPropertyModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add New Property</h2>
          <input 
            type="text" 
            placeholder="Property Name" 
            value={currentProperty?.name || ''}
            onChange={(e) => setCurrentProperty(prev => ({
              ...prev, 
              name: e.target.value
            }))}
          />
          <input 
            type="text" 
            placeholder="Address" 
            value={currentProperty?.address || ''}
            onChange={(e) => setCurrentProperty(prev => ({
              ...prev, 
              address: e.target.value
            }))}
          />
          <input 
            type="text" 
            placeholder="Monthly Rent" 
            value={currentProperty?.monthlyRent || ''}
            onChange={(e) => setCurrentProperty(prev => ({
              ...prev, 
              monthlyRent: e.target.value
            }))}
          />
          <div className="property-image-upload">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="upload-image-btn"
            >
              <Upload size={20} /> Upload Image
            </button>
            {currentProperty?.image && (
              <img 
                src={currentProperty.image} 
                alt="Property" 
                className="uploaded-preview"
              />
            )}
          </div>
          <div className="modal-actions">
            <button 
              onClick={handleAddProperty}
              className="add-btn"
            >
              Add Property
            </button>
            <button 
              onClick={() => {
                setIsAddPropertyModalOpen(false);
                setCurrentProperty(null);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="section-container">
            <div className="profile-section">
              <h2>My Profile</h2>
              <div className="profile-details">
                <div className="profile-avatar">
                  <User size={100} />
                </div>
                <div className="profile-info">
                  <h3>Aman Sharma</h3>
                  <p><strong>Role:</strong> Property Owner</p>
                  <p><strong>Email:</strong> aman.sharma@example.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Registered Properties:</strong> {properties.length}</p>
                  <button className="edit-profile-btn">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="section-container">
            <div className="messages-section">
              <h2>Messages</h2>
              <div className="message-list">
                {[
                  { sender: 'John Doe', preview: 'Interested in Luxury Apartment', time: '2 hours ago' },
                  { sender: 'Jane Smith', preview: 'Availability for Cozy Studio?', time: 'Yesterday' },
                  { sender: 'Mike Johnson', preview: 'Request for Modern Loft viewing', time: '3 days ago' }
                ].map((message, index) => (
                  <div key={index} className="message-item">
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-preview">{message.preview}</div>
                    <div className="message-time">{message.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="section-container">
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="settings-options">
                <div className="setting-item">
                  <h3>Notification Preferences</h3>
                  <div className="toggle-switch">
                    <span>Email Notifications</span>
                    <input type="checkbox" />
                  </div>
                  <div className="toggle-switch">
                    <span>SMS Notifications</span>
                    <input type="checkbox" />
                  </div>
                </div>
                <div className="setting-item">
                  <h3>Security</h3>
                  <div className="settings-buttons">
                    <button className="settings-btn">Change Password</button>
                    <button className="settings-btn">Two-Factor Authentication</button>
                  </div>
                </div>
                <div className="setting-item">
                  <h3>Preferences</h3>
                  <div className="toggle-switch">
                    <span>Dark Mode</span>
                    <input type="checkbox" />
                  </div>
                  <div className="toggle-switch">
                    <span>Language</span>
                    <select>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'listings':
      default:
        return (
          <div className="section-container">
            <div className="listings-section">
              <div className="listings-header">
                <h2>My Listings</h2>
                <div className="filter-buttons">
                  <button 
                    className={filter === 'All' ? 'active' : ''} 
                    onClick={() => setFilter('All')}
                  >
                    <Filter /> All
                  </button>
                  <button 
                    className={filter === 'Available' ? 'active' : ''} 
                    onClick={() => setFilter('Available')}
                  >
                    <Check /> Available
                  </button>
                  <button 
                    className={filter === 'Booked' ? 'active' : ''} 
                    onClick={() => setFilter('Booked')}
                  >
                    <X /> Booked
                  </button>
                </div>
                <button 
                  className="add-property-btn" 
                  onClick={() => {
                    setCurrentProperty({
                      name: '',
                      address: '',
                      monthlyRent: '',
                      image: null,
                      status: 'Available'
                    });
                    setIsAddPropertyModalOpen(true);
                  }}
                >
                  <PlusCircle /> Add Property
                </button>
              </div>

              <div className="property-list">
                {filteredProperties.map(property => (
                  <div key={property.id} className="property-card">
                    <img 
                      src={property.image || 'https://via.placeholder.com/250x200'} 
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <Home className="logo-icon" />
          RentIT
        </div>
        <nav>
          {[
            { section: 'profile', icon: User, label: 'My Profile' },
            { section: 'listings', icon: Home, label: 'My Listings' },
            { section: 'messages', icon: MessageSquare, label: 'Messages' },
            { section: 'settings', icon: Settings, label: 'Settings' }
          ].map(({ section, icon: Icon, label }) => (
            <div 
              key={section}
              className={`nav-item ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              <Icon className="nav-icon" />
              {label}
            </div>
          ))}
        </nav>
        <div 
          className="sidebar-footer nav-item logout"
          onClick={() => {
            alert('Logged out successfully');
          }}
        >
          <LogOut className="nav-icon" />
          Logout
        </div>
      </div>

      <main className="main-content">
        <header>
          <h1>Welcome Aman</h1>
        </header>

        {renderActiveSection()}
        {renderAddPropertyModal()}
      </main>
    </div>
  );
};

export default Owners;