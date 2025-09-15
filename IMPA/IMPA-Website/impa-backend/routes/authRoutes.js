const express = require('express');
const router = express.Router();
const { login, verifyToken, logout } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Verify token route
router.get('/verify', verifyToken);

// Logout route
router.post('/logout', logout);

module.exports = router; 