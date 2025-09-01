const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userManualRoutes = require('./routes/userManualRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/usermanual', userManualRoutes);
app.use('/api/chat', chatRoutes);

// WebSocket for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (message) => {
    console.log('Message received:', message);

    io.emit('receiveMessage', message); // Broadcast message to all clients

    // Bot logic to respond
    let botReply = '';
    if (message.message.toLowerCase().includes('hello')) {
      botReply = 'Hello! How can I assist you today?';
    } else if (message.message.toLowerCase().includes('betting')) {
      botReply = 'Are you looking for tips on cricket betting? You can visit our betting section in User Manual Page for more information!';
    } else if (message.message.toLowerCase().includes('account')) {
      botReply = 'For account-related issues, please visit your profile settings or User Manual Page.';
    } else {
      botReply = 'Sorry, I did not understand that. Please try asking something else.';
    }

    // Bot reply to the client
    const botMessage = { user: 'Bot', message: botReply };
    io.emit('receiveMessage', botMessage);

    // Save chat message to database
    try {
      const ChatMessage = require('./models/ChatMessage');
      await new ChatMessage({ user: message.user, message: message.message }).save();
      await new ChatMessage({ user: 'Bot', message: botReply }).save();
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
