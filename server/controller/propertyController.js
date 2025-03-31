const Property = require("../model/propertyModel");
const multer = require("multer");
const path = require("path");

// Configure Multer for memory storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

// Create a new property with multiple image uploads
const createProperty = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "No image uploaded." });
    }

    // Generate the URL for the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create the property with the image URL
    const propertyData = {
      ...req.body,
      images: imageUrl, // Store the file URL in the database
    };

    const property = await Property.create(propertyData);
    return res.status(201).json({ status: true, data: property });
  } catch (error) {
    console.error("Error in Try Block:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to create property." });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    return res.status(200).json({ status: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch properties." });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found." });
    }
    return res.status(200).json({ status: true, data: property });
  } catch (error) {
    console.error("Error fetching property:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch property." });
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    // Prepare the update data
    const updateData = {
      ...req.body,
    };

    // If a new image is uploaded, replace the existing image
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      updateData.images = imageUrl; // Update the image URL in the database
    }

    // Update the property in the database
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
      }
    );

    if (!property) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found." });
    }

    return res.status(200).json({ status: true, data: property });
  } catch (error) {
    console.error("Error updating property:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to update property." });
  }
};

// Delete a property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found." });
    }
    return res
      .status(200)
      .json({ status: true, message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to delete property." });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
