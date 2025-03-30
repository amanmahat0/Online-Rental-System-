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
  limits: { fileSize: 16 * 1024 * 1024 }, // Increase limit to 16MB
}).array("propertyImages", 5); // Allow up to 5 images

// Create a new property with multiple image uploads
const createProperty = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Content-Type:", req.headers["content-type"]);

  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(400).json({ status: false, message: err.message });
    }

    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "No images uploaded." });
      }

      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
      const propertyData = { ...req.body, images: imageUrls };

      const property = await Property.create(propertyData);
      return res.status(201).json({ status: true, data: property });
    } catch (error) {
      console.error("Error in Try Block:", error);
      return res
        .status(500)
        .json({ status: false, message: "Failed to create property." });
    }
  });
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
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: false, message: err.message });
    }

    try {
      // Check if new images are uploaded
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        // Generate URLs for the uploaded files
        imageUrls = req.files.map(
          (file) => `/uploads/${file.filename}` // Store relative URLs
        );
      }

      // Prepare the update data
      const updateData = {
        ...req.body,
      };

      // If new images are uploaded, replace the existing images
      if (imageUrls.length > 0) {
        updateData.images = imageUrls;
      }

      // Update the property in the database
      const property = await Property.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
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
  });
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
