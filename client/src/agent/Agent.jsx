import React, { useState, useRef } from "react";
import "./Agent.css"; // Import CSS for styling

const Agent = () => {

  // State to track the active section (Listings, Profile, Messages, Settings)
const [activeSection, setActiveSection] = useState("Listings");

// State for filtering properties
const [filter, setFilter] = useState("All");

// State for search query
const [searchQuery, setSearchQuery] = useState("");

// State for sorting option
const [sortOption, setSortOption] = useState("name");

// State for pagination
const [currentPage, setCurrentPage] = useState(1);
const propertiesPerPage = 5; // Number of properties per page

// State for managing properties
const [properties, setProperties] = useState([
  {
    id: 1,
    name: "Luxury Apartment",
    address: "123 Main St, Cityville",
    status: "Available",
    monthlyRent: "$2,500",
    isBooked: false,
    images: [],
  },
  {
    id: 2,
    name: "Cozy Studio",
    address: "456 Elm St, Townsburg",
    status: "Partially Booked",
    monthlyRent: "$1,200",
    isBooked: true,
    images: [],
  },
  {
    id: 3,
    name: "Modern Loft",
    address: "789 Urban Ave, Metropolis",
    status: "Available",
    monthlyRent: "$3,000",
    isBooked: false,
    images: [],
  }
]);

// State for Add Property Modal
const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
const [currentProperty, setCurrentProperty] = useState(null);
const fileInputRef = useRef(null);

// State for displaying selected property details
const [selectedProperty, setSelectedProperty] = useState(null);

// Filtered and sorted properties
const filteredProperties = properties
  .filter((property) => {
    if (filter === "All") return true;
    if (filter === "Booked") return property.isBooked;
    if (filter === "Available") return !property.isBooked;
    if (filter === "Partially Booked") return property.status === "Partially Booked";
    return true;
  })
  .filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "price")
      return parseInt(a.monthlyRent.replace(/\D/g, "")) - parseInt(b.monthlyRent.replace(/\D/g, ""));
    if (sortOption === "status") return a.status.localeCompare(b.status);
    return 0;
  });

// Pagination Logic
const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
const paginatedProperties = filteredProperties.slice(
  (currentPage - 1) * propertiesPerPage,
  currentPage * propertiesPerPage
);

// Handle image upload (multiple images)
const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files) {
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setCurrentProperty((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  }
};

// Handle adding a new property
const handleAddProperty = () => {
  if (currentProperty) {
    if (currentProperty.id) {
      // Edit existing property
      setProperties((prev) =>
        prev.map((property) =>
          property.id === currentProperty.id ? { ...currentProperty, images: currentProperty.images } : property
        )
      );
    } else {
      // Add new property
      const newProperty = { ...currentProperty, id: properties.length + 1, images: currentProperty.images };
      setProperties((prev) => [...prev, newProperty]);
    }
    setIsAddPropertyModalOpen(false);
    setCurrentProperty(null);
  }
};

// Handle editing a property
const handleEditProperty = (property) => {
  setCurrentProperty(property);
  setIsAddPropertyModalOpen(true); // Open the modal for editing
};

// Handle deleting a property
const handleDeleteProperty = (propertyId) => {
  setProperties(properties.filter((property) => property.id !== propertyId));
};

// Handle displaying property details when clicked
const handlePropertyClick = (property) => {
  setSelectedProperty(property);
};

// Close property details modal
const closePropertyDetails = () => {
  setSelectedProperty(null);
};



  // State for messages
  const [messages, setMessages] = useState([
    {
      sender: "John Doe",
      preview: "Is the apartment still available?",
      time: "10:30 AM",
    },
    {
      sender: "Jane Smith",
      preview: "Can we schedule a viewing?",
      time: "2:15 PM",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
const [editedUser, setEditedUser] = useState({
  name: "Aman Sharma",
  role: "Agent",
  email: "aman.sharma@example.com",
  phone: "+1 (555) 123-4567"
});

const handleEditProfile = () => {
  setIsEditing(!isEditing);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedUser((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleSaveChanges = () => {
  setIsEditing(false);
  // Logic to save the changes, e.g., update the user's profile in state or API
};
const handleCancelEdit = () => {
  // When cancel is clicked, revert to the original profile data
  setEditedUser({
    name: "Aman Sharma",
    role: "Agent",
    email: "aman.sharma@example.com",
    phone: "+1 (555) 123-4567"
  });
  setIsEditing(false);
};



  // Render Add Property Modal
  const renderAddPropertyModal = () => {
    if (!isAddPropertyModalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add New Property</h2>
          <input
            type="text"
            placeholder="Property Name"
            value={currentProperty?.name || ""}
            onChange={(e) =>
              setCurrentProperty((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={currentProperty?.address || ""}
            onChange={(e) =>
              setCurrentProperty((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Monthly Rent"
            value={currentProperty?.monthlyRent || ""}
            onChange={(e) =>
              setCurrentProperty((prev) => ({
                ...prev,
                monthlyRent: e.target.value,
              }))
            }
          />
          <div className="property-image-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="upload-image-btn"
            >
              Upload Image
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
            <button onClick={handleAddProperty} className="add-btn">
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

  return (
    <div className="agent-dashboard-container">
      {/* Sidebar Navigation */}
      <div className="agent-sidebar">
        {/* <h2 className="logo">
          <img src="/Frame.png" height={30} width={30} alt="Logo" />Rent It
        </h2> */}
        <p className="welcome-owner">Welcome Agent</p>
        <div
          className={`nav-item ${activeSection === "Profile" ? "active" : ""}`}
          onClick={() => setActiveSection("Profile")}
        >
          <img
            src="/profile-icon.png"
            height={30}
            width={30}
            className="nav-icons"
            alt="Profile"
          />
          <p className="agent-side-nav">My Profile</p>
        </div>
        <div
          className={`nav-item ${activeSection === "Listings" ? "active" : ""}`}
          onClick={() => setActiveSection("Listings")}
        >
          <img
            src="/listing.png"
            height={30}
            width={30}
            className="nav-icons"
            alt="Listings"
          />
          <p className="agent-side-nav">My Listings</p>
        </div>
        <div
          className={`nav-item ${activeSection === "Messages" ? "active" : ""}`}
          onClick={() => setActiveSection("Messages")}
        >
          <img
            src="/messages.png"
            height={30}
            width={30}
            className="nav-icons"
            alt="Messages"
          />
          <p className="agent-side-nav">Messages</p>
        </div>
        <div
          className={`nav-item ${activeSection === "Settings" ? "active" : ""}`}
          onClick={() => setActiveSection("Settings")}
        >
          <img
            src="/setting.png"
            height={30}
            width={30}
            className="nav-icons"
            alt="Settings"
          />
          <p className="agent-side-nav">Settings</p>
        </div>
        <div
          className="nav-item logout"
          onClick={() => {
            alert("Logged out successfully");
          }}
        >
          <img
            src="/logout-logo.png"
            height={30}
            width={30}
            className="nav-icons"
            alt="Logout"
          />
          <p className="agent-side-nav">Logout</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="agent-main-content">
      {activeSection === "Listings" && (
  <div className="section-container">
    <div className="listings-section">
      <div className="listings-header">
        <h2>My Listings</h2>

        {/* Search Bar */}
        {/* <input
          type="text"
          placeholder="Search properties..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}

        <div className="filter-buttons">
          <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>
            All
          </button>
          <button className={filter === "Available" ? "active" : ""} onClick={() => setFilter("Available")}>
            Available
          </button>
          <button className={filter === "Booked" ? "active" : ""} onClick={() => setFilter("Booked")}>
            Booked
          </button>
        </div>

        {/* Sorting Options */}
        <select className="sort-dropdown" onChange={(e) => setSortOption(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="status">Sort by Status</option>
        </select>

        <button
          className="add-property-btn"
          onClick={() => {
            setCurrentProperty({ name: "", address: "", monthlyRent: "", status: "Available", images: [] });
            setIsAddPropertyModalOpen(true);
          }}
        >
          + Add Property
        </button>
      </div>

      <hr />
      <br />

      <div className="property-list">
        {paginatedProperties.map((property) => (
          <div
            key={property.id}
            className="property-card"
            onClick={() => handlePropertyClick(property)} // Added click handler
          >
            <img
              src={property.images.length > 0 ? property.images[0] : "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              alt={property.name}
              className="property-image"
            />

            <div className="property-details">
              <h3>{property.name}</h3>
              <p>{property.address}</p>
              <p className="rent">{property.monthlyRent}</p>

              {/* Tooltip on status hover */}
              <div
                className={`status ${property.isBooked ? "booked" : "available"}`}
                title={property.isBooked ? "This property is booked." : "This property is available for rent."}
              >
                {property.isBooked ? "Booked" : "Available"}
              </div>

              {/* Edit and Delete Buttons */}
              <div className="property-actions">
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEditProperty(property); }}>✏️ Edit</button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteProperty(property.id); }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅ Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next ➡</button>
      </div> */}
    </div>
  </div>
)}

{/* Property Details Modal (Show More Details) */}
{selectedProperty && (
  <div className="property-details-modal">
    <h3>{selectedProperty.name}</h3>
    <p>{selectedProperty.address}</p>
    <p>{selectedProperty.monthlyRent}</p>
    <p>{selectedProperty.status}</p>
    
    {/* Display multiple images */}
    <div className="property-images">
      {selectedProperty.images.map((image, index) => (
        <img key={index} src={image} alt={`Property Image ${index + 1}`} />
      ))}
    </div>
    
    {/* Close details */}
    <button onClick={() => setSelectedProperty(null)}>Close</button>
  </div>
)}



        {/* Other sections like Profile, Messages, and Settings */}
        {/* ...existing code for other sections... */}
        {activeSection === "Settings" && (
          <div className="section-container">
            <div className="settings-section">
              <h2>Account Settings</h2>
              <hr/>
              <br/>
              <div className="settings-options">
                <div className="setting-item">
                  <h3>Notification Preferences</h3>
                  <div className="toggle-switch">
                    <span>Email Notifications</span>
                    <input type="checkbox" />
                  </div>
                  {/* <div className="toggle-switch">
                    <span>SMS Notifications</span>
                    <input type="checkbox" />
                  </div> */}
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
        )}

        {/* {activeSection === "Profile" && (
          <div className="profile-section">
            <h2>My Profile</h2>
            <hr/>
            
            <br/>
            <h3>Aman Sharma</h3>
            <p>
              <strong>Role:</strong> Property Owner
            </p>
            <p>
              <strong>Email:</strong> aman.sharma@example.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Registered Properties:</strong> {properties.length}
            </p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        )} */}
        {activeSection === "Profile" && (
          <div className="profile-section">
            <img src="/profile-icon.png" height={50} width={50}/>
            {/* <h2>My Profile</h2> */}
            <hr />

            <br />
            {isEditing ? (
              <>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={editedUser.role}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="save-profile-btn" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{editedUser.name || "Aman Sharma"}</h3>
                <p>
                  <strong>Role:</strong> {editedUser.role || "Property Owner"}
                </p>
                <p>
                  <strong>Email:</strong> {editedUser.email || "aman.sharma@example.com"}
                </p>
                <p>
                  <strong>Phone:</strong> {editedUser.phone || "+1 (555) 123-4567"}
                </p>
                <p>
                  <strong>Registered Properties:</strong> {properties.length || 0}
                </p>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        )}


        {activeSection === "Messages" && (
          <div className="messages-section">
            <h2>Messages</h2>
            <hr/>
            <br/>
            <div className="message-list">
              {messages.map((message, index) => (
                <div key={index} className="message-item">
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-preview">{message.preview}</div>
                  <div className="message-time">{message.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        
      </div>

      {/* Add Property Modal */}
      {renderAddPropertyModal()}
    </div>
  );
};

export default Agent;