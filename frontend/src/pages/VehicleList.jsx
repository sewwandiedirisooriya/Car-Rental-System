// pages/VehicleList.jsx
import React, { useState, useEffect } from "react";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rentForm, setRentForm] = useState({
    startDate: "",
    endDate: "",
    customerInfo: {
      fullName: "",
      phone: "",
      email: "",
      licenseNumber: ""
    },
    pickupLocation: "",
    dropoffLocation: "",
    specialRequests: ""
  });

  const categories = ["All", "Economy", "Compact", "Standard", "Full-size", "Premium", "Luxury", "SUV", "Van"];

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/vehicles");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      setVehicles(data.vehicles || []);
    } catch (err) {
      setError(err.message || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  // In your VehicleList.jsx, update the openRentModal function:
const openRentModal = (vehicle) => {
  // Get logged-in user data
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  setSelectedVehicle(vehicle);
  setRentForm({
    startDate: "",
    endDate: "",
    customerInfo: user ? {
      fullName: user.fullName,
      phone: user.phone || "",
      email: user.email,
      licenseNumber: ""
    } : {
      fullName: "",
      phone: "",
      email: "",
      licenseNumber: ""
    },
    pickupLocation: vehicle.location.address,
    dropoffLocation: vehicle.location.address,
    specialRequests: ""
  });
  setShowRentModal(true);
};

  const closeRentModal = () => {
    setShowRentModal(false);
    setSelectedVehicle(null);
  };

  const handleRentFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("customerInfo.")) {
      const field = name.split(".")[1];
      setRentForm({
        ...rentForm,
        customerInfo: {
          ...rentForm.customerInfo,
          [field]: value
        }
      });
    } else {
      setRentForm({
        ...rentForm,
        [name]: value
      });
    }
  };

  const handleRentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        vehicleId: selectedVehicle._id,
        startDate: rentForm.startDate,
        endDate: rentForm.endDate,
        customerInfo: rentForm.customerInfo,
        pickupLocation: rentForm.pickupLocation,
        dropoffLocation: rentForm.dropoffLocation,
        specialRequests: rentForm.specialRequests
      };
  
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      alert("Vehicle rented successfully!");
      closeRentModal();
      
      // Optional: Refresh vehicles to update availability
      fetchVehicles();
    } catch (err) {
      alert("Error renting vehicle: " + err.message);
    }
  };

  const filteredVehicles = selectedCategory === "All" 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error: {error}</p>
        <button 
          onClick={fetchVehicles}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Vehicles</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            {/* Vehicle Image */}
            <div className="relative h-48">
              <img 
                src={vehicle.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"} 
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                {vehicle.category}
              </div>
              <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
                {vehicle.condition}
              </div>
            </div>
            
            {/* Vehicle Info */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </h3>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{vehicle.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transmission:</span>
                  <span className="text-sm font-medium">{vehicle.transmission}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fuel Type:</span>
                  <span className="text-sm font-medium">{vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Seating:</span>
                  <span className="text-sm font-medium">{vehicle.seatingCapacity} people</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="text-sm font-medium">{vehicle.location.city}</span>
                </div>
              </div>
              
              {/* Price and Action */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    Rs.{vehicle.pricePerDay}
                  </span>
                  <span className="text-sm text-gray-600">/day</span>
                </div>
                
                <button
                  onClick={() => openRentModal(vehicle)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rent Modal */}
      {showRentModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Rent {selectedVehicle.make} {selectedVehicle.model}</h2>
              
              <form onSubmit={handleRentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={rentForm.startDate}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={rentForm.endDate}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerInfo.fullName"
                      value={rentForm.customerInfo.fullName}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="customerInfo.phone"
                      value={rentForm.customerInfo.phone}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="customerInfo.email"
                      value={rentForm.customerInfo.email}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">License Number *</label>
                    <input
                      type="text"
                      name="customerInfo.licenseNumber"
                      value={rentForm.customerInfo.licenseNumber}
                      onChange={handleRentFormChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={rentForm.specialRequests}
                    onChange={handleRentFormChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeRentModal}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Confirm Rental
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* No Vehicles Message */}
      {filteredVehicles.length === 0 && (
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">No vehicles available in this category.</p>
          <p className="text-gray-500 mt-2">Try selecting a different category or add some vehicles to the system.</p>
        </div>
      )}
    </div>
  );
}

export default VehicleList;