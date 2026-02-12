import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import { notificationService } from './services';
import { io } from 'socket.io-client';

const Navbar = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const notifRef = useRef(null);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
    setupSocket();

    // Click outside to close
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupSocket = () => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.on('connect', () => {
      // // console.log('Socket connected');
      socket.emit('join-admin');
    });

    socket.on('new-notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      // Show toast for new notification
      toast.info(notification.title + ': ' + notification.message);
    });

    socket.on('new-enrollment', (data) => {
      // // console.log('New enrollment:', data);
    });

    socket.on('new-user', (data) => {
      // // console.log('New user:', data);
    });
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications();
      if (response.success && response.data) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n._id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const handleClearAll = async () => {
    try {
      await notificationService.clearAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
      toast.success('All notifications cleared');
    } catch {
      toast.error('Failed to clear notifications');
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return 'Just now';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return past.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_user': return 'fa-user-plus';
      case 'new_enrollment': return 'fa-graduation-cap';
      case 'course_created': return 'fa-book';
      case 'course_updated': return 'fa-pen';
      default: return 'fa-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_user': return 'from-emerald-400 to-emerald-600';
      case 'new_enrollment': return 'from-blue-400 to-blue-600';
      case 'course_created': return 'from-purple-400 to-purple-600';
      case 'course_updated': return 'from-amber-400 to-amber-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className='fixed w-full py-4 z-50 px-6 md:px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm'>
      <div className='flex justify-between items-center max-w-[1800px] mx-auto'>
        {/* Logo */}
        <div className='flex gap-3 items-center'>
          <div className='w-10 h-10 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20'>
            <i className="fa-solid fa-graduation-cap text-white text-lg"></i>
          </div>
          <div>
            <h2 className='text-lg font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>CoursePortal</h2>
            <p className='text-[10px] text-gray-400 -mt-1'>Admin Dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex gap-4 items-center'>
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className='relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
            >
              <i className={`fa-regular fa-bell ${showNotifications ? 'text-indigo-600' : 'text-gray-600'}`}></i>
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse'>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {/* Header */}
                <div className="px-4 py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-bell"></i>
                    <span className="font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMarkAllAsRead(); }}
                        className="text-xs hover:bg-white/10 px-2 py-1 rounded transition-colors"
                        title="Mark all as read"
                      >
                        <i className="fa-solid fa-check-double"></i>
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleClearAll(); }}
                        className="text-xs hover:bg-white/10 px-2 py-1 rounded transition-colors"
                        title="Clear all"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {loading ? (
                    <div className="p-8 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                      <p className="text-gray-500 mt-2">Loading...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fa-regular fa-bell-slash text-2xl text-gray-400"></i>
                      </div>
                      <p className="text-gray-500 font-medium">No notifications yet</p>
                      <p className="text-gray-400 text-sm">You'll be notified when something happens</p>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.isRead ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-linear-to-r ${getNotificationColor(notification.type)} flex items-center justify-center shadow-md`}>
                            <i className={`fa-solid ${getNotificationIcon(notification.type)} text-white text-sm`}></i>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-semibold text-gray-900 truncate ${!notification.isRead ? 'text-indigo-900' : ''}`}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              <i className="fa-regular fa-clock mr-1"></i>
                              {formatTimeAgo(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 10 && (
                  <div className="px-4 py-2 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className='relative'>
            <div 
              className='flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-colors'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className='w-10 h-10 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20'>
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className='hidden sm:block'>
                <p className='text-sm font-semibold text-gray-800'>{user?.name || 'Admin'}</p>
              </div>
              <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}></i>
            </div>
            
            {showDropdown && (
              <div className='absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden'>
                {/* User Info */}
                <div className='px-4 py-3 bg-linear-to-r from-indigo-50 to-purple-50'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg'>
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>{user?.name || 'Admin'}</p>
                      <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className='py-2'>
                  <button className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors'>
                    <i className="fa-solid fa-user w-5 text-center text-indigo-500"></i>
                    My Profile
                  </button>
                  <button className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors'>
                    <i className="fa-solid fa-gear w-5 text-center text-gray-400"></i>
                    Settings
                  </button>
                  <button className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors'>
                    <i className="fa-solid fa-circle-question w-5 text-center text-gray-400"></i>
                    Help & Support
                  </button>
                </div>

                {/* Logout */}
                <div className='border-t border-gray-100 pt-2'>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors'
                  >
                    <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar











