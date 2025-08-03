const Employee = require('../models/employeer');
const Notifications = require('../models/notificationModel');
// Get all employees
exports.getNotification = async (req, res) => {
  try {
    const notifications = await Notifications.find();
  
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};
exports.markNotification = async (req, res) => {
  try {
    const notifications = await Notifications.find();
  
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};
