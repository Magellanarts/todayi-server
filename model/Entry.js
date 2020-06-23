const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  user: {
    type: String,
    required: true,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Entry', entrySchema);
