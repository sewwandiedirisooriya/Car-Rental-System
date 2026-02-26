// scripts/createDemoUsers.js
const mongoose = require('mongoose');
const User = require('../Model/UserModel');

const demoUsers = [
  {
    username: 'admin',
    email: 'admin@carrental.com',
    password: 'admin123',
    fullName: 'System Administrator',
    phone: '+1234567890',
    role: 'admin',
    isVerified: true,
    isActive: true
  },
  {
    username: 'vehicleowner',
    email: 'owner@carrental.com', 
    password: 'owner123',
    fullName: 'Vehicle Owner',
    phone: '+1234567891',
    role: 'owner',
    isVerified: true,
    isActive: true
  },
  {
    username: 'demo_customer',
    email: 'customer@carrental.com',
    password: 'customer123',
    fullName: 'Demo Customer',
    phone: '+1234567892',
    role: 'customer',
    isVerified: true,
    isActive: true
  }
];

async function createDemoUsers() {
  try {
    // Connect to MongoDB with the same connection string as server.js
    await mongoose.connect('mongodb+srv://dmrkalhara1007:kF5o1i7F8wMsJMk4@mycluster.e2pzt.mongodb.net/');
    console.log('Connected to MongoDB');

    // Clear existing demo users (optional)
    await User.deleteMany({
      email: { $in: demoUsers.map(user => user.email) }
    });
    console.log('Cleared existing demo users');

    // Create new demo users
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email}`);
    }

    console.log('Demo users created successfully!');
    
    // Verify users were created
    const users = await User.find({});
    console.log(`Total users in database: ${users.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo users:', error);
    process.exit(1);
  }
}

createDemoUsers();