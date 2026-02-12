import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { courseService, enrollmentService } from '../services';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import "./course.css";

const Learn = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  useEffect(() => {
    if (id) {
      fetchInitialData();
    }
  }, [id, isAuthenticated]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Fetch course details
      const courseRes = await courseService.getCourseById(id);
      if (courseRes.success && courseRes.data) {
        const courseData = courseRes.data.course || courseRes.data;
        setCourse(courseData);
      }

      // Check enrollment status
      if (isAuthenticated) {
        const enrollRes = await enrollmentService.getMyEnrollments();
        if (enrollRes.success && enrollRes.data) {
          const enrollments = enrollRes.data.enrollments || (Array.isArray(enrollRes.data) ? enrollRes.data : []);
          const isUserEnrolled = enrollments.some(e => (e.course?._id || e.course) === id);
          setEnrolled(isUserEnrolled);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to enroll");
      nav('/login');
      return;
    }

    try {
      setEnrolling(true);
      await enrollmentService.enrollInCourse(id);
      toast.success("Successfully enrolled in course!");
      nav('/myCourse');
    } catch (error) {
      toast.error(error.message || "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/coursesimg/webFace.png";
    if (image.startsWith('http')) return image;
    return courseService.getImageUrl(image);
  };

  if (loading) {
    return (
      <div className='pt-28 pb-15 md:px-15 px-7 w-full bg-[#e6f2ff] flex justify-center items-center min-h-[60vh]'>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='pt-28 pb-15 md:px-15 px-7 w-full bg-[#e6f2ff] flex justify-center items-center min-h-[60vh]'>
        <p className='text-gray-500 text-lg'>Course not found.</p>
      </div>
    );
  }

  // Study Mode UI (Video Player + Detailed Sidebar)
  if (studyMode) {
    return (
      <div className='pt-20 w-full min-h-screen bg-[#0D141C] text-white'>
        <div className='flex flex-col lg:flex-row h-[calc(100vh-80px)]'>
          {/* Main Player Area */}
          <div className='grow bg-black flex flex-col'>
            <div className='relative w-full aspect-video bg-zinc-900 group'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <i className="fa-solid fa-play text-6xl text-white/50 group-hover:text-white transition-all cursor-pointer"></i>
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent'>
                <h2 className='text-xl font-bold'>{course.title} - Session 1</h2>
              </div>
            </div>
            <div className='p-8 overflow-y-auto'>
                <div className='flex items-center gap-4 mb-6'>
                    <button onClick={() => setStudyMode(false)} className='px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-2'>
                        <i className="fa-solid fa-arrow-left"></i> Back to Overview
                    </button>
                    <h1 className='text-2xl font-bold'>Current Session: Introduction</h1>
                </div>
                <div className='bg-zinc-900/50 p-6 rounded-2xl border border-white/5'>
                    <h3 className='text-lg font-bold mb-3'>Session Description</h3>
                    <p className='text-zinc-400 leading-relaxed'>{course.description}</p>
                </div>
            </div>
          </div>

          {/* Sidebar Syllabus */}
          <div className='lg:w-96 w-full bg-zinc-900 border-l border-white/10 overflow-y-auto'>
            <div className='p-6 border-b border-white/10'>
              <h3 className='text-lg font-bold'>Course Curriculum</h3>
              <p className='text-sm text-zinc-400 mt-1'>2/12 Lessons Completed</p>
            </div>
            <div className='flex flex-col'>
              {(course.syllabus && course.syllabus.length > 0 ? course.syllabus : ["Introduction", "Getting Started", "Core Concepts"]).map((item, index) => (
                <div key={index} className={`p-5 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${index === 0 ? 'bg-indigo-600/20 border-l-4 border-indigo-500' : ''}`}>
                  <div className='flex justify-between items-start gap-3'>
                    <div className='flex gap-4'>
                        <span className='text-zinc-500 font-mono'>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <h4 className='text-sm font-bold'>{item.topic || item}</h4>
                            <p className='text-xs text-zinc-500 mt-1'><i className="fa-regular fa-clock mr-1"></i> 15:00 mins</p>
                        </div>
                    </div>
                    {index === 0 ? <i className="fa-solid fa-circle-play text-indigo-400"></i> : <i className="fa-solid fa-lock text-zinc-700"></i>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='pt-28 pb-15 md:px-15 px-7 w-full bg-[#e6f2ff]'>
      <div className='w-full flex md:flex-row flex-col md:justify-between md:gap-0 gap-8 justify-center'>
          <div className='md:w-[73%] w-full flex gap-6 flex-col'>
          <h1 className='text-4xl font-medium'>{course.title}</h1>

          <div className='bg-white md:px-10 px-5 py-4 flex flex-col gap-6 rounded-lg shadow-sm'>
          <div className='py-4 sm:px-4 px-2 flex md:flex-row flex-col gap-4 w-full'>
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50'>
              <img 
                src={getImageUrl(course.image)}  
                className="w-full h-full object-cover" 
                alt={course.instructor || "Instructor"} 
                onError={(e) => { e.target.src = "/coursesimg/webFace.png" }}
              />
            </div>
            <div className='flex flex-col gap-1 justify-center'>
              <h3 className='text-2xl font-bold'>{course.instructor || "Dr. Evelyn Reed"}</h3>
              <p className='text-base font-normal text-[#61758A]'>Subject Expert at Tech Institute</p>
            </div>
          </div>
          <div className='flex flex-col gap-3 px-4'>
            <h2 className='text-2xl font-bold'>About this course</h2>
            <p className='text-base font-normal leading-relaxed text-gray-700'>
              {course.description}
            </p>
          </div>

          <div className='px-4'>
            <h3 className='text-2xl font-bold pb-4'>Syllabus</h3>
            <div className='flex flex-col gap-4'>
              {course.syllabus && course.syllabus.length > 0 ? (
                course.syllabus.map((item, index) => (
                  <div key={index} className='p-3 bg-gray-50 rounded-md border-l-4 border-blue-400'>
                    <h4 className='text-base font-semibold'>{item.topic || item}</h4>
                    <p className='text-sm font-normal text-[#61758A]'>Week {index + 1}</p>
                  </div>
                ))
              ) : (
                <div className='flex flex-col gap-3'>
                  <div className='p-3 bg-gray-50 rounded-md border-l-4 border-blue-400'>
                    <h4 className='text-base font-medium'>Introduction and Fundamentals</h4>
                    <p className='text-sm font-normal text-[#61758A]'>Week 1</p>
                  </div>
                  <div className='p-3 bg-gray-50 rounded-md border-l-4 border-blue-400'>
                    <h4 className='text-base font-medium'>Core Concepts and Practical Applications</h4>
                    <p className='text-sm font-normal text-[#61758A]'>Week 2</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className='px-4 pb-4'>
            <h3 className='text-2xl font-bold'>Requirements</h3>
            <p className='text-base font-normal text-gray-700 mt-2'>
              {course.requirements || "No specific prerequisites required. Just a passion for learning!"}
            </p>
          </div>

          </div>
          
          </div>
          <div className='md:w-[25%] w-full pt-4 md:pt-19'>
            <div className='px-6 w-full py-8 flex flex-col items-center gap-7 rounded-lg bg-white shadow-md sticky top-28'>
              <h3 className='text-xl font-bold border-b pb-2 w-full'>Course Overview</h3>
              <table className='w-full'>
                <tbody>
                  <tr className='border-b border-gray-100'>
                    <td className='py-3 text-sm font-normal text-[#61758A]'>Duration</td>
                    <td className='py-3 text-sm font-semibold text-right'>{course.duration || '40 hours'}</td>
                  </tr>
                  <tr className='border-b border-gray-100'>
                    <td className='py-3 text-sm font-normal text-[#61758A]'>Enrolled</td>
                    <td className='py-3 text-sm font-semibold text-right'>{course.enrolledCount || '150+'}</td>
                  </tr>
                  <tr className='border-b border-gray-100'>
                    <td className='py-3 text-sm font-normal text-[#61758A]'>Level</td>
                    <td className='py-3 text-sm font-semibold text-right'>{course.level || 'Intermediate'}</td>
                  </tr>
                  <tr>
                    <td className='py-3 text-sm font-normal text-[#61758A]'>Price</td>
                    <td className='py-3 text-lg font-bold text-blue-600 text-right'>${course.price}</td>
                  </tr>
                </tbody>
              </table>
              <button 
                onClick={enrolled ? () => setStudyMode(true) : handleEnroll}
                disabled={enrolling}
                className={`w-full py-3 text-base rounded-lg font-bold text-white transition-colors disabled:opacity-50 flex justify-center items-center gap-2 ${enrolled ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1280ED] hover:bg-blue-600'}`}
              >
                {enrolling ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : enrolled ? (
                  'Open Course Content'
                ) : (
                  'Enroll Now'
                )}
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Learn











