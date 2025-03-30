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
    { id: 1, name: "Luxury Apartment", location: "Downtown", price: "$1200/month" },
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
  const [editedProfile, setEditedProfile] = useState({ name: profile.name, email: profile.email });
  const [password, setPassword] = useState("");

const handleProfileChange = (e) => {
  setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
};

const saveProfileChanges = async () => {
  if (!password) {
    alert("Please enter your current password to proceed.");
    return;
  }

  // Simulate password verification
  const isPasswordCorrect = await verifyPassword(password);

  if (isPasswordCorrect) {
    setProfile(editedProfile); // Update profile details
    setIsEditing(false);
    alert("Profile updated successfully!");
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const verifyPassword = async (inputPassword) => {
  // Simulated backend password check (replace with actual API call)
  return inputPassword === "yourCurrentPassword"; // Replace with real authentication logic
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
    setSavedProperties(savedProperties.filter((property) => property.id !== id));
    alert("Property Removed from Saved List.");
  };

  // Logout function
  const logout = () => {
    alert("Logged Out!");
  };
  
  const [bookings, setBookings] = useState([
    {
      propertyName: "Oceanfront Villa",
      checkIn: "2025-04-01",
      checkOut: "2025-04-07"
    },
    {
      propertyName: "Mountain Retreat",
      checkIn: "2025-05-10",
      checkOut: "2025-05-14"
    }
  ]);
  
  const handleBookingDetails = (booking) => {
    console.log("Booking Details:", booking);
    // You can navigate to another page or display a modal for more details
  };
  
  
  

  return (
    <div className="user-dashboard-container">
      <div className="user-sidebar">
        <h2>Welcome User</h2>
        <button className={`nav-item ${activeSection === "profile" ? "active" : ""}`} onClick={() => setActiveSection("profile")}><img src="/profile-icon.png" alt="profile" height={30} width={30}/><p className="sidebar-items">My Profile</p></button>
        <button className={`nav-item ${activeSection === "saved" ? "active" : ""}`} onClick={() => setActiveSection("saved")}><img src="/bookmark.png" alt="bookmark" height={30} width={30}/><p className="sidebar-items">Saved Properties</p></button>
        <button className={`nav-item ${activeSection === "booking" ? "active" : ""}`} onClick={() => setActiveSection("booking")}><img src="/booking.png" alt="booking" height={30} width={30}/><p className="sidebar-items">Booking</p></button>
        <button className={`nav-item ${activeSection === "message" ? "active" : ""}`} onClick={() => setActiveSection("message")}><img src="/messages.png" alt="booking" height={30} width={30}/><p className="sidebar-items">Message</p></button>
        <button className = "nav-item" onClick={logout}><img src="/logout-logo.png" alt="logout" height={30} width={30}/><p className="sidebar-items">Logout</p></button>
      </div>

      <div className="main-content">
      {activeSection === "profile" && (
          <div className="section">
            <h2>My Profile</h2>
            
            {!isEditing ? (
              <>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            ) : (
              <div className="edit-profile-form">
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleProfileChange}
                  placeholder="Enter new name"
                />
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleProfileChange}
                  placeholder="Enter new email"
                />
                <input
                  type="password"
                  name="currentPass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button onClick={saveProfileChanges}>Save Changes</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
        )}


        {activeSection === "saved" && (
          <div className="section">
            <h2>Saved Properties</h2>
            {savedProperties.length > 0 ? (
              savedProperties.map((property) => (
                <div className="user-property-card" key={property.id}>
                  <img src="https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" height={200} width={200}/>
                  <h3>{property.name}</h3>
                  <p>Location: {property.location}</p>
                  <p>Price: {property.price}</p>
                  <button onClick={bookProperty}>Book Now</button>
                  <button onClick={() => removeProperty(property.id)}>Remove</button>
                </div>
              ))
            ) : (
              <p>No saved properties.</p>
            )}
          </div>
        )}

        {/* {activeSection === "booking" && (
          <div className="section">
            <h2>My Bookings</h2>
            <p>You have no active bookings.</p>
          </div>
        )} */}
        {activeSection === "booking" && (
          <div className="section">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
              <p>You have no active bookings.</p>
            ) : (
              <div>
                <ul>
                  {bookings.map((booking, index) => (
                    <li key={index}>
                      <p>{booking.propertyName}</p>
                      <p>Check-in: {booking.checkIn}</p>
                      <p>Check-out: {booking.checkOut}</p>
                      <button onClick={() => handleBookingDetails(booking)}>View Details</button>
                    </li>
                  ))}

                </ul>
              </div>
            )}

          </div>
        )}
        {activeSection === "message" && (
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
    </div>
  );
};

export default UserDashboard;
