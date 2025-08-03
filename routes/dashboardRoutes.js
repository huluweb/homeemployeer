const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicantModel');
const Employee = require('../models/employeer');
const EventForm = require('../models/EventFormModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/auth');

// Single route to get all counts
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch all counts concurrently using Promise.all
    const [applicants, employees, events, users, tasks] = await Promise.all([
      Applicant.find(),
      Employee.find(),
      EventForm.find(),
      User.find(),
      Task.find()
    ]);

    // Calculate counts
    const applicantsCount = applicants.length;
    const reviewApplicants = applicants.filter(applicant => applicant.status === 'Review').length;
    const interviewApplicants = applicants.filter(applicant => applicant.status === 'Interview').length;
    const rejectedApplicants = applicants.filter(applicant => applicant.status === 'Rejected').length;
    const offeredApplicants = applicants.filter(applicant => applicant.status === 'Offer').length;
    const employeeCount = employees.length;
    const employeeQuantitySum = employees.reduce((sum, employee) => sum + (parseInt(employee.quantity, 10) || 0), 0);
    const eventsCount = events.length;
    const userCount = users.length;
    const completedTaskCount = tasks.filter(task => task.completed).length;
    const notCompletedTaskCount = tasks.filter(task => !task.completed).length;

    // Send aggregated response
    res.status(200).json({
      applicants: applicantsCount,
      reviewApplicants: reviewApplicants,
      interviewApplicants: interviewApplicants,
      rejectedApplicants: rejectedApplicants,
      offeredApplicants: offeredApplicants,
      employees: employeeCount,
      employeeQuantitySum: employeeQuantitySum,
      events: eventsCount,
      users: userCount,
      eventsData: events,
      tasks: {
        completed: completedTaskCount,
        notCompleted: notCompletedTaskCount
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;