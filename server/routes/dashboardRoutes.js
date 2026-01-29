const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    getDashboardStats,
    getAllUsers,
    getUserById,
    deleteUser,
    searchUsers
} = require('../controllers/dashboardController');

const router = express.Router();

// All routes are admin protected

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', verifyToken, isAdmin, getDashboardStats);

// GET /api/dashboard/users - Get all users
router.get('/users', verifyToken, isAdmin, getAllUsers);

// GET /api/dashboard/users/search - Search users
router.get('/users/search', verifyToken, isAdmin, searchUsers);

// GET /api/dashboard/users/:id - Get single user
router.get('/users/:id', verifyToken, isAdmin, getUserById);

// DELETE /api/dashboard/users/:id - Delete user
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
