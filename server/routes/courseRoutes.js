const express = require('express');
const { body } = require('express-validator');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    // Admin controllers
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCoursesAdmin,
    getCourseByIdAdmin,
    // User/Public controllers
    getAllCourses,
    getCourseById,
    getCoursesByCategory
} = require('../controllers/courseController');

const router = express.Router();

// Validation rules
const courseValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['Web Development', 'Graphic Design', 'Business Strategy', 'Data Science', 'Mobile Development', 'Other'])
        .withMessage('Invalid category'),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number')
];

const updateCourseValidation = [
    body('title')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),
    body('category')
        .optional()
        .isIn(['Web Development', 'Graphic Design', 'Business Strategy', 'Data Science', 'Mobile Development', 'Other'])
        .withMessage('Invalid category'),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number')
];

// ==================== PUBLIC ROUTES (For Users - View Only) ====================
// GET /api/courses - Get all active courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get single course by ID
router.get('/:id', getCourseById);

// GET /api/courses/category/:category - Get courses by category
router.get('/category/:category', getCoursesByCategory);

// ==================== ADMIN ROUTES (Protected - Admin Only) ====================
// POST /api/courses/admin/create - Create a new course
router.post('/admin/create', verifyToken, isAdmin, courseValidation, createCourse);

// GET /api/courses/admin/all - Get all courses (including inactive)
router.get('/admin/all', verifyToken, isAdmin, getAllCoursesAdmin);

// GET /api/courses/admin/:id - Get single course by ID (admin view)
router.get('/admin/:id', verifyToken, isAdmin, getCourseByIdAdmin);

// PUT /api/courses/admin/update/:id - Update a course
router.put('/admin/update/:id', verifyToken, isAdmin, updateCourseValidation, updateCourse);

// DELETE /api/courses/admin/delete/:id - Delete a course
router.delete('/admin/delete/:id', verifyToken, isAdmin, deleteCourse);

module.exports = router;
