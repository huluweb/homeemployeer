const mongoose = require('mongoose');
const Notifications = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  discription: {
    type: String,
    required: true,
    trim: true
  },
  mark:{
    type: Boolean,
    required: true,
    trim: true
  },
  today:{
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Notifications',Notifications );