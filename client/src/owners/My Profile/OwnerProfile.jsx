import React, { useState } from 'react';
import './OwnerProfile.css';
import { FaUserEdit, FaUpload, FaSave, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OwnerProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Amresh Kumar Yadav',
        email: 'yadavamresh@gmail.com',
        contact: '9800000000',
        address: 'Kathmandu, Nepal'
    });
    const [editing, setEditing] = useState(false);
    const [profilePic, setProfilePic] = useState('/assets/profile-default.jpg');
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

    const iconMap = {
        name: <FaUser className="owner-field-icon" />,
        email: <FaEnvelope className="owner-field-icon" />,
        contact: <FaPhone className="owner-field-icon" />,
        address: <FaMapMarkerAlt className="owner-field-icon" />
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
                                <img src={profilePic} alt="Profile" />
                            ) : (
                                <div className="owner-profile-placeholder">
                                    <FaUser />
                                </div>
                            )}
                            <label className="owner-upload-button" title="Upload profile picture">
                                <FaUpload />
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <h3 className="owner-profile-name">{profile.name}</h3>
                    </div>
                    
                    <div className="owner-profile-details">
                        <h3 className="owner-section-title">Personal Information</h3>
                        {Object.keys(profile).map((key) => (
                            <div key={key} className="owner-profile-field">
                                <div className="owner-field-label">
                                    {iconMap[key] || null}
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                </div>
                                {editing ? (
                                    <input 
                                        name={key} 
                                        value={profile[key]} 
                                        onChange={handleChange}
                                        className="owner-edit-input" 
                                    />
                                ) : (
                                    <p className="owner-field-value">{profile[key]}</p>
                                )}
                            </div>
                        ))}
                        
                        <div className="owner-action-buttons">
                            {editing ? (
                                <button onClick={handleSave} className="owner-save-button">
                                    <FaSave /> Save Changes
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)} className="owner-edit-button">
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