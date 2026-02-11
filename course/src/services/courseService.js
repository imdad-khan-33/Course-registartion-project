import api from './api';

// Course Service (Public)
const courseService = {
  // Get all courses (Public)
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch courses' };
    }
  },

  // Get course by ID (Public)
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch course' };
    }
  },

  // Get courses by category (Public)
  getCoursesByCategory: async (category) => {
    try {
      const response = await api.get(`/courses/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch courses by category' };
    }
  },

  // Get image URL
  getImageUrl: (filename) => {
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/uploads/courses/${filename}`;
  },
};

export default courseService;
