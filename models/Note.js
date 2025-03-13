
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'general'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
