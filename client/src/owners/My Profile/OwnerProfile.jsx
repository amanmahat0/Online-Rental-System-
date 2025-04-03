import React, { useState, useContext, useEffect } from "react";
import "./OwnerProfile.css";
import {
  FaUserEdit,
  FaUpload,
  FaSave,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext, RoleContext } from "../../user/Context/UserContext";

const OwnerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Amresh Kumar Yadav",
    email: "yadavamresh@gmail.com",
    contact: "9800000000",
    address: "Kathmandu, Nepal",
  });
  const { user, setUser } = useContext(UserContext);
  const { role, setRole } = useContext(RoleContext);
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("/assets/profile-default.jpg");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setEditing(false);
    // Here you would typically send data to backend
    // For now we just toggle editing state
  };

  const fetchProfileData = async () => {
    try {
      console.log(user.id);
      const response = await fetch(
        `http://localhost:5000/api/${role}/${user.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfile(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconMap = {
    name: <FaUser className="owner-field-icon" />,
    email: <FaEnvelope className="owner-field-icon" />,
    contact: <FaPhone className="owner-field-icon" />,
    address: <FaMapMarkerAlt className="owner-field-icon" />,
  };

  return (
    <div className="owner-profile">
      <div className="owner-profile-header">
        <h2>My Profile</h2>
        <p>Manage your personal information and account settings</p>
      </div>

      <div className="owner-profile-container">
        <div className="owner-profile-card">
          <div className="owner-profile-image">
            <div className="owner-image-container">
              {profilePic ? (
                <img
                  src={`http://localhost:5000${profile.profileImage}`}
                  alt="Profile"
                />
              ) : (
                <div className="owner-profile-placeholder">
                  <FaUser />
                </div>
              )}
              <label
                className="owner-upload-button"
                title="Upload profile picture"
              >
                <FaUpload />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <h3 className="owner-profile-name">{profile.name}</h3>
          </div>

          <div className="owner-profile-details">
            <h3 className="owner-section-title">Personal Information</h3>
            <div className="owner-profile-field">
              <div className="owner-field-label">
                {iconMap.name}
                <label>Name</label>
              </div>
              {editing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="owner-edit-input"
                />
              ) : (
                <p className="owner-field-value">{profile.name}</p>
              )}
            </div>

            <div className="owner-profile-field">
              <div className="owner-field-label">
                {iconMap.email}
                <label>Email</label>
              </div>
              {editing ? (
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="owner-edit-input"
                />
              ) : (
                <p className="owner-field-value">{profile.email}</p>
              )}
            </div>

            <div className="owner-profile-field">
              <div className="owner-field-label">
                {iconMap.contact}
                <label>Contact</label>
              </div>
              {editing ? (
                <input
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                  className="owner-edit-input"
                />
              ) : (
                <p className="owner-field-value">{profile.contact}</p>
              )}
            </div>

            <div className="owner-profile-field">
              <div className="owner-field-label">
                {iconMap.address}
                <label>Address</label>
              </div>
              {editing ? (
                <input
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="owner-edit-input"
                />
              ) : (
                <p className="owner-field-value">{profile.address}</p>
              )}
            </div>

            <div className="owner-action-buttons">
              {editing ? (
                <button onClick={handleSave} className="owner-save-button">
                  <FaSave /> Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="owner-edit-button"
                >
                  <FaUserEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
