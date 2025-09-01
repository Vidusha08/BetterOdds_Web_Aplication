const Contact = require('../models/Contact');

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, eventId, message } = req.body;

    // Create new contact entry in the database
    const newContact = new Contact({
      name,
      email: email.toLowerCase(),
      eventId,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
};