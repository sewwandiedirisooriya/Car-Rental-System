import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AddVehicle from './pages/addVehicle';
import VehicleList from './pages/VehicleList';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp'; // Fixed import (capital S)
import UserBookings from './pages/UserBookings';
import UserManagement from './pages/UserManagement'; // Add this import

function App() {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Show sidebar only if user is logged in and not on auth pages
  const showSidebar = user && location.pathname !== '/signIn' && location.pathname !== '/signUp';

  return (
    <div className="flex h-screen bg-gray-50">
      {showSidebar && <Sidebar user={user} onLogout={handleLogout} />}

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route 
            path="/signIn" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signUp" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <SignUp onLogin={handleLogin} />
            } 
          />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signIn" replace />} />
          <Route path="/addVehicle" element={user ? <AddVehicle /> : <Navigate to="/signIn" replace />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/bookings" element={user ? <UserBookings /> : <Navigate to="/signIn" replace />} />
          <Route path="/admin/users" element={user ? <UserManagement /> : <Navigate to="/signIn" replace />} />
          <Route 
            path="/" 
            element={user ? <Dashboard /> : <Navigate to="/signIn" replace />} 
          />
          
          {/* Fallback route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;