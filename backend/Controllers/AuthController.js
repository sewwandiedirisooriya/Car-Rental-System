// Controllers/AuthController.js
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "car-rental-secret-key-2024";

const authController = {
  register: async (req, res) => {
    try {
      const { fullName, username, email, phone, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User with this email or username already exists"
        });
      }

      // For demo, auto-verify users. In production, send verification email
      const user = new User({
        fullName,
        username,
        email,
        phone,
        password,
        role: role || "customer",
        isVerified: true // Auto-verify for demo
      });

      await user.save();

      // Generate token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          role: user.role,
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data without password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        isVerified: user.isVerified
      };

      res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
        token
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "Registration failed",
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          message: "Account is deactivated. Please contact support."
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      // Generate token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          role: user.role,
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data without password
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        isVerified: user.isVerified
      };

      res.status(200).json({
        message: "Login successful",
        user: userResponse,
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Login failed",
        error: error.message
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        user
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        message: "Error fetching profile",
        error: error.message
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { fullName, phone } = req.body;

      const user = await User.findByIdAndUpdate(
        req.userId,
        { fullName, phone },
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "Profile updated successfully",
        user
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        message: "Error updating profile",
        error: error.message
      });
    }
  }
};

module.exports = authController;