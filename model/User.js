const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  entries: {
    type: Array,
  },
});

module.exports = mongoose.model('User', userSchema);
