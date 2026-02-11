const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUserNotifications,
    markUserNotificationAsRead
} = require('../controllers/notificationController');

const router = express.Router();

// ===== USER ROUTES =====
// GET /api/notifications/user - Get user notifications
router.get('/user', verifyToken, getUserNotifications);

// PUT /api/notifications/user/:id/read - Mark user notification as read
router.put('/user/:id/read', verifyToken, markUserNotificationAsRead);

// ===== ADMIN ROUTES =====

// GET /api/notifications - Get all notifications
router.get('/', verifyToken, isAdmin, getNotifications);

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', verifyToken, isAdmin, markAsRead);

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', verifyToken, isAdmin, markAllAsRead);

// DELETE /api/notifications/:id - Delete a notification
router.delete('/:id', verifyToken, isAdmin, deleteNotification);

// DELETE /api/notifications - Clear all notifications
router.delete('/', verifyToken, isAdmin, clearAllNotifications);

module.exports = router;
