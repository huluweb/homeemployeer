const Upcoming = require('../models/EventFormModel');
const Notifications = require('../models/notificationModel');
// Get all upcoming
exports.getEventForm = async (req, res) => {
  try {
    const upcomings = await Upcoming.find();
     const notification = await Notifications({
              title: 'Upcoming Events',
              time: new Date().toLocaleTimeString(),
              discription: 'Upcoming Events has been Seen .',
              mark: false,  
              today: new Date().toLocaleDateString(),
              type:"Document"
            })
            await notification.save();
    res.status(200).json(upcomings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcomings', error: error.message });
  }
};

// Add new upcoming
exports.addEventForm = async (req, res) => {
  console.log('Adding new upcoming:', req.body);
  try {
    const {   title, date, time } = req.body;
    const upcomings = new Upcoming({
      title,
      date,
      time
    });
    await upcomings.save();
    const notification = await Notifications({
              title: 'Upcoming Events has been Added',
              time: new Date().toLocaleTimeString(),
              discription: 'Upcoming Events has been Added .',
              mark: false,  
              today: new Date().toLocaleDateString(),
              type:"Document"
            })
            await notification.save();
    res.status(201).json(upcomings);
  } catch (error) {
    console.error('Error adding upcoming:', error);
    res.status(400).json({ message: 'Error adding upcomings', error: error.message });
  }
};

// Update upcoming status
exports.updateEventForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const upcoming = await Upcoming.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!upcoming) {
      return res.status(404).json({ message: 'upcoming not found' });
    }
    const notification = await Notifications({
              title: 'Upcoming Events',
              time: new Date().toLocaleTimeString(),
              discription: 'Upcoming Events has been Updated .',
              mark: false,  
              today: new Date().toLocaleDateString(),
              type:"Document"
            })
            await notification.save();
    res.status(200).json(upcoming);
  } catch (error) {
    res.status(400).json({ message: 'Error updating upcoming status', error: error.message });
  }
};

// Delete upcoming
exports.deleteEventForm = async (req, res) => {
  try {
    const { id } = req.params;
    const upcoming = await Upcoming.findByIdAndDelete(id);
    if (!upcoming) {
      return res.status(404).json({ message: 'upcoming not found' });
    }
    const notification = await Notifications({
              title: 'Upcoming Events',
              time: new Date().toLocaleTimeString(),
              discription: 'Upcoming Events has been Deleted .',
              mark: false,  
              today: new Date().toLocaleDateString(),
              type:"Document"
            })
            await notification.save();
    res.status(200).json({ message: 'upcoming deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting upcoming', error: error.message });
  }
};

