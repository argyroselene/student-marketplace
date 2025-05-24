// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const cors = require('cors'); // Optional: allow frontend requests

// Import your auth routes
const authRoutes = require('./routes/authRoutes'); // <-- Add this line

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enables cross-origin requests (helpful during dev)
app.use(express.json()); // Parses incoming JSON payloads

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add auth routes here
app.use('/api/auth', authRoutes); // <-- Add this line

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const listingRoutes = require('./routes/listingRoutes');

// after other app.use statements
app.use('/api/listings', listingRoutes);
