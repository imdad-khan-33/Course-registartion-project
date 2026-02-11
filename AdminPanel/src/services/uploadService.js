import api from './api';

// Upload Service
const uploadService = {
  // Upload course image
  uploadCourseImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload/course-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload image' };
    }
  },

  // Delete course image
  deleteCourseImage: async (filename) => {
    try {
      const response = await api.delete(`/upload/course-image/${filename}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete image' };
    }
  },

  // Get image URL
  getImageUrl: (filename) => {
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/uploads/courses/${filename}`;
  },
};

export default uploadService;
