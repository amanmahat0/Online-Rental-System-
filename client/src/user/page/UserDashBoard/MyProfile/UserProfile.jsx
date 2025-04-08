import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { FaUserEdit, FaUpload, FaSave, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
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
            Object.keys(profile).forEach((key) => {
                if (key !== "profileImagePreview" && key !== "profileImage") {
                    formData.append(key, profile[key]);
                }
            });

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
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

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
    }, []);

    const cancelEdit = () => {
        setEditing(false);
        setErrors({});
        fetchProfileData(); // Reload original data
    };

    const iconMap = {
        name: <FaUser className="user-profile-field-icon" />,
        email: <FaEnvelope className="user-profile-field-icon" />,
        contact: <FaPhone className="user-profile-field-icon" />,
        address: <FaMapMarkerAlt className="user-profile-field-icon" />,
    };

    if (loading) {
        return (
            <div className="user-profile">
                <div className="user-profile-loading">
                    <FaSpinner className="user-profile-spinner" />
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile">
            {successMessage && (
                <div className="user-profile-success-message">{successMessage}</div>
            )}

            {errors.general && (
                <div className="user-profile-error-message">{errors.general}</div>
            )}

            <div className="user-profile-header">
                <h2>My Profile</h2>
                <p>Manage your personal information and account settings</p>
            </div>

            <div className="user-profile-container">
                <div className="user-profile-card">
                    <div className="user-profile-image">
                        <div className="user-profile-image-container">
                            {profile?.profileImage || profile?.profileImagePreview ? (
                                <img
                                    src={
                                        profile?.profileImagePreview ||
                                        `http://localhost:5000${profile?.profileImage}`
                                    }
                                    alt="Profile"
                                    className="user-profile-img"
                                />
                            ) : (
                                <div className="user-profile-placeholder">
                                    <FaUser />
                                </div>
                            )}
                            {editing && (
                                <label
                                    className="user-profile-upload-button"
                                    title="Upload profile picture"
                                >
                                    <FaUpload />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="user-profile-file-input"
                                    />
                                </label>
                            )}
                        </div>
                        <h3 className="user-profile-name">{profile?.name}</h3>
                    </div>

                    <div className="user-profile-details">
                        <h3 className="user-profile-section-title">Personal Information</h3>

                        <div className="user-profile-field">
                            <div className="user-profile-field-label">
                                {iconMap.name}
                                <label>Name</label>
                            </div>
                            {editing ? (
                                <>
                                    <input
                                        name="name"
                                        value={profile?.name || ""}
                                        onChange={handleChange}
                                        className={`user-profile-edit-input ${
                                            errors.name ? "user-profile-input-error" : ""
                                        }`}
                                    />
                                    {errors.name && (
                                        <div className="user-profile-error-text">
                                            {errors.name}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="user-profile-field-value">{profile?.name}</p>
                            )}
                        </div>

                        <div className="user-profile-field">
                            <div className="user-profile-field-label">
                                {iconMap.email}
                                <label>Email</label>
                            </div>
                            {editing ? (
                                <>
                                    <input
                                        name="email"
                                        value={profile?.email || ""}
                                        onChange={handleChange}
                                        className={`user-profile-edit-input ${
                                            errors.email ? "user-profile-input-error" : ""
                                        }`}
                                    />
                                    {errors.email && (
                                        <div className="user-profile-error-text">
                                            {errors.email}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="user-profile-field-value">{profile?.email}</p>
                            )}
                        </div>

                        <div className="user-profile-field">
                            <div className="user-profile-field-label">
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
                                        className={`user-profile-edit-input ${
                                            errors.contact ? "user-profile-input-error" : ""
                                        }`}
                                    />
                                    {errors.contact && (
                                        <div className="user-profile-error-text">
                                            {errors.contact}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="user-profile-field-value">{profile?.contact}</p>
                            )}
                        </div>

                        {/* <div className="user-profile-field">
                            <div className="user-profile-field-label">
                                {iconMap.address}
                                <label>Address</label>
                            </div>
                            {editing ? (
                                <input
                                    name="address"
                                    value={profile?.address || ""}
                                    onChange={handleChange}
                                    className="user-profile-edit-input"
                                />
                            ) : (
                                <p className="user-profile-field-value">{profile?.address}</p>
                            )}
                        </div> */}

                        <div className="user-profile-action-buttons">
                            {editing ? (
                                <>
                                    <button
                                        onClick={cancelEdit}
                                        className="user-profile-cancel-button"
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="user-profile-save-button"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <FaSpinner className="user-profile-spinner-button" />
                                        ) : (
                                            <FaSave />
                                        )}
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="user-profile-edit-button"
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

export default UserProfile;