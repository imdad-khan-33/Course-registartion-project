const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a course (User)
const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Check if course exists and is active
        const course = await Course.findOne({ _id: courseId, isActive: true });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found or not available'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course'
            });
        }

        // Create enrollment
        const enrollment = new Enrollment({
            user: userId,
            course: courseId
        });

        await enrollment.save();

        res.status(201).json({
            success: true,
            message: 'Enrolled in course successfully',
            data: { enrollment }
        });
    } catch (error) {
        console.error('Enroll in course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while enrolling in course'
        });
    }
};

// Get my enrollments (User)
const getMyEnrollments = async (req, res) => {
    try {
        const userId = req.user.id;

        const enrollments = await Enrollment.find({ user: userId })
            .populate('course', 'title description category level image duration price instructor')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Enrollments fetched successfully',
            data: {
                count: enrollments.length,
                enrollments
            }
        });
    } catch (error) {
        console.error('Get my enrollments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching enrollments'
        });
    }
};

// Get course enrollments (Admin) - Who enrolled in a specific course
const getCourseEnrollments = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const enrollments = await Enrollment.find({ course: courseId })
            .populate('user', 'name email createdAt')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Course enrollments fetched successfully',
            data: {
                course: course.title,
                totalEnrolled: enrollments.length,
                enrollments
            }
        });
    } catch (error) {
        console.error('Get course enrollments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching course enrollments'
        });
    }
};

// Get all enrollments (Admin)
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('user', 'name email')
            .populate('course', 'title category')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            message: 'All enrollments fetched successfully',
            data: {
                count: enrollments.length,
                enrollments
            }
        });
    } catch (error) {
        console.error('Get all enrollments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching enrollments'
        });
    }
};

// Cancel enrollment (User)
const cancelEnrollment = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId });
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        enrollment.status = 'cancelled';
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: 'Enrollment cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel enrollment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while cancelling enrollment'
        });
    }
};

// Update enrollment status (Admin)
const updateEnrollmentStatus = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { status } = req.body;

        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        enrollment.status = status;
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: 'Enrollment status updated successfully',
            data: { enrollment }
        });
    } catch (error) {
        console.error('Update enrollment status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating enrollment'
        });
    }
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
    getAllEnrollments,
    cancelEnrollment,
    updateEnrollmentStatus
};
