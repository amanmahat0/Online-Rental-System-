const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  propertiesByOwnersId,
  handleGetAllSavedProperties,
  getPropertyByType,
  filterProperties,
  requestProperty,
  approveOrRejectRequest,
  bookingRequestByCustomerId,
  getPropertiesByAcceptedCustomer,
} = require("../controller/propertyController");

// Configure Multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Use a unique name for each file
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

// Routes
router.post("/", upload.single("propertyImage"), createProperty);
router.get("/", getAllProperties);
router.get("/filter/", filterProperties);
router.post("/request", requestProperty);
router.get("/request/:customerId", bookingRequestByCustomerId);
router.post("/approveOrReject", approveOrRejectRequest);
router.post("/savedProperties", handleGetAllSavedProperties);
router.get("/:id", getPropertyById);
router.put("/:id", upload.single("propertyImage"), updateProperty);
router.delete("/:id", deleteProperty);
router.get("/owner/:Id", propertiesByOwnersId);
router.get("/type/:propertyType", getPropertyByType);
router.get("/accepted-customer/:customerId", getPropertiesByAcceptedCustomer);

module.exports = router;
