const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeerController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, employeeController.getAllEmployees);
router.post('/', authMiddleware, employeeController.addEmployee);
router.put('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;