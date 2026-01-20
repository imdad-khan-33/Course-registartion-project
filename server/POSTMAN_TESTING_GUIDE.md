# API Testing Guide with Postman

## Setup Instructions

### 1. Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Start the Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

---

## API Endpoints Testing

### Base URL
```
http://localhost:5000
```

---

## 1. GET API Information
**Endpoint:** `GET /`

**Headers:** None required

**Response:**
```json
{
  "success": true,
  "message": "Course Registration API",
  "version": "1.0.0",
  "endpoints": {
    "user": {
      "signup": "POST /api/user/signup",
      "login": "POST /api/user/login"
    },
    "admin": {
      "login": "POST /api/admin/login (Use hardcoded credentials)"
    }
  }
}
```

---

## 2. User Signup
**Endpoint:** `POST /api/user/signup`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

## 3. User Login
**Endpoint:** `POST /api/user/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 4. Admin Login (Hardcoded Credentials)

**⚠️ Important:** Admin cannot signup. Use the pre-configured credentials below:

**Hardcoded Admin Credentials:**
- **Email:** `admin@courseportal.com`
- **Password:** `Admin@123`

---

**Endpoint:** `POST /api/admin/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "admin@courseportal.com",
  "password": "Admin@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Super Admin",
      "email": "admin@courseportal.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 5. Get User Profile (Protected Route)
**Endpoint:** `GET /api/profile`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile accessed successfully",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

---

## 6. Admin Dashboard (Admin Only Protected Route)
**Endpoint:** `GET /api/admin/dashboard`

**Headers:**
```
Authorization: Bearer <admin_token_here>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin dashboard accessed successfully",
  "data": {
    "admin": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "email": "admin@courseportal.com",
      "role": "admin"
    }
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

---

## Postman Collection Setup

### Step-by-Step Guide:

1. **Open Postman**

2. **Create a New Collection**
   - Click "New" → "Collection"
   - Name it "Course Registration API"

3. **Add Environment Variables**
   - Click "Environments" → "Create Environment"
   - Add variables:
     - `base_url`: `http://localhost:5000`
     - `user_token`: (leave empty, will be set after login)
     - `admin_token`: (leave empty, will be set after login)

4. **Create Requests**
   - Add each endpoint as a new request
   - Use `{{base_url}}` in the URL field
   - For protected routes, use `{{user_token}}` or `{{admin_token}}` in Authorization header

5. **Save Tokens Automatically**
   - In the "Tests" tab of login requests, add:
   ```javascript
   if (pm.response.code === 200 || pm.response.code === 201) {
       var jsonData = pm.response.json();
       pm.environment.set("user_token", jsonData.data.token);
       // or for admin: pm.environment.set("admin_token", jsonData.data.token);
   }
   ```

---

## Testing Workflow

### Test User Flow:
1. ✅ User Signup → Save the token
2. ✅ User Login → Verify token is returned
3. ✅ Get Profile → Use the token from login

### Test Admin Flow:
1. ✅ Admin Login (Use hardcoded credentials) → Verify token is returned
2. ✅ Access Admin Dashboard → Use admin token
3. ❌ Try accessing Admin Dashboard with user token → Should fail with 403

### Test Error Cases:
1. ❌ Signup with existing email → Should return 400
2. ❌ Login with wrong password → Should return 401
3. ❌ Access protected route without token → Should return 401
4. ❌ Password mismatch in signup → Should return 400
5. ❌ Invalid email format → Should return 400

---

## Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution:** Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Issue: Port already in use
**Solution:** Change port in .env file or kill the process using port 5000
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Issue: JWT token expired
**Solution:** Login again to get a new token (tokens expire after 7 days)

---

## Security Notes

⚠️ **Important for Production:**
1. Change `JWT_SECRET` in .env to a strong random string
2. Use HTTPS instead of HTTP
3. Set appropriate CORS origins instead of allowing all
4. Add rate limiting to prevent brute force attacks
5. Add email verification for user registration
6. Implement password reset functionality
7. Use environment-specific MongoDB URIs

---

## MongoDB Connection Options

### Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/course-registration
```

### MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-registration?retryWrites=true&w=majority
```

---

Happy Testing! 🚀
