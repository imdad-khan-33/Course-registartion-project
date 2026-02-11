const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { verifyToken, isAdmin } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Socket.io setup with CORS
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

// Make io accessible to controllers
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join admin room
    socket.on('join-admin', () => {
        socket.join('admin-room');
        console.log('Admin joined:', socket.id);
    });

    // Join user room
    socket.on('join-user', (userId) => {
        socket.join(`user-${userId}`);
        console.log('User joined:', userId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});


connectDB().then(() => {
   
    seedAdmin();
});

app.use(cors());
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({ extended: true }));

// Make io accessible to all routes via req.io
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userAuthRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);

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

// Use server.listen instead of app.listen for Socket.io
server.listen(port, () => {
    console.log(`Server with Socket.io is running on port ${port}`);
});


