const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, NotificationController.getNotification);
router.post('/', authMiddleware, NotificationController.markNotification);
module.exports = router;