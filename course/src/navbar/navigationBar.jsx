import React, { useRef, useState, useEffect } from 'react'
import "./nav.css";
import { NavLink } from 'react-router-dom';
import { notificationService } from '../services';
import { io } from 'socket.io-client';

const NavigationBar = () => {

  const barRef = useRef();
  const timeRef = useRef();
  const listRef = useRef();
  const myRef = useRef();
  const notifRef = useRef();
  const socketRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    setupSocket();

    // Click outside to close notifications
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
  }, []);

  const setupSocket = () => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.on('connect', () => {
      // // console.log('Socket connected for notifications');
    });

    socket.on('user-notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
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

  const formatTimeAgo = (date) => {
    if (!date) return 'Just now';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return past.toLocaleDateString();
  };

  const showList = () => {
    listRef.current.style.display = "block";
    timeRef.current.style.display = "block";
    barRef.current.style.display = "none";
  }

  const hideList = () => {
    listRef.current.style.display = "none";
    timeRef.current.style.display = "none";
    barRef.current.style.display = "block";
  }



  return (
    <div className='fixed w-full z-50 py-3 sm:px-10 px-6 bg-[#e6f2ff]'>
      <div className='flex justify-between' ref={myRef}>
        <div className='flex gap-2 justify-center items-center'>
          <img src="/logo.png" className="w-4 h-4 sm:mt-2 mt-1" alt="" />
          <h2 className='text-lg font-bold font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-3'>
          <div className='sm:block hidden'>
            <div className='flex gap-4'>
              <ul className='flex gap-9 list-none justify-center items-center mt-1'>
                <NavLink to="/myCourse" end className={({ isActive }) => `text-sm font-medium pb-1 ${isActive ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-medium'>Home</li></NavLink>
                <NavLink to="/myCourse" className={() => `text-sm font-medium pb-1 ${window.location.pathname.includes('/myCourse/learn') ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-medium '>Courses</li></NavLink>
                <NavLink to="/myCourse/mylearn" end className={({ isActive }) => `text-sm font-medium pb-1 ${isActive ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-medium '>My Learning</li></NavLink>

              </ul>
            </div>

          </div>


        </div>
        <div className='flex gap-3'>
          <div className='mt-1.5'>
            <button className='sm:hidden block cursor-pointer' ref={barRef} onClick={showList}><i className="fa-solid fa-bars text-2xl"></i></button>
            <button className='hidden cursor-pointer' ref={timeRef} onClick={hideList}><i className="fa-solid fa-times text-2xl"></i></button>
          </div>
          <div className='flex sm:gap-5 gap-3'>
            {/* Notification Bell */}
            <div className='relative' ref={notifRef}>
              <button 
                className='relative cursor-pointer mt-1'
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="fa-regular fa-bell text-2xl"></i>
                {unreadCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold'>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className='absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden'>
                  <div className='px-4 py-3 bg-linear-to-r from-blue-50 to-indigo-50 border-b'>
                    <h3 className='font-semibold text-gray-800'>Notifications</h3>
                  </div>
                  <div className='max-h-80 overflow-y-auto'>
                    {loading ? (
                      <div className='p-4 text-center text-gray-400'>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.slice(0, 10).map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50' : ''}`}
                          onClick={() => handleMarkAsRead(notif._id)}
                        >
                          <div className='flex items-start gap-3'>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                              notif.type === 'new_course' ? 'bg-green-500' :
                              notif.type === 'course_update' ? 'bg-blue-500' :
                              'bg-indigo-500'
                            }`}>
                              <i className={`fa-solid ${
                                notif.type === 'new_course' ? 'fa-book' :
                                notif.type === 'course_update' ? 'fa-pen' :
                                'fa-bell'
                              }`}></i>
                            </div>
                            <div className='flex-1'>
                              <p className='text-sm font-medium text-gray-800'>{notif.title}</p>
                              <p className='text-xs text-gray-500 mt-0.5'>{notif.message}</p>
                              <p className='text-[10px] text-gray-400 mt-1'>{formatTimeAgo(notif.createdAt)}</p>
                            </div>
                            {!notif.isRead && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='p-8 text-center text-gray-400'>
                        <i className="fa-regular fa-bell-slash text-3xl mb-2"></i>
                        <p className='text-sm'>No notifications yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <img src="/coursesimg/face.png" className="w-8 h-8" alt="" />
          </div>

        </div>
      </div>


      <div className='absolute fixed z-50 w-45 mr-8 right-0 hidden bg-white' ref={listRef}>
        <ul className='flex flex-col gap-2 list-none w-full'>
          <NavLink to="/" end className={({ isActive }) => `text-sm font-medium pb-1 ${isActive ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-medium py-2 px-4 w-full listItem font-lexend'>Home</li></NavLink>
          <NavLink to="/myCourse" className={({ isActive }) => `text-sm font-medium pb-1 ${isActive ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-medium py-2 px-4 w-full listItem'>Courses</li></NavLink>
          <NavLink to="/myCourse/mylearn" end className={({ isActive }) => `text-sm font-medium pb-1 ${isActive ? "text-black border-b-2 border-black font-bold" : "text-[#858585]"}`}><li className='text-sm font-bold py-2 px-4 w-full listItem mylogin'>My Learning</li></NavLink>
        </ul>
      </div>

    </div>

  )
}

export default NavigationBar











