// Model/OrderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerInfo: {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "active", "completed", "cancelled"],
    default: "pending",
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  specialRequests: {
    type: String,
    default: "",
    maxlength: 500,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate total amount before saving
orderSchema.pre("save", function (next) {
  if (this.isModified("startDate") || this.isModified("endDate") || this.isModified("pricePerDay")) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const timeDiff = end.getTime() - start.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.totalAmount = this.totalDays * this.pricePerDay;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Orderrent", orderSchema);