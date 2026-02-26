// Routes/OrderRoutes.js
const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

// Create a new order
router.post("/", OrderController.createOrder);

// Get all orders
router.get("/", OrderController.getAllOrders);

// Get orders by customer email
router.get("/customer/:email", OrderController.getOrdersByCustomer);

// Update order status
router.put("/:id/status", OrderController.updateOrderStatus);

// Cancel order
router.put("/:id/cancel", OrderController.cancelOrder);

module.exports = router;