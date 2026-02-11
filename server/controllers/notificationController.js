const Notification = require('../models/Notification');

// Get all notifications (Admin)
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ forAdmin: true })
            .sort({ createdAt: -1 })
            .limit(50);

        const unreadCount = await Notification.countDocuments({ forAdmin: true, isRead: false });

        res.status(200).json({
            success: true,
            message: 'Notifications fetched successfully',
            data: {
                notifications,
                unreadCount
            }
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching notifications'
        });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification marked as read',
            data: { notification }
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating notification'
        });
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { forAdmin: true, isRead: false },
            { isRead: true }
        );

        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        console.error('Mark all as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating notifications'
        });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting notification'
        });
    }
};

// Clear all notifications
const clearAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ forAdmin: true });

        res.status(200).json({
            success: true,
            message: 'All notifications cleared'
        });
    } catch (error) {
        console.error('Clear notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while clearing notifications'
        });
    }
};

// Helper function to create notification (used by other controllers)
const createNotification = async (type, title, message, data = {}, forAdmin = true, forUser = null) => {
    try {
        const notification = new Notification({
            type,
            title,
            message,
            data,
            forAdmin,
            forUser
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Create notification error:', error);
        return null;
    }
};

// Create user notification (broadcast to all users)
const createUserNotification = async (type, title, message, data = {}) => {
    try {
        const notification = new Notification({
            type,
            title,
            message,
            data,
            forAdmin: false,
            forUser: null // null means for all users
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Create user notification error:', error);
        return null;
    }
};

// Get user notifications
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get notifications for all users (forUser: null) or specific user
        const notifications = await Notification.find({
            forAdmin: false,
            $or: [
                { forUser: null },
                { forUser: userId }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(50);

        // Get unread count for this user
        const unreadCount = await Notification.countDocuments({
            forAdmin: false,
            isRead: false,
            $or: [
                { forUser: null },
                { forUser: userId }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Notifications fetched successfully',
            data: {
                notifications,
                unreadCount
            }
        });
    } catch (error) {
        console.error('Get user notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching notifications'
        });
    }
};

// Mark user notification as read
const markUserNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification marked as read',
            data: { notification }
        });
    } catch (error) {
        console.error('Mark user notification as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating notification'
        });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    createNotification,
    createUserNotification,
    getUserNotifications,
    markUserNotificationAsRead
};
