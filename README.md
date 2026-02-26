🚗 Car Rental System
A comprehensive full-stack car rental management system built with React.js, Node.js, Express.js, and MongoDB. This system allows users to browse, book, and manage vehicle rentals with role-based access control for customers, vehicle owners, and administrators.

🌟 Features
👥 User Management
User Registration & Authentication - Secure signup/login with JWT tokens

Role-Based Access Control - Three distinct user roles:

Customer - Browse and book vehicles

Vehicle Owner - List vehicles and track earnings

Administrator - Full system control and reporting

Profile Management - Users can update personal information

🚗 Vehicle Management
Add Vehicles - Owners can list vehicles with detailed specifications

Browse Vehicles - Filter by category, location, price, and availability

Vehicle Details - View comprehensive vehicle information with images

Availability Calendar - Real-time booking availability check

📅 Booking System
Search & Filter - Find available vehicles by date and location

Online Booking - Complete booking process with date selection

Booking Management - View, modify, and cancel bookings

Payment Integration - Secure online payment processing (demo)

💰 Payment & Billing
Online Payments - Secure payment processing simulation

Owner Earnings Dashboard - Track rental income and performance

Payment History - View all transactions and invoices

Revenue Reports - Detailed financial analytics

📍 Vehicle Tracking
Live Location Tracking - Real-time vehicle GPS tracking (simulated)

Driver Information - View driver details and contact information

ETA Calculation - Estimated time of arrival

Route Sharing - Share location with friends/family

👨‍💼 Admin Dashboard
System Analytics - Comprehensive usage statistics

User Management - Manage all user accounts and permissions

Booking Monitoring - View and manage all system bookings

Report Generation - Export detailed system reports

🛠️ Technology Stack
Frontend
React.js - UI library for building interactive interfaces

React Router - Client-side routing

Tailwind CSS - Utility-first CSS framework

Lucide React - Icon library

Axios - HTTP client for API calls

Backend
Node.js - JavaScript runtime environment

Express.js - Web application framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - JSON Web Tokens for authentication

BCrypt.js - Password hashing

CORS - Cross-origin resource sharing

Database Models
User - User accounts and authentication

Vehicle - Vehicle listings and specifications

Order - Booking and payment information

📁 Project Structure
text
car-rental-system/
├── backend/
│   ├── Controllers/
│   │   ├── AuthController.js
│   │   ├── VehicleController.js
│   │   └── OrderController.js
│   ├── Models/
│   │   ├── UserModel.js
│   │   ├── VehicleModel.js
│   │   └── OrderModel.js
│   ├── Routes/
│   │   ├── AuthRoutes.js
│   │   ├── VehicleRoutes.js
│   │   ├── OrderRoutes.js
│   │   └── UserRoutes.js
│   ├── Middleware/
│   │   └── authMiddleware.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── PaymentModal.jsx
│       │   └── VehicleTracking.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── VehicleList.jsx
│       │   ├── AddVehicle.jsx
│       │   ├── UserBookings.jsx
│       │   ├── UserManagement.jsx
│       │   ├── OwnerEarnings.jsx
│       │   ├── AdminReports.jsx
│       │   └── Profile.jsx
│       ├── App.jsx
│       └── index.jsx
└── README.md
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

MongoDB Atlas account or local MongoDB

Git

Installation
Clone the repository

bash
git clone https://github.com/yourusername/car-rental-system.git
cd car-rental-system
Backend Setup

bash
cd backend
npm install
Configure Environment Variables
Create a .env file in the backend directory:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Frontend Setup

bash
cd ../frontend
npm install
Run the Application

Start Backend Server:

bash
cd backend
npm run dev
Start Frontend Development Server:

bash
cd frontend
npm start
Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

🔐 Demo Accounts
For testing purposes, you can use these demo accounts:

Role	Email	Password
Administrator	admin@carrental.com	admin123
Vehicle Owner	owner@carrental.com	owner123
Customer	customer@carrental.com	customer123
📊 API Endpoints
Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - User login

GET /api/auth/profile - Get user profile

PUT /api/auth/profile - Update profile

Vehicles
GET /vehicles - Get all available vehicles

GET /vehicles/:id - Get vehicle by ID

POST /vehicles - Add new vehicle (Owner/Admin only)

PUT /vehicles/:id - Update vehicle (Owner/Admin only)

DELETE /vehicles/:id - Delete vehicle (Owner/Admin only)

Orders/Bookings
POST /orders - Create new booking

GET /orders - Get all bookings (Admin only)

GET /orders/customer/:email - Get customer bookings

PUT /orders/:id/cancel - Cancel booking

PUT /orders/:id/status - Update order status (Admin/Owner)

Users (Admin Only)
GET /api/users - Get all users

GET /api/users/:id - Get user by ID

PUT /api/users/:id/role - Update user role

PUT /api/users/:id/activate - Activate user

PUT /api/users/:id/deactivate - Deactivate user

🎨 Key Features in Detail
Role-Based Dashboard
Customer Dashboard: Browse vehicles, manage bookings, track rentals

Owner Dashboard: Manage vehicle listings, view earnings, track bookings

Admin Dashboard: System analytics, user management, reports

Vehicle Listing Features
Advanced filtering (category, price range, location, dates)

High-quality image galleries

Detailed specifications and features

Real-time availability status

Booking System
Date range selection with availability validation

Customer information collection

Special requests handling

Automated price calculation

Payment Processing
Secure payment form

Payment success/failure handling

Invoice generation

Transaction history

🧪 Testing the Application
Register as different user types to experience role-specific features

Add vehicles as an Owner to populate the system

Make bookings as a Customer to test the rental flow

Use Admin features to manage users and view reports

Test payment processing with demo payment details

📱 Responsive Design
The application is fully responsive and works on:

Desktop computers

Tablets

Mobile phones

🔮 Future Enhancements
Real payment gateway integration (Stripe/PayPal)

Real GPS tracking with Google Maps API

Email notifications and reminders

Mobile app using React Native

Review and rating system

Insurance options

Multi-language support

Advanced analytics with charts

Bulk vehicle import/export

Document verification system

🐛 Troubleshooting
Common Issues
MongoDB Connection Failed

Verify your connection string in .env

Check if MongoDB Atlas IP whitelist includes your IP

Ensure network connectivity

JWT Authentication Errors

Clear browser localStorage

Verify JWT secret matches

Check token expiration

CORS Errors

Ensure backend CORS configuration is correct

Verify frontend URL is whitelisted

Port Already in Use

Change port in .env file

Kill process using the port: kill -9 $(lsof -ti:5000)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

🙏 Acknowledgments
Icons by Lucide React

UI Components with Tailwind CSS

Database by MongoDB Atlas

Backend framework by Express.js

📞 Support
For support, email: sewwandiedirisooriya318@gmail.com or create an issue in the GitHub repository.
