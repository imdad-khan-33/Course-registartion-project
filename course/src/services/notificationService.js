import api from './api';

// Notification Service for Course App (User side)
const notificationService = {
  // Get user notifications
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch notifications' };
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/notifications/user/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark notification as read' };
    }
  }
};

export default notificationService;
