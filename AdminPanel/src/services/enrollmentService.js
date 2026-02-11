import api from './api';

// Enrollment Service (Admin)
const enrollmentService = {
  // Get all enrollments for a course
  getCourseEnrollments: async (courseId) => {
    try {
      const response = await api.get(`/enrollments/admin/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch enrollments' };
    }
  },

  // Update enrollment status
  updateEnrollmentStatus: async (enrollmentId, status) => {
    try {
      const response = await api.put(`/enrollments/admin/status/${enrollmentId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update enrollment status' };
    }
  },
};

export default enrollmentService;
