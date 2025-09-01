const express = require('express');
const {
  getGuidelines,
  createGuideline,
  updateGuideline,
  deleteGuideline,
} = require('../controllers/userManualController');

const router = express.Router();

router.get('/', getGuidelines);
router.post('/', createGuideline);
router.put('/:id', updateGuideline);
router.delete('/:id', deleteGuideline);

module.exports = router;