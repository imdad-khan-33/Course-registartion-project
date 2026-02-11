import api from './api';

// Course Management Service (Admin)
const courseService = {
  // Get all courses (Admin view)
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses/admin/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch courses' };
    }
  },

  // Get course by ID (Admin view)
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/admin/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch course' };
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses/admin/create', courseData);
      return response.data;
    } catch (error) {
      // Handle validation errors from express-validator
      const errorData = error.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map(e => e.msg).join(', ');
        throw { message: errorMessages };
      }
      throw errorData || { message: 'Failed to create course' };
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/courses/admin/update/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      // Handle validation errors from express-validator
      const errorData = error.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map(e => e.msg).join(', ');
        throw { message: errorMessages };
      }
      throw errorData || { message: 'Failed to update course' };
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/courses/admin/delete/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete course' };
    }
  },

  // Get courses by category
  getCoursesByCategory: async (category) => {
    try {
      const response = await api.get(`/courses/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch courses by category' };
    }
  },
};

export default courseService;
