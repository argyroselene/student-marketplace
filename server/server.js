// Load environment variables from .env 
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const cors = require('cors');
const http = require('http');
const Message = require('./models/Message');
const messageRoutes = require('./routes/messageRoutes');
const { Server } = require('socket.io');

// Routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // your frontend URLs
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Route to get chat messages between two users
app.get('/api/messages/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1, recipientId: user2 },
        { senderId: user2, recipientId: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ============ SOCKET.IO REAL-TIME CHAT ============

// Map userId to socket.id for direct messaging
const userSocketMap = {};

// When a client connects via Socket.IO
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Register user socket on "join"
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  // Handle sending a direct message
  socket.on('send_message', async ({ senderId, recipientId, text }) => {
    try {
      // Save message to DB
      const message = new Message({ senderId, recipientId, text });
      await message.save();

      // Emit to recipient if online
      const recipientSocketId = userSocketMap[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', {
          senderId,
          text,
          createdAt: message.createdAt
        });
      }
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    if (socket.userId) {
      delete userSocketMap[socket.userId];
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




