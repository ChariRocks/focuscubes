
const express = require('express');
const router = express.Router();
const { MoodEntry } = require('../../models');
const auth = require('../../middleware/auth');

// Get all mood entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const moodEntries = await MoodEntry.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.json(moodEntries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Add a new mood entry
router.post('/', auth, async (req, res) => {
  try {
    const { mode, previousMood, currentMood, reflection } = req.body;
    
    const newMoodEntry = new MoodEntry({
      user: req.user.id,
      mode,
      previousMood,
      currentMood,
      reflection
    });
    
    const moodEntry = await newMoodEntry.save();
    res.json(moodEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
