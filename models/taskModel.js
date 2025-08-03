const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
  },
  assignedTo: {
    type: String,
    required: [true, 'Assignee is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedBy: {
    type: String,
    required: [true, 'Assigner is required'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);