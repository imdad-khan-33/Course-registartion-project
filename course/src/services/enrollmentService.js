import api from './api';

// Enrollment Service (User)
const enrollmentService = {
  // Enroll in a course
  enrollInCourse: async (courseId) => {
    try {
      const response = await api.post('/enrollments/enroll', { courseId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to enroll in course' };
    }
  },

  // Get my enrollments
  getMyEnrollments: async () => {
    try {
      const response = await api.get('/enrollments/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch enrollments' };
    }
  },

  // Cancel enrollment
  cancelEnrollment: async (enrollmentId) => {
    try {
      const response = await api.put(`/enrollments/cancel/${enrollmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel enrollment' };
    }
  },
};

export default enrollmentService;
