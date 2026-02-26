// Routes/UserRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const { authenticateToken, isAdmin } = require("../Middleware/authMiddleware");

// Admin only routes
router.get("/", authenticateToken, isAdmin, userController.getAllUsers);
router.get("/stats", authenticateToken, isAdmin, userController.getUserStats);
router.get("/:id", authenticateToken, isAdmin, userController.getUserById);
router.put("/:id/role", authenticateToken, isAdmin, userController.updateUserRole);
router.put("/:id/deactivate", authenticateToken, isAdmin, userController.deactivateUser);
router.put("/:id/activate", authenticateToken, isAdmin, userController.activateUser);

module.exports = router;