
const mongoose = require('mongoose');
require('dotenv').config();

// Get DB URI from environment or use default
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/focus-cubes';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
