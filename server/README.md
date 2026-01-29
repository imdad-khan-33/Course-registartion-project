# Course Registration API

A complete Express.js REST API with MongoDB for course registration system with user and admin authentication.

## Features

✅ User Registration & Login  
✅ Admin Login (Pre-configured hardcoded credentials)  
✅ JWT Authentication  
✅ Password Hashing with bcrypt  
✅ Input Validation  
✅ Role-based Access Control  
✅ Protected Routes  
✅ MongoDB Integration  
✅ Auto-seed admin on server start  

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express Validator
- **Security:** Bcrypt for password hashing

## Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js               # Authentication middleware
├── models/
│   ├── User.js               # User schema
│   └── Admin.js              # Admin schema
├── routes/
│   ├── userAuth.js           # User authentication routes
│   └── adminAuth.js          # Admin authentication routes
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── index.js                 # Main server file
├── package.json             # Dependencies
├── POSTMAN_TESTING_GUIDE.md # API testing guide
└── README.md                # This file
```

## Installation

1. **Clone the repository**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Edit the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-registration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2026
NODE_ENV=development
```

4. **Install and start MongoDB**
- Download MongoDB from https://www.mongodb.com/try/download/community
- Install and start the MongoDB service

5. **Start the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`
**Default Admin Credentials (Auto-created):**
- Email: `admin@courseportal.com`
- Password: `Admin@123`


## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/api/user/signup` | User registration |
| POST | `/api/user/login` | User login |
| POST | `/api/admin/login` | Admin login (hardcoded credentials) |

### Protected Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/profile` | Get user profile | User/Admin |
| GET | `/api/admin/dashboard` | Admin dashboard | Admin only |

## Testing with Postman

Detailed testing guide available in [POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)

### Quick Test

1. **User Signup**
```
POST http://localhost:5000/api/user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

2. **User Login**
```
POST http://localhost:5000/api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

3. **Access Protected Route**
```
GET http://localhost:5000/api/profile
Authorization: Bearer <your_token_from_login>
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/course-registration |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| NODE_ENV | Environment mode | development/production |

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Token expiration (7 days)
- ✅ Input validation
- ✅ Role-based access control
- ✅ Secure password comparison
- ✅ Email validation

## Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, default: 'user')
- createdAt (Date)

### Admin Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, default: 'admin')
- createdAt (Date)

## Scripts

```bash
# Start server in production
npm start

# Start server in development with nodemon
npm run dev
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Server Error

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Refresh token mechanism
- [ ] Rate limiting
- [ ] Course management endpoints
- [ ] Enrollment system
- [ ] User profile management
- [ ] File upload for profile pictures

## License

ISC

## Author

Your Name

---

**Note:** Remember to change the `JWT_SECRET` in production to a strong, random string!
