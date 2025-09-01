const ChatMessage = require('../models/ChatMessage');

// Fetch chat history
const getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find(); // Get all chat messages
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve chat history' });
  }
};

// Post a new chat message
const postChatMessage = async (req, res) => {
  const { user, message } = req.body;

  try {
    const newMessage = new ChatMessage({ user, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save the message' });
  }
};

module.exports = {
  getChatHistory,
  postChatMessage,
};