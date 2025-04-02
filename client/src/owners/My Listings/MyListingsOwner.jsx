import React, { useState, useEffect } from 'react';
import './MyListingsOwner.css';
import { FaHome, FaMapMarkerAlt, FaRupeeSign, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaPhone, FaEdit, FaTrash, FaTimes, FaImage } from 'react-icons/fa';

const MyListingsOwner = () => {
    // Sample data for property listings
    const [listings, setListings] = useState([
        {
            id: 1,
            title: "Modern 2BHK Apartment",
            propertyType: "Apartment",
            location: {
                area: "Baneshwor",
                city: "Kathmandu"
            },
            price: 25000,
            description: "Fully furnished apartment with modern amenities, 24/7 water supply, and secure parking.",
            isAvailable: true,
            contactNo: "9801234567",
            image: "/assets/apartment1.jpg"
        },
        {
            id: 2,
            title: "Spacious Family House",
            propertyType: "House",
            location: {
                area: "Baluwatar",
                city: "Kathmandu"
            },
            price: 45000,
            description: "Beautiful 3BHK house with garden, perfect for families. Located in a quiet neighborhood.",
            isAvailable: true,
            contactNo: "9807654321",
            image: "/assets/house1.jpg"
        },
        {
            id: 3,
            title: "Commercial Space for Office",
            propertyType: "Commercial",
            location: {
                area: "Thamel",
                city: "Kathmandu"
            },
            price: 60000,
            description: "Prime location commercial space ideal for office, restaurant or retail business.",
            isAvailable: false,
            contactNo: "9801122334",
            image: "/assets/commercial1.jpg"
        },
        {
            id: 4,
            title: "Single Room with Attached Bathroom",
            propertyType: "Room",
            location: {
                area: "Lazimpat",
                city: "Kathmandu"
            },
            price: 8000,
            description: "Furnished single room with attached bathroom, suitable for students or working professionals.",
            isAvailable: true,
            contactNo: "9809988776",
            image: "/assets/room1.jpg"
        }
    ]);

    // State for modal and form
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredListings, setFilteredListings] = useState([]);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        propertyType: 'Apartment',
        area: '',
        city: '',
        price: '',
        description: '',
        isAvailable: true,
        contactNo: '',
        image: null,
        imagePreview: null
    });

    // Apply filters whenever listings or activeFilter changes
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredListings(listings);
        } else if (activeFilter === 'available') {
            setFilteredListings(listings.filter(listing => listing.isAvailable));
        } else if (activeFilter === 'booked') {
            setFilteredListings(listings.filter(listing => !listing.isAvailable));
        }
    }, [listings, activeFilter]);

    const propertyTypes = ['Apartment', 'House', 'Room', 'Commercial'];

    const handleEdit = (id) => {
        const listing = listings.find(item => item.id === id);
        if (listing) {
            setFormData({
                title: listing.title,
                propertyType: listing.propertyType,
                area: listing.location.area,
                city: listing.location.city,
                price: listing.price,
                description: listing.description,
                isAvailable: listing.isAvailable,
                contactNo: listing.contactNo,
                image: null,
                imagePreview: listing.image
            });
            setEditingId(id);
            setShowModal(true);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            setListings(listings.filter(listing => listing.id !== id));
        }
    };

    const handleAddProperty = () => {
        setFormData({
            title: '',
            propertyType: 'Apartment',
            area: '',
            city: '',
            price: '',
            description: '',
            isAvailable: true,
            contactNo: '',
            image: null,
            imagePreview: null
        });
        setEditingId(null);
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file' && files[0]) {
            setFormData({
                ...formData,
                image: files[0],
                imagePreview: URL.createObjectURL(files[0])
            });
        } else if (name === 'price') {
            // Only allow numbers
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: numericValue
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newProperty = {
            id: editingId || Date.now(),  // Use existing ID or create new one
            title: formData.title,
            propertyType: formData.propertyType,
            location: {
                area: formData.area,
                city: formData.city
            },
            price: Number(formData.price),
            description: formData.description,
            isAvailable: formData.isAvailable,
            contactNo: formData.contactNo,
            image: formData.imagePreview || '/assets/property-placeholder.jpg'
        };

        if (editingId) {
            // Update existing property
            setListings(listings.map(listing => 
                listing.id === editingId ? newProperty : listing
            ));
        } else {
            // Add new property
            setListings([...listings, newProperty]);
        }

        setShowModal(false);
    };

    return (
        <div className="owner-listings">
            <div className="owner-listings-header">
                <h2>My Properties</h2>
                <p>Manage your property listings</p>
                
                <div className="owner-listings-controls">
                    <button 
                        className="owner-add-property-btn" 
                        onClick={handleAddProperty}
                    >
                        + Add New Property
                    </button>
                    
                    <div className="owner-filter-controls">
                        <button 
                            className={`owner-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`owner-filter-btn ${activeFilter === 'available' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('available')}
                        >
                            Available
                        </button>
                        <button 
                            className={`owner-filter-btn ${activeFilter === 'booked' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('booked')}
                        >
                            Booked
                        </button>
                    </div>
                </div>
            </div>

            <div className="owner-listings-container">
                {filteredListings.length > 0 ? (
                    filteredListings.map((listing, index) => (
                        <div 
                            className="owner-property-card" 
                            key={listing.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="owner-property-image">
                                <img 
                                    src={listing.image} 
                                    alt={listing.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/assets/property-placeholder.jpg';
                                    }}
                                />
                                <div className={`owner-availability-badge ${listing.isAvailable ? 'available' : 'unavailable'}`}>
                                    {listing.isAvailable ? 'Available' : 'Rented'}
                                </div>
                            </div>
                            
                            <div className="owner-property-details">
                                <h3 className="owner-property-title">{listing.title}</h3>
                                
                                <div className="owner-property-type">
                                    <FaHome className="listing-owner-icon" />
                                    <span>{listing.propertyType}</span>
                                </div>
                                
                                <div className="owner-property-location">
                                    <FaMapMarkerAlt className="listing-owner-icon" />
                                    <span>{listing.location.area}, {listing.location.city}</span>
                                </div>
                                
                                <div className="owner-property-price">
                                    <FaRupeeSign className="listing-owner-icon" />
                                    <span>Rs. {listing.price.toLocaleString()}/month</span>
                                </div>
                                
                                <div className="owner-property-description">
                                    <FaInfoCircle className="listing-owner-icon" />
                                    <span>{listing.description}</span>
                                </div>
                                
                                <div className="owner-property-contact">
                                    <FaPhone className="listing-owner-icon" />
                                    <span>{listing.contactNo}</span>
                                </div>
                            </div>
                            
                            <div className="owner-property-actions">
                                <button 
                                    className="owner-edit-btn" 
                                    onClick={() => handleEdit(listing.id)}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button 
                                    className="owner-delete-btn" 
                                    onClick={() => handleDelete(listing.id)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="owner-no-listings">
                        <p>No properties found matching your filter criteria.</p>
                        <button 
                            className="owner-add-property-btn"
                            onClick={handleAddProperty}
                        >
                            Add New Property
                        </button>
                    </div>
                )}
            </div>

            {/* Property Form Modal */}
            {showModal && (
                <div className="owner-modal-overlay">
                    <div className="owner-modal">
                        <div className="owner-modal-header">
                            <h3>{editingId ? 'Edit Property' : 'Add New Property'}</h3>
                            <button 
                                className="owner-modal-close" 
                                onClick={() => setShowModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="owner-property-form">
                            <div className="owner-form-image-upload">
                                <div 
                                    className="owner-image-preview" 
                                    style={{ 
                                        backgroundImage: formData.imagePreview 
                                            ? `url(${formData.imagePreview})` 
                                            : 'none' 
                                    }}
                                >
                                    {!formData.imagePreview && (
                                        <div className="owner-no-image">
                                            <FaImage />
                                            <p>Upload Property Image</p>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        name="image" 
                                        id="property-image" 
                                        accept="image/*"
                                        onChange={handleFormChange}
                                        className="owner-image-input"
                                    />
                                    <label 
                                        htmlFor="property-image" 
                                        className="owner-upload-image-btn"
                                    >
                                        Choose Image
                                    </label>
                                </div>
                            </div>

                            <div className="owner-form-group">
                                <label htmlFor="title">Property Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title"
                                    value={formData.title} 
                                    onChange={handleFormChange}
                                    required 
                                />
                            </div>

                            <div className="owner-form-row">
                                <div className="owner-form-group">
                                    <label htmlFor="propertyType">Property Type</label>
                                    <select 
                                        id="propertyType" 
                                        name="propertyType"
                                        value={formData.propertyType} 
                                        onChange={handleFormChange}
                                        required
                                    >
                                        {propertyTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="owner-form-group">
                                    <label htmlFor="price">Price (Rs./month)</label>
                                    <input 
                                        type="text" 
                                        id="price" 
                                        name="price"
                                        value={formData.price} 
                                        onChange={handleFormChange}
                                        placeholder="25000"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="owner-form-row">
                                <div className="owner-form-group">
                                    <label htmlFor="area">Area</label>
                                    <input 
                                        type="text" 
                                        id="area" 
                                        name="area"
                                        value={formData.area}
                                        onChange={handleFormChange}
                                        required 
                                    />
                                </div>

                                <div className="owner-form-group">
                                    <label htmlFor="city">City</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        name="city"
                                        value={formData.city} 
                                        onChange={handleFormChange}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="owner-form-group">
                                <label htmlFor="contactNo">Contact Number</label>
                                <input 
                                    type="text" 
                                    id="contactNo" 
                                    name="contactNo"
                                    value={formData.contactNo} 
                                    onChange={handleFormChange}
                                    required 
                                />
                            </div>

                            <div className="owner-form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    value={formData.description} 
                                    onChange={handleFormChange}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div className="owner-form-check">
                                <input 
                                    type="checkbox" 
                                    id="isAvailable" 
                                    name="isAvailable"
                                    checked={formData.isAvailable} 
                                    onChange={handleFormChange}
                                />
                                <label htmlFor="isAvailable">Property is currently available</label>
                            </div>

                            <div className="owner-form-actions">
                                <button 
                                    type="button" 
                                    className="owner-cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="owner-submit-btn"
                                >
                                    {editingId ? 'Update Property' : 'Add Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyListingsOwner;