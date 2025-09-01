const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  new: { type: Boolean, required: true },
  unread: { type: Boolean, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;