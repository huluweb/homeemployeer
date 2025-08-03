const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, applicantController.getAllApplicants);
router.post('/', authMiddleware, applicantController.addApplicant);
router.put('/:id/status', authMiddleware, applicantController.updateApplicantStatus);
router.put('/:id', authMiddleware, applicantController.editApplicant);

module.exports = router;