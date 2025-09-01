const FAQ = require('../models/faqModel');

// Get all FAQs
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new FAQ
const createFAQ = async (req, res) => {
  console.log('Received request to create FAQ:', req.body); 
  try {
    const { question, answer, image } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and Answer are required fields.' });
    }

    const faqs = new FAQ({
      question,
      answer,
      image,
    });

    await faqs.save();

    res.status(201).json({ message: 'FAQ created successfully', faq: faqs });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Failed to create FAQ', details: error.message });
  }
};

module.exports = { getFAQs, createFAQ };