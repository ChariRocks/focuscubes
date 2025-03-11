
const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mode: {
    type: String,
    enum: ['simple', 'detailed'],
    required: true
  },
  previousMood: {
    name: String,
    level: Number,
    color: String
  },
  currentMood: {
    name: String,
    level: Number,
    color: String,
    required: true
  },
  reflection: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);
module.exports = MoodEntry;
