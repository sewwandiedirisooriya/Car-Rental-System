// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const vehicleRoutes = require("./Routes/VehicleRoutes");
const simpleOrderRoutes = require("./Routes/SimpleOrderRoutes"); // Add this
const orderRoutes = require("./Routes/OrderRoutes");
const authRoutes = require("./Routes/AuthRoutes"); // Add this
const userRoutes = require("./Routes/UserRoutes"); // Add this

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/vehicles", vehicleRoutes);
app.use("/orders", simpleOrderRoutes); // Add this
app.use("/orders", orderRoutes); 
app.use("/api/auth", authRoutes); // Add this
app.use("/api/users", userRoutes); // Add this

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Car Rental API is running!" });
});

// MongoDB Connection
//kF5o1i7F8wMsJMk4
mongoose
  .connect("mongodb+srv://dmrkalhara1007:kF5o1i7F8wMsJMk4@mycluster.e2pzt.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));