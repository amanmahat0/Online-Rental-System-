import React, { useState, useEffect } from "react";
import "./AgentProfile.css";
import {
  FaUserEdit,
  FaUpload,
  FaSave,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTimes,
  FaSpinner,
  FaBuilding,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AgentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Phone validation (must be 10 digits starting with 98)
    if (!/^98\d{8}$/.test(profile.contact)) {
      newErrors.contact = "Phone number must be 10 digits starting with 98";
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!profile.name || profile.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create a preview URL for the UI
      setProfile({
        ...profile,
        profileImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedRole = localStorage.getItem("role");

      // Create FormData to handle file upload
      const formData = new FormData();

      // Add profile data
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("contact", profile.contact);
      formData.append("companyName", profile.companyName);

      // Add profile image if a new one was selected
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // Send data to backend using multipart form data
      const response = await fetch(
        `http://localhost:5000/api/${storedRole}/${storedUser.id}`,
        {
          method: "PUT",
          body: formData,
          // No Content-Type header as browser will set it with boundary parameter
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ id: storedUser.id, name: profile.name })
      );
      const data = await response.json();
      setProfile(data.data);
      setEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({
        ...errors,
        general: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedRole = localStorage.getItem("role");

      const response = await fetch(
        `http://localhost:5000/api/${storedRole}/${storedUser.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      setProfile(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setErrors({
        general: "Failed to load profile data. Please refresh the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelEdit = () => {
    setEditing(false);
    setErrors({});
    fetchProfileData(); // Reload original data
  };

  const iconMap = {
    name: <FaUser className="agent-profile-field-icon" />,
    email: <FaEnvelope className="agent-profile-field-icon" />,
    contact: <FaPhone className="agent-profile-field-icon" />,
    companyName: <FaBuilding className="agent-profile-field-icon" />,
  };

  if (loading) {
    return (
      <div className="agent-profile">
        <div className="agent-profile-loading">
          <FaSpinner className="agent-profile-spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-profile">
      {successMessage && (
        <div className="agent-profile-success-message">{successMessage}</div>
      )}

      {errors.general && (
        <div className="agent-profile-error-message">{errors.general}</div>
      )}

      <div className="agent-profile-header">
        <h2>My Profile</h2>
        <p>Manage your personal information and account settings</p>
      </div>

      <div className="agent-profile-container">
        <div className="agent-profile-card">
          <div className="agent-profile-image">
            <div className="agent-profile-image-container">
              {profile?.profileImage || profile?.profileImagePreview ? (
                <img
                  src={
                    profile?.profileImagePreview ||
                    `http://localhost:5000${profile?.profileImage}`
                  }
                  alt="Profile"
                  className="agent-profile-img"
                />
              ) : (
                <div className="agent-profile-placeholder">
                  <FaUser />
                </div>
              )}
              {editing && (
                <label
                  className="agent-profile-upload-button"
                  title="Upload profile picture"
                >
                  <FaUpload />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="agent-profile-file-input"
                  />
                </label>
              )}
            </div>
            <h3 className="agent-profile-name">{profile?.name}</h3>
          </div>

          <div className="agent-profile-details">
            <h3 className="agent-profile-section-title">
              Personal Information
            </h3>

            <div className="agent-profile-field">
              <div className="agent-profile-field-label">
                {iconMap.name}
                <label>Name</label>
              </div>
              {editing ? (
                <>
                  <input
                    name="name"
                    value={profile?.name || ""}
                    onChange={handleChange}
                    className={`agent-profile-edit-input ${
                      errors.name ? "agent-profile-input-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <div className="agent-profile-error-text">
                      {errors.name}
                    </div>
                  )}
                </>
              ) : (
                <p className="agent-profile-field-value">{profile?.name}</p>
              )}
            </div>

            <div className="agent-profile-field">
              <div className="agent-profile-field-label">
                {iconMap.email}
                <label>Email</label>
              </div>
              {editing ? (
                <>
                  <input
                    name="email"
                    value={profile?.email || ""}
                    onChange={handleChange}
                    className={`agent-profile-edit-input ${
                      errors.email ? "agent-profile-input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <div className="agent-profile-error-text">
                      {errors.email}
                    </div>
                  )}
                </>
              ) : (
                <p className="agent-profile-field-value">{profile?.email}</p>
              )}
            </div>

            <div className="agent-profile-field">
              <div className="agent-profile-field-label">
                {iconMap.contact}
                <label>Contact</label>
              </div>
              {editing ? (
                <>
                  <input
                    name="contact"
                    value={profile?.contact || ""}
                    onChange={handleChange}
                    placeholder="10 digits starting with 98"
                    className={`agent-profile-edit-input ${
                      errors.contact ? "agent-profile-input-error" : ""
                    }`}
                  />
                  {errors.contact && (
                    <div className="agent-profile-error-text">
                      {errors.contact}
                    </div>
                  )}
                </>
              ) : (
                <p className="agent-profile-field-value">{profile?.contact}</p>
              )}
            </div>

            <div className="agent-profile-field">
              <div className="agent-profile-field-label">
                {iconMap.companyName}
                <label>Company Name</label>
              </div>
              {editing ? (
                <input
                  name="companyName"
                  value={profile?.companyName || ""}
                  onChange={handleChange}
                  className="agent-profile-edit-input"
                />
              ) : (
                <p className="agent-profile-field-value">
                  {profile?.companyName}
                </p>
              )}
            </div>

            <div className="agent-profile-action-buttons">
              {editing ? (
                <>
                  <button
                    onClick={cancelEdit}
                    className="agent-profile-cancel-button"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="agent-profile-save-button"
                    disabled={saving}
                  >
                    {saving ? (
                      <FaSpinner className="agent-profile-spinner-button" />
                    ) : (
                      <FaSave />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="agent-profile-edit-button"
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

export default AgentProfile;
