console.log("Property route loaded");
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
  cancelBooking,
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

router.use((req, res, next) => {
  console.log(`📥 [ROUTE HIT] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
router.post("/", upload.single("propertyImage"), createProperty);
router.get("/", getAllProperties);
router.get("/filter/", filterProperties);
router.post("/approveOrReject", (req, res) => {
  approveOrRejectRequest(req, res);
  console.log("Request approved or rejected");
});
router.post("/savedProperties", handleGetAllSavedProperties);
router.post("/cancel-booking", cancelBooking);
router.post("/request", requestProperty);
router.get("/request/:customerId", bookingRequestByCustomerId);
router.get("/owner/:Id", propertiesByOwnersId);
router.get("/type/:propertyType", getPropertyByType);
router.get("/accepted-customer/:customerId", getPropertiesByAcceptedCustomer);
router.put("/:id", upload.single("propertyImage"), updateProperty); // Moved above the GET route
router.delete("/:id", deleteProperty); // DELETE route remains below PUT
router.get("/:id", getPropertyById);

module.exports = router;
