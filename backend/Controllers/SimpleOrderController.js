// Controllers/SimpleOrderController.js
const Order = require("../Model/OrderModel");
const Vehicle = require("../Model/VehicleModel");

// Create a new order (no authentication)
const createOrder = async (req, res) => {
  const {
    vehicleId,
    startDate,
    endDate,
    customerInfo,
    pickupLocation,
    dropoffLocation,
    specialRequests,
  } = req.body;

  try {
    // Check if vehicle exists and is available
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    if (!vehicle.availability) {
      return res.status(400).json({
        message: "Vehicle is not available",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        message: "Start date cannot be in the past",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    // Calculate total days and amount
    const timeDiff = end.getTime() - start.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalAmount = totalDays * vehicle.pricePerDay;

    // Create the order (without customer ID)
    const order = new Order({
      vehicle: vehicleId,
      startDate: start,
      endDate: end,
      totalDays,
      pricePerDay: vehicle.pricePerDay,
      totalAmount,
      customerInfo,
      pickupLocation,
      dropoffLocation,
      specialRequests: specialRequests || "",
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Get all orders (simple version)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};