// Routes/AuthRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const { authenticateToken } = require("../Middleware/authMiddleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/profile", authenticateToken, authController.getProfile);
router.put("/profile", authenticateToken, authController.updateProfile);

module.exports = router;