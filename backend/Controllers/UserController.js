// Controllers/UserController.js
const User = require("../Model/UserModel");

const userController = {
  // Get all users (admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password").sort({ createdAt: -1 });
      
      res.status(200).json({
        users
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        message: "Error fetching users",
        error: error.message
      });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        user
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        message: "Error fetching user",
        error: error.message
      });
    }
  },

  // Update user role (admin only)
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User role updated successfully",
        user
      });
    } catch (error) {
      console.error("Update user role error:", error);
      res.status(500).json({
        message: "Error updating user role",
        error: error.message
      });
    }
  },

  // Deactivate user (admin only)
  deactivateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User deactivated successfully",
        user
      });
    } catch (error) {
      console.error("Deactivate user error:", error);
      res.status(500).json({
        message: "Error deactivating user",
        error: error.message
      });
    }
  },

  // Activate user (admin only)
  activateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: true },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User activated successfully",
        user
      });
    } catch (error) {
      console.error("Activate user error:", error);
      res.status(500).json({
        message: "Error activating user",
        error: error.message
      });
    }
  },

  // Get user statistics (admin only)
  getUserStats: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalCustomers = await User.countDocuments({ role: "customer" });
      const totalOwners = await User.countDocuments({ role: "owner" });
      const totalAdmins = await User.countDocuments({ role: "admin" });
      const activeUsers = await User.countDocuments({ isActive: true });
      const inactiveUsers = await User.countDocuments({ isActive: false });

      // New users this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const newUsersThisMonth = await User.countDocuments({
        createdAt: { $gte: startOfMonth }
      });

      res.status(200).json({
        stats: {
          totalUsers,
          totalCustomers,
          totalOwners,
          totalAdmins,
          activeUsers,
          inactiveUsers,
          newUsersThisMonth
        }
      });
    } catch (error) {
      console.error("Get user stats error:", error);
      res.status(500).json({
        message: "Error fetching user statistics",
        error: error.message
      });
    }
  }
};

module.exports = userController;