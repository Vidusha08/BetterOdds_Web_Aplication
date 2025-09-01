const Notification = require('../models/notificationModel');

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const notifications = req.body; // Expecting an array of notifications

  // Validate that the incoming data is an array
  if (!Array.isArray(notifications)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }

  try {
    // Check for required fields in each notification
    for (const notification of notifications) {
      const { icon, message, date } = notification;

      if (!icon || !message || !date) {
        return res.status(400).json({ message: 'Icon, message, and date are required for each notification.' });
      }
    }

    // Save all notifications to the database
    const savedNotifications = await Notification.insertMany(notifications);
    res.status(201).json(savedNotifications);
  } catch (error) {
    console.error('Error creating notifications:', error);
    res.status(500).json({ message: 'Failed to create notifications', details: error.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({}, { unread: false });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotifications, createNotification, deleteNotification, markAllAsRead };