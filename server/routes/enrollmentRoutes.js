const express = require('express');
const { body } = require('express-validator');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
    getAllEnrollments,
    cancelEnrollment,
    updateEnrollmentStatus
} = require('../controllers/enrollmentController');

const router = express.Router();

// ==================== USER ROUTES ====================
// POST /api/enrollments/enroll - Enroll in a course
router.post('/enroll', verifyToken, [
    body('courseId').notEmpty().withMessage('Course ID is required')
], enrollInCourse);


router.get('/my', verifyToken, getMyEnrollments);


router.put('/cancel/:enrollmentId', verifyToken, cancelEnrollment);

// ==================== ADMIN ROUTES ====================

router.get('/admin/all', verifyToken, isAdmin, getAllEnrollments);


router.get('/admin/course/:courseId', verifyToken, isAdmin, getCourseEnrollments);

// PUT /api/enrollments/admin/status/:enrollmentId - Update enrollment status
router.put('/admin/status/:enrollmentId', verifyToken, isAdmin, [
    body('status').isIn(['active', 'completed', 'cancelled']).withMessage('Invalid status')
], updateEnrollmentStatus);

module.exports = router;
