
const mongoose = require('mongoose');
require('dotenv').config();

// Get DB URI from environment or use MongoDB Atlas free tier demo connection
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://demo:demo@cluster0.mongodb.net/focus-cubes?retryWrites=true&w=majority';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      // Removed deprecated options
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Don't exit the process, just log the error
    console.log('Continuing without database connection...');
  }
};

module.exports = connectDB;
