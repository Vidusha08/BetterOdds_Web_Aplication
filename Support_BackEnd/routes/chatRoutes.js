const express = require('express');
const { getChatHistory, postChatMessage } = require('../controllers/chatController');

const router = express.Router();

// Get chat history
router.get('/', getChatHistory);

// Post a new chat message
router.post('/', postChatMessage);

module.exports = router;
