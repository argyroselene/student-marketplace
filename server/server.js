// Load environment variables from .env 
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const cors = require('cors'); // Allow frontend requests
const http = require('http');
const { Server } = require('socket.io');
const users = new Map();

// Routes // <-- This enables JSON body parsing

const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

// Initialize Express
const app = express();
app.use(express.json());
const server = http.createServer(app); // Wrap Express in HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // allow all for dev; restrict in prod
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Socket.IO Events
const userSocketMap = {}; // userId -> socket.id

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // When user joins, register their socket
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;
    console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  // Handle direct message
  socket.on('send_message', ({ senderId, recipientId, text }) => {
    const recipientSocketId = userSocketMap[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive_message', {
        senderId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      delete userSocketMap[socket.userId];
    }
    console.log('User disconnected:', socket.id);
  });
});



// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

