const Admin = require('../models/Admin');

// Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
    name: 'imdad-Admin',
    email: 'admin@courseportal.com',
    password: 'Admin@123',
    role: 'admin'
};

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: ADMIN_CREDENTIALS.email });
        
        if (existingAdmin) {
            console.log(' Admin already exists in database');
            return;
        }

        // Create new admin
        const admin = new Admin(ADMIN_CREDENTIALS);
        await admin.save();
        
        console.log(' Admin created successfully');
        console.log(' Email:', ADMIN_CREDENTIALS.email);
        console.log(' Password:', ADMIN_CREDENTIALS.password);
    } catch (error) {
        console.error(' Error creating admin:', error.message);
    }
};

module.exports = seedAdmin;
