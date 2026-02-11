const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['new_user', 'new_enrollment', 'course_created', 'course_updated', 'enrollment_cancelled', 'new_course', 'course_update', 'announcement'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isRead: {
        type: Boolean,
        default: false
    },
    forAdmin: {
        type: Boolean,
        default: true
    },
    forUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null // null means for all users
    }
}, {
    timestamps: true
});

// Auto-delete notifications older than 30 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Notification', notificationSchema);
