// Load environment variables from .env 
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const cors = require('cors'); // Allow frontend requests
const http = require('http');
const { Server } = require('socket.io');

// Routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

// Initialize Express
const app = express();
const server = http.createServer(app); // Wrap Express in HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // allow all for dev; restrict in prod
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

