const User = require('../models/User');

// Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
    name: 'imdad-Admin',
    email: 'admin123@gmail.com',
    password: 'Admin@1234',
    role: 'admin'
};

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_CREDENTIALS.email, role: 'admin' });
        
        if (existingAdmin) {
            console.log(' Admin already exists.');
            return;
        }

        // Create new admin
        const admin = new User(ADMIN_CREDENTIALS);
        await admin.save();
        
        console.log(' Admin created successfully');
        console.log(' Email:', ADMIN_CREDENTIALS.email);
        console.log(' Password:', ADMIN_CREDENTIALS.password);
    } catch (error) {
        console.error(' Error creating admin:', error.message);
    }
};

module.exports = seedAdmin;
