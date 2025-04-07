import React, { useState } from 'react';
import './UserProfile.css';
import { FaUserEdit, FaUpload, FaSave, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
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
        name: <FaUser className="user-field-icon" />,
        email: <FaEnvelope className="user-field-icon" />,
        contact: <FaPhone className="user-field-icon" />,
        address: <FaMapMarkerAlt className="user-field-icon" />
    };

    return (
        <div className="user-profile">
            <div className="user-profile-header">
                <h2>Welcome Aman</h2>
                {/* <p>Manage your personal information and account settings</p> */}
            </div>
            
            <div className="user-profile-container">
                <div className="user-profile-card">
                    <div className="user-profile-image">
                        <div className="user-image-container">
                            {profilePic ? (
                                <img src={profilePic} alt="Profile" />
                            ) : (
                                <div className="user-profile-placeholder">
                                    <FaUser />
                                </div>
                            )}
                            <label className="user-upload-button" title="Upload profile picture">
                                <FaUpload />
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <h3 className="user-profile-name">{profile.name}</h3>
                    </div>
                    
                    <div className="user-profile-details">
                        <h3 className="user-section-title">Personal Information</h3>
                        {Object.keys(profile).map((key) => (
                            <div key={key} className="user-profile-field">
                                <div className="user-field-label">
                                    {iconMap[key] || null}
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                </div>
                                {editing ? (
                                    <input 
                                        name={key} 
                                        value={profile[key]} 
                                        onChange={handleChange}
                                        className="user-edit-input" 
                                    />
                                ) : (
                                    <p className="user-field-value">{profile[key]}</p>
                                )}
                            </div>
                        ))}
                        
                        <div className="user-action-buttons">
                            {editing ? (
                                <button onClick={handleSave} className="user-save-button">
                                    <FaSave /> Save Changes
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)} className="user-edit-button">
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