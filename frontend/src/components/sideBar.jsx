import React from "react";
import { 
  Home, 
  Car, 
  Plus, 
  Calendar, 
  History, 
  User, 
  Headphones,
  LogOut,
  Users,
  DollarSign,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  // Admin menu items
  const adminMenuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "User Management", icon: Users, path: "/admin/users" },
    { name: "All Vehicles", icon: Car, path: "/vehicles" },
    { name: "All Bookings", icon: Calendar, path: "/bookings" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Support", icon: Headphones, path: "/support" },
  ];

  // Owner menu items
  const ownerMenuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "My Vehicles", icon: Car, path: "/vehicles" },
    { name: "Add Vehicle", icon: Plus, path: "/addVehicle" },
    { name: "My Bookings", icon: Calendar, path: "/bookings" },
    { name: "Booking History", icon: History, path: "/history" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Support", icon: Headphones, path: "/support" },
  ];

  // Customer menu items
  const customerMenuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Browse Vehicles", icon: Car, path: "/vehicles" },
    { name: "My Bookings", icon: Calendar, path: "/bookings" },
    { name: "Booking History", icon: History, path: "/history" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Support", icon: Headphones, path: "/support" },
  ];

  // Get menu items based on user role
  const getMenuItems = () => {
    if (!user) return customerMenuItems;
    
    switch (user.role) {
      case 'admin':
        return adminMenuItems;
      case 'owner':
        return ownerMenuItems;
      default:
        return customerMenuItems;
    }
  };

  const menuItems = getMenuItems();

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/signIn');
  };

  // Get user role display name
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'owner':
        return 'Vehicle Owner';
      case 'customer':
        return 'Customer';
      default:
        return 'Guest';
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    return user?.fullName || 'Guest User';
  };

  // Get role-based badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'owner':
        return 'bg-purple-100 text-purple-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Car className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">CarRental</h1>
        </div>
        <p className="text-sm text-gray-500">Vehicle Rental System</p>
      </div>

      {/* User Section - Now Dynamic */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">
              {getUserDisplayName()}
            </p>
            <p className="text-xs text-gray-500">
              {user ? (
                <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              ) : (
                'Guest'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                <Icon className="w-5 h-5 mr-3 text-gray-400" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button 
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">Version 2.0.0</p>
          <p className="text-xs text-gray-400 mt-1">
            {user ? `Logged in as ${getRoleDisplayName(user.role)}` : 'Not logged in'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;