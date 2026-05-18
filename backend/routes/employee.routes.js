const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/auth.middleware');

// Apply auth middleware to all employee routes
router.use(authMiddleware);

router.post('/', employeeController.addEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/search', employeeController.searchEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.put('/:id', employeeController.updateEmployee);

module.exports = router;
