const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
const courseRoutes = require('./routes/courseRoutes');
const { verifyToken, isAdmin } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;


connectDB().then(() => {
    // Create default admin if doesn't exist
    seedAdmin();
});

app.use(cors());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userAuthRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/courses', courseRoutes);

// Protected Routes
app.get('/api/profile', verifyToken, async (req, res) => {
    res.json({
        success: true,
        message: 'Profile accessed successfully',
        data: {
            user: req.user
        }
    });
});

// Admin Only Route
app.get('/api/admin/dashboard', verifyToken, isAdmin, async (req, res) => {
    res.json({
        success: true,
        message: 'Admin dashboard accessed successfully',
        data: {
            admin: req.user
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


