// Model/VehicleModel.js
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear() + 1,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Economy", "Compact", "Standard", "Full-size", "Premium", "Luxury", "SUV", "Van"],
  },
  transmission: {
    type: String,
    required: true,
    enum: ["Manual", "Automatic"],
  },
  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
  },
  seatingCapacity: {
    type: Number,
    required: true,
    min: 2,
    max: 15,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  availability: {
    type: Boolean,
    default: true,
  },
  mileage: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    required: true,
    enum: ["Excellent", "Good", "Fair"],
    default: "Good",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);