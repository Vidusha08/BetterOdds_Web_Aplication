const express = require('express');
const { getFAQs, createFAQ } = require('../controllers/faqController');
const router = express.Router();

// Get all FAQs
router.get('/', getFAQs);

// Create a new FAQ
router.post('/', createFAQ);

module.exports = router;