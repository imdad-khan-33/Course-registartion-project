const { validationResult } = require('express-validator');
const Course = require('../models/Course');

// ==================== ADMIN CONTROLLERS ====================

// Create a new course (Admin only)
const createCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { title, description, category, image, duration, price, instructor } = req.body;

        const course = new Course({
            title,
            description,
            category,
            image,
            duration,
            price,
            instructor,
            createdBy: req.user.id
        });

        await course.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: { course }
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while creating course' 
        });
    }
};

// Update a course (Admin only)
const updateCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { id } = req.params;
        const { title, description, category, image, duration, price, instructor, isActive } = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        // Update fields if provided
        if (title) course.title = title;
        if (description) course.description = description;
        if (category) course.category = category;
        if (image !== undefined) course.image = image;
        if (duration !== undefined) course.duration = duration;
        if (price !== undefined) course.price = price;
        if (instructor !== undefined) course.instructor = instructor;
        if (isActive !== undefined) course.isActive = isActive;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: { course }
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while updating course' 
        });
    }
};

// Delete a course (Admin only)
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while deleting course' 
        });
    }
};

// Get all courses for admin (including inactive)
const getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: { 
                count: courses.length,
                courses 
            }
        });
    } catch (error) {
        console.error('Get all courses admin error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching courses' 
        });
    }
};

// Get single course by ID for admin
const getCourseByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id)
            .populate('createdBy', 'name email');

        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            data: { course }
        });
    } catch (error) {
        console.error('Get course by ID admin error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching course' 
        });
    }
};

// ==================== USER/PUBLIC CONTROLLERS ====================

// Get all active courses (Public - for users)
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true })
            .select('-createdBy')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: { 
                count: courses.length,
                courses 
            }
        });
    } catch (error) {
        console.error('Get all courses error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching courses' 
        });
    }
};

// Get single active course by ID (Public - for users)
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findOne({ _id: id, isActive: true })
            .select('-createdBy');

        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            data: { course }
        });
    } catch (error) {
        console.error('Get course by ID error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching course' 
        });
    }
};

// Get courses by category (Public - for users)
const getCoursesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const courses = await Course.find({ category, isActive: true })
            .select('-createdBy')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Courses fetched successfully',
            data: { 
                count: courses.length,
                courses 
            }
        });
    } catch (error) {
        console.error('Get courses by category error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while fetching courses' 
        });
    }
};

module.exports = {
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
};
