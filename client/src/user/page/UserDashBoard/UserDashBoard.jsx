import { useState } from "react";
import './UserDashBoard.css';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
  });
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      name: "Luxury Apartment",
      location: "Downtown",
      price: "$1200/month",
    },
    { id: 2, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
    { id: 3, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
    { id: 4, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
    { id: 5, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
    { id: 6, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
    { id: 7, name: "Cozy Studio", location: "Suburb", price: "$800/month" },
  ]);
  const [passwordData, setPasswordData] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  // Function to update profile details
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const editProfile = () => {
    alert("Profile Updated!");
  };

  // Toggle password section visibility
  const togglePassword = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  // Update password function
  const updatePassword = () => {
    const { currentPass, newPass, confirmPass } = passwordData;

    if (!currentPass || !newPass || !confirmPass) {
      alert("Please fill in all password fields");
    } else if (newPass !== confirmPass) {
      alert("New passwords do not match");
    } else {
      alert("Password updated successfully!");
    }
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handle property booking
  const bookProperty = () => {
    alert("Booking Confirmed!");
  };

  // Remove a saved property
  const removeProperty = (id) => {
    setSavedProperties(
      savedProperties.filter((property) => property.id !== id)
    );
    alert("Property Removed from Saved List.");
  };

  // Logout function
  const logout = () => {
    alert("Logged Out!");
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-sidebar">
        <h2>Welcome User</h2>
        <button onClick={() => setActiveSection("profile")}>
          <img src="/profile-icon.png" alt="profile" height={30} width={30} />
          <p className="sidebar-items">My Profile</p>
        </button>
        <button onClick={() => setActiveSection("saved")}>
          <img src="/bookmark.png" alt="bookmark" height={30} width={30} />
          <p className="sidebar-items">Saved Properties</p>
        </button>
        <button onClick={() => setActiveSection("booking")}>
          <img src="/booking.png" alt="booking" height={30} width={30} />
          <p className="sidebar-items">Booking</p>
        </button>
        <button onClick={logout}>
          <img src="/logout-logo.png" alt="logout" height={30} width={30} />
          <p className="sidebar-items">Logout</p>
        </button>
      </div>

      <div className="user-main-content">
        {activeSection === "profile" && (
          <div className="section">
            <h2>My Profile</h2>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
            <button onClick={editProfile}>Save Changes</button>
            <br />
            <br />
            <button onClick={togglePassword}>Change Password</button>

            {showPasswordSection && (
              <div id="password-section">
                <h3>Change Password</h3>
                <input
                  type="password"
                  name="currentPass"
                  placeholder="Current Password"
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="newPass"
                  placeholder="New Password"
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Confirm New Password"
                  onChange={handlePasswordChange}
                />
                <button onClick={updatePassword}>Update Password</button>
              </div>
            )}
          </div>
        )}

        {activeSection === "saved" && (
          <div className="section">
            <h2>Saved Properties</h2>
            {savedProperties.length > 0 ? (
              savedProperties.map((property) => (
                <div className="property-card" key={property.id}>
                  <h3>{property.name}</h3>
                  <p>Location: {property.location}</p>
                  <p>Price: {property.price}</p>
                  <button onClick={bookProperty}>Book Now</button>
                  <button onClick={() => removeProperty(property.id)}>
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No saved properties.</p>
            )}
          </div>
        )}

        {activeSection === "booking" && (
          <div className="section">
            <h2>My Bookings</h2>
            <p>You have no active bookings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
