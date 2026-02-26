// Controllers/VehicleController.js
const Vehicle = require("../Model/VehicleModel");
const mongoose = require("mongoose"); // Add this import

// Add a new vehicle (simplified - no auth)
const addVehicle = async (req, res) => {
  const {
    make,
    model,
    year,
    licensePlate,
    category,
    transmission,
    fuelType,
    seatingCapacity,
    pricePerDay,
    features,
    images,
    description,
    location,
    mileage,
    condition,
  } = req.body;

  try {
    // Check if license plate already exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
      return res.status(400).json({
        message: "Vehicle with this license plate already exists",
      });
    }

    const vehicle = new Vehicle({
      make,
      model,
      year,
      licensePlate,
      category,
      transmission,
      fuelType,
      seatingCapacity,
      pricePerDay,
      features: features || [],
      images: images || [],
      description,
      location,
      mileage,
      condition: condition || "Good",
      // Remove owner field since no authentication
    });

    await vehicle.save();

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({
      message: "Error adding vehicle",
      error: error.message,
    });
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ availability: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      vehicles,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({
      message: "Error fetching vehicles",
      error: error.message,
    });
  }
};

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      vehicle,
    });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({
      message: "Error fetching vehicle",
      error: error.message,
    });
  }
};

module.exports = {
  addVehicle,
  getAllVehicles,
  getVehicleById,
};