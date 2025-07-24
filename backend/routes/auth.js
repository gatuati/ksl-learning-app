const express = require('express');
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Accepts isAdmin too
router.post('/login', login);
router.get('/me', getMe); // Token required

module.exports = router;
