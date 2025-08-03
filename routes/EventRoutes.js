const express = require('express');
const router = express.Router();
const EventFormController = require('../controllers/EventFormController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, EventFormController.getEventForm);
router.post('/', authMiddleware, EventFormController.addEventForm);
router.put('/:id/status', authMiddleware, EventFormController.updateEventForm);
router.delete('/:id', authMiddleware, EventFormController.deleteEventForm);

module.exports = router;