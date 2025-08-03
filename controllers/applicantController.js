const Applicant = require('../models/applicantModel');
const Notifications = require('../models/notificationModel');

// Get all applicants
exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    const notification = await Notifications({
      title: 'Seeing Applicants',
      time: new Date().toLocaleTimeString(),
      discription: 'User are Seeing Applicants Data.',
      mark: false,
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new applicant
exports.addApplicant = async (req, res) => {
  try {
    const { name, position, status, jobType, location, experience, gender, phone } = req.body;

    // Validate required fields
    if (!name || !position || !jobType || !location || !experience || !phone || !gender) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate gender
    const validGenders = ['M', 'F'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender value. Must be "M" or "F"' });
    }

    // Validate status
    const validStatuses = ['Review', 'Interview', 'NO', 'YES'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const applicant = new Applicant({
      name,
      position,
      status,
      jobType,
      location,
      experience,
      gender,
      phone,
    });

    const notification = await Notifications({
      title: 'New Applicant',
      time: new Date().toLocaleTimeString(),
      discription: 'A new applicant has been added.',
      mark: false,
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    await applicant.save();
    res.status(201).json({ message: 'Applicant added successfully', applicant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update applicant status
exports.updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Review', 'Interview', 'NO', 'YES'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const applicant = await Applicant.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    const notification = await Notifications({
      title: 'Applicant Data Updated',
      time: new Date().toLocaleTimeString(),
      discription: 'Applicants Data has been updated.',
      mark: false,
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(200).json({ message: 'Status updated successfully', applicant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Edit applicant
exports.editApplicant = async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.params;
    const { name, position, status, jobType, location, experience, gender, phone } = req.body;

    // Validate required fields
    if (!name || !position || !jobType || !location || !experience || !phone || !gender) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate status
    const validStatuses = ['Review', 'Interview', 'NO', 'YES'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Validate gender
    const validGenders = ['M', 'F'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender value. Must be "M" or "F"' });
    }

    const applicant = await Applicant.findByIdAndUpdate(
      id,
      { name, position, status, jobType, location, experience, gender, phone },
      { new: true, runValidators: true }
    );

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    const notification = await Notifications({
      title: 'Applicant Edited',
      time: new Date().toLocaleTimeString(),
      discription: `Applicant ${name} has been edited.`,
      mark: false,
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();

    res.status(200).json({ message: 'Applicant updated successfully', applicant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};