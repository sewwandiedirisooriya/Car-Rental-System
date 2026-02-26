// Route/VehicleRoutes.js
const express = require("express");
const router = express.Router();
const VehicleController = require("../Controllers/VehicleController");

// Add vehicle
router.post("/", VehicleController.addVehicle);

// Get all vehicles
router.get("/", VehicleController.getAllVehicles);

// Get single vehicle by ID
router.get("/:id", VehicleController.getVehicleById);

module.exports = router;