const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
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

// Protected Routes (Example)


// Admin Only Route (Example)
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


