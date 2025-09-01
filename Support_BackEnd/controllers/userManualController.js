const UserManual = require('../models/userManualModel');

// Get all guidelines based on language and category
exports.getGuidelines = async (req, res) => {
  const { language, category } = req.query;
  try {
    const guidelines = await UserManual.find({ language, category });
    res.json(guidelines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new guideline
exports.createGuideline = async (req, res) => {
  const { category, language, question, answer, image, video } = req.body;
  try {
    const newGuideline = new UserManual({ category, language, question, answer, image, video });
    await newGuideline.save();
    res.status(201).json(newGuideline);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a guideline
exports.updateGuideline = async (req, res) => {
  const { id } = req.params;
  const { category, language, question, answer, image, video } = req.body;
  try {
    const updatedGuideline = await UserManual.findByIdAndUpdate(id, { category, language, question, answer, image, video }, { new: true });
    if (!updatedGuideline) {
      return res.status(404).json({ message: 'Guideline not found' });
    }
    res.json(updatedGuideline);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a guideline
exports.deleteGuideline = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGuideline = await UserManual.findByIdAndDelete(id);
    if (!deletedGuideline) {
      return res.status(404).json({ message: 'Guideline not found' });
    }
    res.json({ message: 'Guideline deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
