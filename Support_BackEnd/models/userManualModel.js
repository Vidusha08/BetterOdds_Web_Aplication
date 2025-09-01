const mongoose = require('mongoose');

const userManualSchema = new mongoose.Schema({
  category: { type: String, required: true },
  language: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  image: { type: String },
  video: { type: String },
});

const UserManual = mongoose.model('UserManual', userManualSchema);

module.exports = UserManual;