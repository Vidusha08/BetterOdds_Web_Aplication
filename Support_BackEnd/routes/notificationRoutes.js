const express = require('express');
const { getNotifications, createNotification, deleteNotification, markAllAsRead } = require('../controllers/notificationController');
const router = express.Router();

// Get all notifications
router.get('/', getNotifications);

// Create a new notification
router.post('/', createNotification);

// Delete a notification by ID
router.delete('/:id', deleteNotification);

// Mark all notifications as read
router.patch('/markAllAsRead', markAllAsRead);

module.exports = router;