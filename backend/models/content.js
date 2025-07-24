const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title:      String,
  type:       { type: String, enum: ['alphabet','number','word','phrase','quiz'] },
  unit:       String, // e.g., "unit1"
  videoUrl:   String,
  options:    [String],
  correctAnswer: String,
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
