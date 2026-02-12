<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react'
import { dashboardService } from '../services';
import { useToast } from '../context/ToastContext';
=======
import React, { useEffect, useRef, useState } from 'react'
import { adminLocalHost } from '../adminlocalhost'
import axios from 'axios';
import { graphData } from './chart';
import { Chart as Chartjs, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';

>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

const Dishboard = ({presendSidebar, absentSidebar, myBarRef, myTimeRef}) => {
  const toast = useToast();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
    recentEnrollments: 0,
    activeCourses: 0
  });
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      if (response.success && response.data) {
        const statsData = response.data.stats || response.data;
        
        // Set stats
        setStats({
          totalCourses: statsData.totalCourses || 0,
          totalStudents: statsData.totalStudents || statsData.totalUsers || 0,
          totalEnrollments: statsData.totalEnrollments || 0,
          recentEnrollments: statsData.recentEnrollments || 0,
          activeCourses: statsData.activeCourses || statsData.totalCourses || 0
        });

        // Set chart data (monthly enrollments)
        if (response.data.monthlyEnrollments && response.data.monthlyEnrollments.length > 0) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const formattedChartData = response.data.monthlyEnrollments.map((item, index) => ({
            month: months[item._id.month - 1],
            value: item.count,
            color: index % 2 === 0 ? 'from-indigo-400 to-indigo-600' : 'from-purple-400 to-purple-600'
          }));
          setChartData(formattedChartData);
        } else {
          // Default data if no enrollments
          setChartData([
            { month: 'Mon', value: 0, color: 'from-indigo-400 to-indigo-600' },
            { month: 'Tue', value: 0, color: 'from-purple-400 to-purple-600' },
            { month: 'Wed', value: 0, color: 'from-indigo-400 to-indigo-600' },
            { month: 'Thu', value: 0, color: 'from-purple-400 to-purple-600' },
            { month: 'Fri', value: 0, color: 'from-indigo-400 to-indigo-600' },
            { month: 'Sat', value: 0, color: 'from-purple-400 to-purple-600' },
            { month: 'Sun', value: 0, color: 'from-indigo-400 to-indigo-600' },
          ]);
        }

        // Set recent activity
        if (response.data.recentActivity && response.data.recentActivity.length > 0) {
          setRecentActivity(response.data.recentActivity);
        }

        // Set top courses
        if (response.data.topCourses && response.data.topCourses.length > 0) {
          setTopCourses(response.data.topCourses);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  // Calculate growth percentage
  const calculateGrowth = () => {
    if (stats.totalEnrollments === 0) return 0;
    const growth = ((stats.recentEnrollments / stats.totalEnrollments) * 100).toFixed(0);
    return growth;
  };

  // Format time ago
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

  const StatCard = ({ title, value, icon, gradient }) => (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl ${gradient}`}>
      <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16'></div>
      <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12'></div>
      <div className='relative z-10'>
        <div className='flex items-center justify-between mb-4'>
          <div className='w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm'>
            <i className={`${icon} text-xl`}></i>
          </div>
        </div>
        <h3 className='text-3xl font-bold mb-1'>
          {loading ? (
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            value.toLocaleString()
          )}
        </h3>
        <p className='text-sm text-white/80 font-medium'>{title}</p>
      </div>
    </div>
  );
=======
  
const DishboardUrl = `${adminLocalHost}/api/dashboard/stats`;
const token = localStorage.getItem("adminToken");

const [totalcourses, setTotalCourses] = useState("");
const [totalStudents, setTotalStudents] = useState("");
const [totalEnrollments, setTotalEnrollments] = useState("");
const [recentActivity, setRecentActivity] = useState("");

useEffect(()=>{

  axios.get(DishboardUrl, {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
  .then((res)=>{
    console.log("This is my dishboard response", res.data);
    console.log("state data", res.data.data.recentActivity);
    setTotalCourses(res.data.data.stats.totalCourses);

    setRecentActivity(res.data.data.recentActivity);
    setTotalStudents(res.data.data.stats.totalStudents);
    setTotalEnrollments(res.data.data.stats.totalEnrollments)
   
    

  })
  .catch((err)=>{
    console.log("This is my dishboard error", err);
  })
},[])

>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 pt-4 pb-8'>
      {/* Mobile Menu Button */}
      <div className='absolute top-4 left-4 md:hidden block z-10' ref={myBarRef}>
        <button 
          onClick={presendSidebar}
          className='w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all'
        >
          <i className="fa-solid fa-bars text-slate-700"></i>
        </button>
      </div>

<<<<<<< HEAD
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8 sm:pt-0 pt-12'>
          <h1 className='text-3xl font-bold text-slate-800 mb-2'>Dashboard</h1>
          <p className='text-slate-500'>Welcome back! Here's what's happening with your courses.</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard 
            title="Total Courses" 
            value={stats.totalCourses} 
            icon="fa-solid fa-book-open"
            gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
          />
          <StatCard 
            title="Total Students" 
            value={stats.totalStudents} 
            icon="fa-solid fa-users"
            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
          <StatCard 
            title="Enrollments" 
            value={stats.totalEnrollments} 
            icon="fa-solid fa-user-graduate"
            gradient="bg-gradient-to-br from-orange-500 to-pink-600"
          />
          <StatCard 
            title="This Month" 
            value={stats.recentEnrollments} 
            icon="fa-solid fa-chart-line"
            gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Main Chart */}
          <div className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h3 className='text-lg font-bold text-slate-800'>Enrollment Trends</h3>
                <p className='text-sm text-slate-500'>Monthly performance overview</p>
=======
            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Courses</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>{totalcourses}</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 10 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Students</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>{totalStudents}</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 5 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Enrollments</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>{totalEnrollments}</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 15 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Recent Activity</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>{recentActivity.length}</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 20 %</p>
            </div>

          </div>


          <div className='flex flex-col gap-3 py-3'>
            <div className='flex flex-col gap-0'>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Enrollment Trends</p>
              <h4 className='text-[25px] font-[700] text-[#0D121C]'>+15%</h4>
              <p className='text-[16px] font-[400] text-[#0D121C]'>Last 30 Days <span className='text-[16px] font-[500] text-[#08873B]'>+15%</span></p>
            </div>
            <div className='h-[300px] '>
            <Line className='w-full'
        data={{
              labels: graphData.map((singleData)=> singleData.days),
              datasets: [
                {
                  label: "Clicks",
                  data: graphData.map((data)=> data.clicks),
                  backgroundColor: "#002db3",
                  borderColor : "#999999"
                }
              ]

        }}

        options={{
          elements:{
            line:{
              tension: 0.5
            },
          },
          plugins:{
            title:{
              text : "Weekly Report",
            },
          },
        }}
        />
            </div>
          </div>

          <div className='py-4'>
            <h3 className='font-[700] text-[22px] text-[#0D121C] pt-2 pb-3'>Recent Activity</h3>

          <div className='flex flex-col gap-3'>
                   
            <div className='flex gap-2'>
              <img src="/plus.png" className="w-5 h-5 mt-1" alt="" />
              <div className='flex flex-col'>
                <p className='text-[16px] font-[500] text-[#0D121C]'>New Course Added</p>
                <p className='text-[16px] font-[400] text-[#4F6B96]'>2 hourse ago</p>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
              </div>
            </div>
            
            {/* Smooth Line Chart */}
            <div className='h-64 px-4'>
              {loading ? (
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : chartData.length > 0 ? (
                <svg className='w-full h-full' viewBox='0 0 400 180' preserveAspectRatio='none'>
                  {/* Smooth curved line using cubic bezier */}
                  <defs>
                    <linearGradient id='smoothLineGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                      <stop offset='0%' stopColor='#60a5fa' stopOpacity='0.15' />
                      <stop offset='100%' stopColor='#60a5fa' stopOpacity='0' />
                    </linearGradient>
                  </defs>
                  
                  {(() => {
                    const maxValue = Math.max(...chartData.map(d => d.value), 1);
                    const points = chartData.map((item, index) => ({
                      x: (index / (chartData.length - 1 || 1)) * 380 + 10,
                      y: 160 - (item.value / maxValue) * 140 + 10
                    }));
                    
                    // Create smooth bezier curve path
                    const createSmoothPath = (pts) => {
                      if (pts.length < 2) return '';
                      let path = `M ${pts[0].x},${pts[0].y}`;
                      
                      for (let i = 0; i < pts.length - 1; i++) {
                        const p0 = pts[i - 1] || pts[i];
                        const p1 = pts[i];
                        const p2 = pts[i + 1];
                        const p3 = pts[i + 2] || p2;
                        
                        const tension = 0.3;
                        const cp1x = p1.x + (p2.x - p0.x) * tension;
                        const cp1y = p1.y + (p2.y - p0.y) * tension;
                        const cp2x = p2.x - (p3.x - p1.x) * tension;
                        const cp2y = p2.y - (p3.y - p1.y) * tension;
                        
                        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
                      }
                      return path;
                    };
                    
                    const linePath = createSmoothPath(points);
                    const areaPath = linePath + ` L ${points[points.length - 1].x},170 L ${points[0].x},170 Z`;
                    
                    return (
                      <>
                        {/* Area fill */}
                        <path d={areaPath} fill='url(#smoothLineGradient)' />
                        {/* Smooth line */}
                        <path
                          d={linePath}
                          fill='none'
                          stroke='#60a5fa'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </>
                    );
                  })()}
                </svg>
              ) : (
                <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
                  <i className="fa-solid fa-chart-line text-4xl mb-2"></i>
                  <p>No enrollment data yet</p>
                </div>
              )}
              
              {/* X-axis labels */}
              {chartData.length > 0 && (
                <div className='flex justify-between mt-4 px-2'>
                  {chartData.map(item => (
                    <span key={item.month} className='text-xs font-medium text-slate-400'>{item.month}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Courses / Quick Stats */}
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
            <h3 className='text-lg font-bold text-slate-800 mb-6'>
              {topCourses.length > 0 ? 'Top Courses' : 'Quick Stats'}
            </h3>
            <div className='space-y-4'>
              {topCourses.length > 0 ? (
                topCourses.slice(0, 3).map((course, index) => (
                  <div key={course._id || index} className={`flex items-center justify-between p-4 rounded-xl ${
                    index === 0 ? 'bg-indigo-50' : index === 1 ? 'bg-emerald-50' : 'bg-orange-50'
                  }`}>
                    <div className='flex items-center gap-3'>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-emerald-500' : 'bg-orange-500'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <span className='font-medium text-slate-700 block text-sm'>{course.title}</span>
                        <span className='text-xs text-slate-400'>{course.category}</span>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-indigo-600' : index === 1 ? 'text-emerald-600' : 'text-orange-600'
                    }`}>{course.enrollmentCount}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className='flex items-center justify-between p-4 bg-indigo-50 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center'>
                        <i className="fa-solid fa-video text-white text-sm"></i>
                      </div>
                      <span className='font-medium text-slate-700'>Active Courses</span>
                    </div>
                    <span className='text-xl font-bold text-indigo-600'>{stats.activeCourses}</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-emerald-50 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center'>
                        <i className="fa-solid fa-user-check text-white text-sm"></i>
                      </div>
                      <span className='font-medium text-slate-700'>Active Users</span>
                    </div>
                    <span className='text-xl font-bold text-emerald-600'>{stats.totalStudents}</span>
                  </div>
                  <div className='flex items-center justify-between p-4 bg-orange-50 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center'>
                        <i className="fa-solid fa-fire text-white text-sm"></i>
                      </div>
                      <span className='font-medium text-slate-700'>This Month</span>
                    </div>
                    <span className='text-xl font-bold text-orange-600'>{stats.recentEnrollments}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-bold text-slate-800'>Recent Enrollments</h3>
            <span className='text-sm text-slate-500'>{recentActivity.length} activities</span>
          </div>
          
          <div className='space-y-4'>
            {loading ? (
              <div className='flex justify-center py-8'>
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity, index) => (
                <div key={activity._id || index} className='flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors'>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                    index % 3 === 0 ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                    index % 3 === 1 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}>
                    {activity.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className='flex-1'>
                    <p className='font-semibold text-slate-800'>
                      {activity.user?.name || 'A student'} enrolled
                    </p>
                    <p className='text-sm text-slate-500'>
                      in "{activity.course?.title || 'a course'}"
                    </p>
                  </div>
                  <span className='text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full'>
                    {formatTimeAgo(activity.enrolledAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-slate-400'>
                <i className="fa-solid fa-inbox text-4xl mb-3"></i>
                <p>No recent enrollments yet</p>
                <p className='text-sm'>Enrollments will appear here when students sign up</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dishboard
