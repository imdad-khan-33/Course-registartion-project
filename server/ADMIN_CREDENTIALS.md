# 🔐 Admin Login Credentials

## Hardcoded Admin Details

The admin is automatically created in the database when the server starts for the first time.

### Admin Credentials:
```
Email: admin@courseportal.com
Password: Admin@123
```

## Important Notes:

⚠️ **Admin CANNOT signup** - Only login is allowed  
✅ Admin is **automatically created** when server starts  
✅ Use the above credentials to login as admin  
✅ These credentials are **hardcoded** in the database  

## How to Login as Admin in Postman:

**Endpoint:** `POST http://localhost:5000/api/admin/login`

**Request Body:**
```json
{
  "email": "admin@courseportal.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": "...",
      "name": "Super Admin",
      "email": "admin@courseportal.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## What Changed:

❌ **Removed:** Admin signup endpoint  
✅ **Added:** Auto-seed admin function  
✅ **Added:** Hardcoded admin credentials in database  
✅ **Kept:** Admin login endpoint  

## File Locations:

- Admin credentials seed: `server/config/seedAdmin.js`
- Admin login route: `server/routes/adminAuth.js`
- Environment variables: `server/.env`

---

**Note:** When you start the server, you'll see a message confirming admin creation:
```
✅ Admin created successfully
📧 Email: admin@courseportal.com
🔑 Password: Admin@123
```
