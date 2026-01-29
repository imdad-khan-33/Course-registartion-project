const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { adminLogin } = require('../controllers/adminController');

// Admin Login (No Signup - Admin is pre-configured)
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], adminLogin);

module.exports = router;
