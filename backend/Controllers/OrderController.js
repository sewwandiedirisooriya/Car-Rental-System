// Controllers/OrderController.js
const Order = require("../Model/OrderModel");
const Vehicle = require("../Model/VehicleModel");

// Create a new order
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
        message: "Vehicle is not available for rental",
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

    // Check if vehicle is available for the requested dates
    const conflictingOrders = await Order.find({
      vehicle: vehicleId,
      status: { $in: ["confirmed", "active"] },
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (conflictingOrders.length > 0) {
      return res.status(400).json({
        message: "Vehicle is not available for the selected dates",
      });
    }

    // Calculate total days and amount
    const timeDiff = end.getTime() - start.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalAmount = totalDays * vehicle.pricePerDay;

    // Create the order
    const order = new Order({
      customerInfo,
      vehicle: vehicleId,
      startDate: start,
      endDate: end,
      totalDays,
      pricePerDay: vehicle.pricePerDay,
      totalAmount,
      pickupLocation,
      dropoffLocation,
      specialRequests: specialRequests || "",
      paymentStatus: "paid", // Auto-confirm for demo
      status: "confirmed", // Auto-confirm for demo
    });

    await order.save();

    // Update vehicle availability during rental period
    // In a real system, you might want to mark it as unavailable only for those dates
    // For simplicity, we'll keep it available for other bookings

    // Populate the order with vehicle details
    await order.populate("vehicle");

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

// Get all orders
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

// Get orders by customer email
const getOrdersByCustomer = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ "customerInfo.email": email })
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    await order.populate("vehicle");

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Check if order can be cancelled
    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.status = "cancelled";
    await order.save();

    await order.populate("vehicle");

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      message: "Error cancelling order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  updateOrderStatus,
  cancelOrder,
};