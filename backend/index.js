import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.js';
import familyGroupRoutes from './routes/familyGroup.js'; // Import family group routes
import FamilyGroup from './models/FamilyGroup.js'; // Fixed the import path

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server for Socket.io integration
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // In production, specify the allowed frontend origin(s)
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit if database connection fails
  }
};

// Connect to the database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/family-group', familyGroupRoutes); // Use family group routes

// Socket.io Chat Feature
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Load previous messages for a specific family group
  socket.on('loadMessages', async (familyGroupId) => {
    try {
      const familyGroup = await FamilyGroup.findById(familyGroupId).select('mensahe').lean();
      if (familyGroup) {
        socket.emit('previousMessages', familyGroup.mensahe); // Emit messages back to the client
      } else {
        socket.emit('error', 'Family group not found');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('error', 'Error fetching messages');
    }
  });

  // Handle new messages
  socket.on('sendMessage', async (data) => {
    const { familyGroupId, msname, message, ava } = data;
    try {
      const updatedFamilyGroup = await FamilyGroup.findByIdAndUpdate(
        familyGroupId,
        {
          $push: {
            mensahe: {
              msname,
              message,
              ava,
              timestamp: new Date().toISOString(), // Add timestamp to message
            },
          },
        },
        { new: true }
      );

      if (updatedFamilyGroup) {
        const newMessage = updatedFamilyGroup.mensahe[updatedFamilyGroup.mensahe.length - 1];
        io.emit('newMessage', newMessage); // Broadcast new message to all clients
      } else {
        socket.emit('error', 'Family group not found');
      }
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', 'Error saving message');
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
