const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Get dashboard stats (Admin)
const getDashboardStats = async (req, res) => {
    try {
        // Get counts
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({ isActive: true });
        const totalStudents = await User.countDocuments({ role: 'user' });
        const totalEnrollments = await Enrollment.countDocuments();
        const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });

        // Get recent enrollments (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentEnrollments = await Enrollment.countDocuments({
            enrolledAt: { $gte: thirtyDaysAgo }
        });

        // Get monthly enrollment data for chart (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const monthlyEnrollments = await Enrollment.aggregate([
            {
                $match: {
                    enrolledAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$enrolledAt' },
                        month: { $month: '$enrolledAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        // Get top courses by enrollment
        const topCourses = await Enrollment.aggregate([
            {
                $group: {
                    _id: '$course',
                    enrollmentCount: { $sum: 1 }
                }
            },
            {
                $sort: { enrollmentCount: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'courseDetails'
                }
            },
            {
                $unwind: '$courseDetails'
            },
            {
                $project: {
                    title: '$courseDetails.title',
                    category: '$courseDetails.category',
                    enrollmentCount: 1
                }
            }
        ]);

        // Get recent activity
        const recentActivity = await Enrollment.find()
            .populate('user', 'name')
            .populate('course', 'title')
            .sort({ enrolledAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            message: 'Dashboard stats fetched successfully',
            data: {
                stats: {
                    totalCourses,
                    activeCourses,
                    totalStudents,
                    totalEnrollments,
                    activeEnrollments,
                    recentEnrollments
                },
                monthlyEnrollments,
                topCourses,
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching dashboard stats'
        });
    }
};

// Get all users (Admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('-password')
            .sort({ createdAt: -1 });

        // Get enrollment count for each user
        const usersWithEnrollments = await Promise.all(
            users.map(async (user) => {
                const enrollmentCount = await Enrollment.countDocuments({ user: user._id });
                const enrollments = await Enrollment.find({ user: user._id })
                    .populate('course', 'title')
                    .sort({ enrolledAt: -1 })
                    .limit(1);
                
                return {
                    ...user.toObject(),
                    enrollmentCount,
                    lastEnrolledCourse: enrollments[0]?.course?.title || 'No enrollments'
                };
            })
        );

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: {
                count: users.length,
                users: usersWithEnrollments
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
};

// Get single user details (Admin)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get user's enrollments
        const enrollments = await Enrollment.find({ user: id })
            .populate('course', 'title category price')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: {
                user,
                enrollments
            }
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user'
        });
    }
};

// Delete user (Admin)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot delete admin user'
            });
        }

        // Delete user's enrollments
        await Enrollment.deleteMany({ user: id });
        
        // Delete user
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'User and associated enrollments deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting user'
        });
    }
};

// Search users (Admin)
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const users = await User.find({
            role: 'user',
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password');

        res.status(200).json({
            success: true,
            message: 'Search results fetched successfully',
            data: {
                count: users.length,
                users
            }
        });
    } catch (error) {
        console.error('Search users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching users'
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getUserById,
    deleteUser,
    searchUsers
};
