const Property = require("../model/propertyModel");
const Owner = require("../model/ownerModel");
const User = require("../model/userModel");
const Agent = require("../model/agentModel");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const e = require("express");

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
  console.log("Creating property with images:", req.body);
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "No image uploaded." });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create the property with the image URL
    const propertyData = {
      ...req.body,
      images: imageUrl,
    };

    const property = await Property.create(propertyData);

    const ownerId = req.body.owner;
    const ownerRole = req.body.role;
    if (ownerRole === "Owner") {
      await Owner.findByIdAndUpdate(ownerId, {
        $push: { properties: property._id },
      });
    } else {
      await Agent.findByIdAndUpdate(ownerId, {
        $push: { properties: property._id },
      });
    }
    return res.status(201).json({ status: true, data: property });
  } catch (error) {
    console.error("Error in createProperty:", error);
    return res
      .status(500)
      .json({ status: false, message: "Failed to create property." });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate({
      path: "owner", // The field in the Property schema that references the Owner model
      select: "name contact email", // Specify the fields to include from the Owner model
    });
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
    const updateData = {
      ...req.body,
    };
    // If a new image is uploaded, replace the existing image
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      updateData.images = imageUrl;
    }

    // If availabilityStatus is set to true, clear acceptedCustomerId
    if (updateData.availabilityStatus === "true") {
      updateData.acceptedCustomerId = null;
    }

    // Update the property
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!property) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found." });
    }

    // console.log("Property updated successfully:", property);

    return res.status(200).json({
      status: true,
      message: "Property updated successfully",
      data: property,
    });
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

    if (property.owner) {
      await Owner.findByIdAndUpdate(property.owner, {
        $pull: { properties: property._id },
      });
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

// const propertiesByOwnerOrAgentId = async (req, res) => {
//   try {
//     const { role, Id } = req.params;

//     if (!Id || !role) {
//       return res.status(400).json({
//         status: false,
//         message: "Owner ID and role are required.",
//       });
//     }

//     console.log("Owner/Agent ID:", Id, "Role:", role);

//     // Fetch properties based on owner/agent ID and role
//     const properties = await Property.find({ owner: Id, role });

//     console.log("Properties by Owner/Agent ID:", properties);

//     if (!properties || properties.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: `No properties found for this ${role}.`,
//       });
//     }

//     return res.status(200).json({ status: true, data: properties });
//   } catch (error) {
//     console.error("Error fetching properties by owner/agent ID:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Failed to fetch properties by owner/agent ID.",
//     });
//   }
// };

// const propertiesByOwnersId = async (req, res) => {
//   try {
//     const { Id } = req.params;

//     if (!Id) {
//       return res.status(400).json({
//         status: false,
//         message: "Owner ID is required.",
//       });
//     }

//     console.log("Fetching properties for Owner/Agent ID:", Id);

//     // Fetch raw properties without population
//     const rawProperties = await Property.find({ owner: Id });
//     console.log("Raw Properties:", JSON.stringify(rawProperties, null, 2));

//     // Fetch properties with populated customerId
//     const properties = await Property.find({ owner: Id }).populate({
//       path: "customerId.customer",
//       select: "name email contact",
//     });

//     console.log("Populated Properties:", JSON.stringify(properties, null, 2));

//     if (!properties || properties.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: `No properties found for this Owner/Agent.`,
//       });
//     }

//     return res.status(200).json({ status: true, data: properties });
//   } catch (error) {
//     console.error("Error fetching properties by owner/agent ID:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Failed to fetch properties by owner/agent ID.",
//     });
//   }
// };

const propertiesByOwnersId = async (req, res) => {
  try {
    const { Id } = req.params;

    if (!Id) {
      return res.status(400).json({
        status: false,
        message: "Owner ID is required.",
      });
    }

    // Fetch raw properties without population
    const rawProperties = await Property.find({ owner: Id });

    // Manually populate customerId.customer
    const properties = await Promise.all(
      rawProperties.map(async (property) => {
        const populatedCustomerId = await Promise.all(
          property.customerId.map(async (customerEntry) => {
            const customerData =
              customerEntry.customerRole === "User"
                ? await User.findById(customerEntry.customer).select(
                    "name email contact"
                  )
                : await Agent.findById(customerEntry.customer).select(
                    "name email contact"
                  );

            return {
              ...customerEntry.toObject(),
              customer: customerData,
            };
          })
        );

        return {
          ...property.toObject(),
          customerId: populatedCustomerId,
        };
      })
    );

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No properties found for this Owner/Agent.`,
      });
    }

    return res.status(200).json({ status: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties by owner/agent ID:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch properties by owner/agent ID.",
    });
  }
};

// const handleGetAllSavedProperties = async (req, res) => {
//   const propertiesId = req.body.propertiesId;
//   try {
//     const savedProperties = await Property.find({
//       _id: { $in: propertiesId },
//     });
//     if (!savedProperties || savedProperties.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No saved properties found.",
//       });
//     }
//     return res.status(200).json({ status: true, data: savedProperties });
//   } catch (error) {
//     console.error("Error fetching saved properties:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Failed to fetch saved properties.",
//     });
//   }
// };

const handleGetAllSavedProperties = async (req, res) => {
  const { id, role } = req.body; // Extract `id` and `role` from the request body
  console.log("Fetching saved properties for ID:", id, "Role:", role);
  try {
    let savedProperties = [];

    if (role === "User") {
      // Fetch saved properties for a user
      const user = await User.findById(id).populate({
        path: "saveProperties",
        populate: {
          path: "owner",
          select: "name contact email", // only populate these fields
        },
      });
      if (!user || !user.saveProperties || user.saveProperties.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No saved properties found for this user.",
        });
      }
      savedProperties = user.saveProperties;
    } else if (role === "Agent") {
      // Fetch saved properties for an agent
      const agent = await Agent.findById(id).populate({
        path: "saveProperties",
        populate: {
          path: "owner",
          select: "name contact email", // only populate these fields
        },
      });
      if (
        !agent ||
        !agent.saveProperties ||
        agent.saveProperties.length === 0
      ) {
        return res.status(404).json({
          status: false,
          message: "No saved properties found for this agent.",
        });
      }
      savedProperties = agent.saveProperties;
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid role. Role must be 'user' or 'agent'.",
      });
    }
    console.log("Saved Properties:", savedProperties);
    // Return the saved properties
    return res.status(200).json({ status: true, data: savedProperties });
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch saved properties.",
    });
  }
};

const getPropertyByType = async (req, res) => {
  try {
    const property = await Property.find({
      propertyType: req.params.propertyType,
    }).populate("owner", "name email contact");
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

const filterProperties = async (req, res) => {
  console.log("Filter Properties Request:", req.query);
  try {
    const { minPrice, maxPrice, location, propertyType, status } = req.query;
    console.log("Filter Query:", req.query);
    // Build the query object dynamically
    const query = {};

    if (minPrice || maxPrice) {
      query.pricePerMonth = {};
      if (minPrice) query.pricePerMonth.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerMonth.$lte = parseFloat(maxPrice);
    }

    if (status) {
      query.availabilityStatus = status;
    }

    if (location) {
      query.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.area": { $regex: location, $options: "i" } },
      ];
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Fetch properties based on the query
    const properties = await Property.find(query).populate(
      "owner",
      "name email contact"
    );

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No properties found matching the criteria.",
      });
    }

    return res.status(200).json({ status: true, data: properties });
  } catch (error) {
    console.error("Error filtering properties:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to filter properties.",
    });
  }
};

const requestProperty = async (req, res) => {
  try {
    const { propertyId, customerId, role } = req.body;

    if (!propertyId || !customerId) {
      return res.status(400).json({
        status: false,
        message: "Property ID, Customer ID, and role are required.",
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found.",
      });
    }

    if (!property.availabilityStatus) {
      return res.status(400).json({
        status: false,
        message: "Property is not available for booking.",
      });
    }

    const alreadyRequested = property.customerId.some(
      (cust) => cust.customer.toString() === customerId
    );
    if (alreadyRequested) {
      return res.status(400).json({
        status: false,
        message: "You have already requested this property.",
      });
    }

    // Add the customer to the request list
    property.customerId.push({ customer: customerId, customerRole: role });
    await property.save();

    return res.status(200).json({
      status: true,
      message: "Request sent successfully.",
      data: property,
    });
  } catch (error) {
    console.error("Error in requestProperty:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to send request.",
    });
  }
};

const bookingRequestByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        status: false,
        message: "Customer ID is required.",
      });
    }

    // Find all properties where the customer has made a booking request
    const properties = await Property.find({
      "customerId.customer": customerId,
    }).populate("owner", "name email contact");

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No booking requests found for this customer.",
      });
    }

    return res.status(200).json({
      status: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error in bookingRequestByCustomerId:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch booking requests.",
    });
  }
};

const approveOrRejectRequest = async (req, res) => {
  try {
    const { propertyId, customerId, action } = req.body;

    if (!propertyId || !customerId || !action) {
      return res.status(400).json({
        status: false,
        message: "Property ID, Customer ID, and action are required.",
      });
    }

    const property = await Property.findById(propertyId);
    if (property) {
      property.customerId = await Promise.all(
        property.customerId.map(async (customerEntry) => {
          const customerData =
            customerEntry.customerRole === "User"
              ? await User.findById(customerEntry.customer).select("name email")
              : await Agent.findById(customerEntry.customer).select(
                  "name email"
                );

          return {
            ...customerEntry.toObject(),
            customer: customerData,
          };
        })
      );
    }
    console.log("Property:", property);
    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found.",
      });
    }

    const customer = property.customerId.find(
      (cust) => cust.customer._id.toString() === customerId
    );

    if (!customer) {
      return res.status(404).json({
        status: false,
        message: "Customer not found in request list.",
      });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "rentalsystem42@gmail.com",
        pass: "ofhe xvbp hwcr hesf",
      },
    });

    if (action === "approve") {
      // Approve the request
      const removedCustomers = property.customerId.filter(
        (cust) => cust.customer._id.toString() !== customerId
      );

      property.acceptedCustomerId = {
        customer: customerId,
        paid: false, // Default to unpaid
      };
      property.customerId = []; // Clear other requests
      property.availabilityStatus = false;
      await property.save();

      // Send approval email
      const mailOptions = {
        from: "rentalsystem42@gmail.com",
        to: customer.customer.email,
        subject: "Property Booking Approved - Complete Your Payment",
        text: `Dear ${customer.customer.name},\n\nYour booking for "${property.title}" at ${property.location.area}, ${property.location.city} has been approved.
Please complete the payment to confirm your booking from your profile.\n\nThanks for using Rent IT\n- Rent IT Team`,
      };
      await transporter.sendMail(mailOptions);

      for (const removedCustomer of removedCustomers) {
        const rejectionMailOptions = {
          from: "rentalsystem42@gmail.com",
          to: removedCustomer.customer.email,
          subject: "Booking Request Rejected",
          text: `Dear ${removedCustomer.customer.name},\n\nYour booking request for the property "${property.title}" at ${property.location.area}, ${property.location.city} has been rejected as another customer has been approved.\n\nThanks for using Rent IT\n- Rent IT Team`,
        };
        await transporter.sendMail(rejectionMailOptions);
      }

      return res.status(200).json({
        status: true,
        message: "Request approved and email sent to the customer.",
        data: property,
      });
    } else if (action === "reject") {
      // Reject the request
      property.customerId = property.customerId.filter(
        (cust) => cust.customer._id.toString() !== customerId
      );
      await property.save();

      // Send rejection email
      const mailOptions = {
        from: "rentalsystem42@gmail.com",
        to: customer.customer.email,
        subject: "Property Booking Rejected",
        text: `Dear ${customer.customer.name},\n\nYour booking request for the property "${property.title}" at ${property.location.area}, ${property.location.city} has been rejected.
        \n\nYou can explore other available properties from your profile.\n\nThanks for using Rent IT\n- Rent IT Team`,
      };
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        status: true,
        message: "Request rejected and email sent to the customer.",
        data: property,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid action. Use 'approve' or 'reject'.",
      });
    }
  } catch (error) {
    console.error("Error in approveOrRejectRequest:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getPropertiesByAcceptedCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        status: false,
        message: "Customer ID is required.",
      });
    }

    // Find properties where acceptedCustomerId.customer matches the provided customerId
    const properties = await Property.find({
      "acceptedCustomerId.customer": customerId,
    }).populate("owner", "name email contact");

    if (!properties || properties.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No properties found for the accepted customer.",
      });
    }

    return res.status(200).json({
      status: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error in getPropertiesByAcceptedCustomer:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch properties for the accepted customer.",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { propertyId, customerId } = req.body;

    if (!propertyId || !customerId) {
      return res.status(400).json({
        status: false,
        message: "Property ID and Customer ID are required.",
      });
    }

    // Find the property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found.",
      });
    }

    // Check if the customer is the accepted customer
    if (
      property.acceptedCustomerId &&
      property.acceptedCustomerId.customer.toString() === customerId
    ) {
      // Remove the accepted customer
      property.acceptedCustomerId = null;
      property.availabilityStatus = true; // Mark the property as available
    } else {
      // Remove the customer from the `customerId` array
      const initialLength = property.customerId.length;
      property.customerId = property.customerId.filter(
        (cust) => cust.customer.toString() !== customerId
      );

      if (property.customerId.length === initialLength) {
        return res.status(400).json({
          status: false,
          message: "Customer not found in the request list.",
        });
      }
    }

    await property.save();

    return res.status(200).json({
      status: true,
      message: "Booking canceled successfully.",
      data: property,
    });
  } catch (error) {
    console.error("Error in cancelBooking:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to cancel the booking.",
    });
  }
};

module.exports = {
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
};
