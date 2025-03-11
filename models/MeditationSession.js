
const mongoose = require('mongoose');

const meditationSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meditationType: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  },
  feedback: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MeditationSession = mongoose.model('MeditationSession', meditationSessionSchema);
module.exports = MeditationSession;
