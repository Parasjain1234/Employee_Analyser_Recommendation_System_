const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/recommend', authMiddleware, aiController.recommend);

module.exports = router;
