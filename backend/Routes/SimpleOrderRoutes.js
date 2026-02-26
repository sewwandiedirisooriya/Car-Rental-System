// Routes/SimpleOrderRoutes.js
const express = require("express");
const router = express.Router();
const SimpleOrderController = require("../Controllers/SimpleOrderController");

// Create order
router.post("/", SimpleOrderController.createOrder);

// Get all orders
router.get("/", SimpleOrderController.getAllOrders);

module.exports = router;