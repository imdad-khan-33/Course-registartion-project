import api from './api';

// User Authentication Service
const authService = {
  // User Signup
  signup: async (name, email, password, confirmPassword) => {
    try {
      const response = await api.post('/user/signup', { 
        name, 
        email, 
        password, 
        confirmPassword 
      });
      // Handle nested data structure: response.data.data.token
      const data = response.data.data || response.data;
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return { user: data.user, token: data.token };
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  // User Login
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      // Handle nested data structure: response.data.data.token
      const data = response.data.data || response.data;
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return { user: data.user, token: data.token };
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('userToken');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },
};

export default authService;
