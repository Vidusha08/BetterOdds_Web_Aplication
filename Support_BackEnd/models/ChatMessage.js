const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: 'User', // Default to 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
