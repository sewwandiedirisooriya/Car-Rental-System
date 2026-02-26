// Middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "car-rental-secret-key-2024";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      message: "Access token required"
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token"
      });
    }

    req.userId = user.userId;
    req.userRole = user.role;
    req.userEmail = user.email;
    next();
  });
};

const isOwner = (req, res, next) => {
  if (req.userRole !== 'owner' && req.userRole !== 'admin') {
    return res.status(403).json({
      message: "Owner access required"
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      message: "Admin access required"
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  isOwner,
  isAdmin
};