// pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { 
  Car, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  MapPin,
  Star
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });

  const [recentVehicles, setRecentVehicles] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setStats({
          totalVehicles: 24,
          availableVehicles: 18,
          totalBookings: 156,
          activeBookings: 12,
          totalRevenue: 254800,
          monthlyRevenue: 45200
        });

        setRecentVehicles([
          {
            id: 1,
            make: "Toyota",
            model: "Camry",
            year: 2023,
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400",
            price: 4500,
            location: "Colombo",
            status: "Available"
          },
          {
            id: 2,
            make: "Honda",
            model: "Civic",
            year: 2022,
            image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
            price: 4200,
            location: "Kandy",
            status: "Rented"
          },
          {
            id: 3,
            make: "BMW",
            model: "X5",
            year: 2023,
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
            price: 12000,
            location: "Galle",
            status: "Available"
          }
        ]);

        setRecentBookings([
          {
            id: 1,
            vehicle: "Toyota Camry 2023",
            customer: "John Smith",
            startDate: "2024-01-15",
            endDate: "2024-01-20",
            total: 22500,
            status: "Active"
          },
          {
            id: 2,
            vehicle: "Honda Civic 2022",
            customer: "Sarah Johnson",
            startDate: "2024-01-18",
            endDate: "2024-01-25",
            total: 29400,
            status: "Upcoming"
          },
          {
            id: 3,
            vehicle: "BMW X5 2023",
            customer: "Mike Wilson",
            startDate: "2024-01-10",
            endDate: "2024-01-12",
            total: 24000,
            status: "Completed"
          }
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your car rental management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Car}
          title="Total Vehicles"
          value={stats.totalVehicles}
          subtitle={`${stats.availableVehicles} available`}
          color="bg-blue-500"
        />
        <StatCard
          icon={Calendar}
          title="Total Bookings"
          value={stats.totalBookings}
          subtitle={`${stats.activeBookings} active`}
          color="bg-green-500"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
          subtitle={`Rs. ${stats.monthlyRevenue.toLocaleString()} this month`}
          color="bg-purple-500"
        />
        <StatCard
          icon={Users}
          title="Customer Satisfaction"
          value="4.8/5"
          subtitle="Based on 124 reviews"
          color="bg-yellow-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Monthly Growth"
          value="+15.2%"
          subtitle="Compared to last month"
          color="bg-green-500"
        />
        <StatCard
          icon={Clock}
          title="Average Rental"
          value="4.2 days"
          subtitle="Per booking"
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Vehicles Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Recent Vehicles
            </h2>
            <p className="text-gray-600 text-sm">Recently added vehicles to the fleet</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">Rs. {vehicle.price}/day</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
              View All Vehicles
            </button>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Bookings
            </h2>
            <p className="text-gray-600 text-sm">Latest rental activities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{booking.vehicle}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Active' 
                        ? 'bg-blue-100 text-blue-800'
                        : booking.status === 'Upcoming'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Customer: {booking.customer}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {booking.startDate} to {booking.endDate}
                    </span>
                    <span className="font-semibold text-green-600">
                      Rs. {booking.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
              View All Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-200 flex flex-col items-center">
            <Car className="w-8 h-8 mb-2" />
            <span>Add Vehicle</span>
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition duration-200 flex flex-col items-center">
            <Calendar className="w-8 h-8 mb-2" />
            <span>New Booking</span>
          </button>
          <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition duration-200 flex flex-col items-center">
            <Users className="w-8 h-8 mb-2" />
            <span>Manage Customers</span>
          </button>
          <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition duration-200 flex flex-col items-center">
            <TrendingUp className="w-8 h-8 mb-2" />
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;