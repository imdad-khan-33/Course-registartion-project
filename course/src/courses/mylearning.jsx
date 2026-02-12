import React, { useState, useEffect } from 'react'
import { enrollmentService, courseService } from '../services';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const MyLearning = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  const fetchMyEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentService.getMyEnrollments();
      if (response.success && response.data) {
        // Handle nested data structure: response.data.enrollments or direct array
        const enrollmentsData = response.data.enrollments || (Array.isArray(response.data) ? response.data : []);
        setEnrollments(enrollmentsData);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEnrollment = async (enrollmentId) => {
    if (!window.confirm("Are you sure you want to cancel this enrollment?")) return;
    
    try {
      setCancellingId(enrollmentId);
      await enrollmentService.cancelEnrollment(enrollmentId);
      toast.success("Enrollment cancelled successfully");
      setEnrollments(enrollments.filter(e => e._id !== enrollmentId));
    } catch (error) {
      toast.error(error.message || "Failed to cancel enrollment");
    } finally {
      setCancellingId(null);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/coursesimg/DataScience.png";
    if (image.startsWith('http')) return image;
    return courseService.getImageUrl(image);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const completedEnrollments = enrollments.filter(e => e.status === 'completed');

  if (loading) {
    return (
      <div className='pt-25 pb-15 w-full md:px-15 px-10 bg-[#e6f2ff] flex justify-center items-center min-h-[60vh]'>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='pt-25 pb-15 w-full md:px-15 px-10 bg-[#e6f2ff]'>
      <div className='w-full flex flex-col gap-5'>
        <h1 className='text-4xl font-medium'>My Learning</h1>
        <div className='w-full flex gap-4 px-2'>
          <p className='text-sm font-bold border-b-2 border-blue-500 pb-1'>Enrolled ({enrollments.length})</p>
        </div>

        {enrollments.length === 0 ? (
          <div className='w-full flex justify-center items-center py-20'>
            <div className='text-center'>
              <p className='text-gray-500 text-lg mb-4'>You haven't enrolled in any courses yet.</p>
              <a href="/myCourse" className='text-blue-600 hover:underline'>Browse Courses</a>
            </div>
          </div>
        ) : (
          <div className='w-full flex flex-col md:gap-6 gap-13 px-4'>
            {activeEnrollments.length > 0 && (
              <div className='flex flex-col md:gap-6 gap-10'>
                <h3 className='w-full text-xl font-bold mb-[-8px]'>In Progress</h3>

                {activeEnrollments.map((enrollment) => (
                  <div key={enrollment._id} className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3 bg-white p-4 rounded-lg shadow-sm'>
                    <div className='flex flex-col gap-3'>
                      <div 
                        className='cursor-pointer group' 
                        onClick={() => navigate(`/myCourse/learn/${enrollment.course?._id}`)}
                      >
                        <h4 className='text-base font-bold group-hover:text-blue-600 transition-colors'>{enrollment.course?.title || 'Course Title'}</h4>
                        <p className='text-sm text-[#61758A]'>Enrolled on: {formatDate(enrollment.enrolledAt || enrollment.createdAt)}</p>
                        <p className='text-xs text-blue-600 mt-1'>{enrollment.course?.category || 'General'}</p>
                      </div>
                      <div className='flex gap-2'>
                        <button 
                          onClick={() => handleCancelEnrollment(enrollment._id)}
                          disabled={cancellingId === enrollment._id}
                          className='px-4 text-xs font-medium py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors disabled:opacity-50'
                        >
                          {cancellingId === enrollment._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                    <div 
                      className='cursor-pointer overflow-hidden rounded-lg'
                      onClick={() => navigate(`/myCourse/learn/${enrollment.course?._id}`)}
                    >
                      <img 
                        src={getImageUrl(enrollment.course?.image)} 
                        className='w-[280px] h-[150px] object-cover hover:scale-105 transition-transform duration-300' 
                        alt={enrollment.course?.title}
                        onError={(e) => { e.target.src = '/coursesimg/DataScience.png' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {completedEnrollments.length > 0 && (
              <div className='flex flex-col md:gap-6 gap-8'>
                <h3 className='w-full text-xl font-bold'>Completed</h3>

                {completedEnrollments.map((enrollment) => (
                  <div key={enrollment._id} className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3 bg-white p-4 rounded-lg shadow-sm'>
                    <div className='flex flex-col gap-3'>
                      <div>
                        <h4 className='text-base font-bold'>{enrollment.course?.title || 'Course Title'}</h4>
                        <p className='text-sm text-[#61758A]'>Completed on: {formatDate(enrollment.completedAt || enrollment.updatedAt)}</p>
                        <span className='inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full'>Completed</span>
                      </div>
                      <button className='px-4 text-xs font-bold py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors self-start'>
                        View Certificate
                      </button>
                    </div>
                    <div>
                      <img 
                        src={getImageUrl(enrollment.course?.image)} 
                        className='w-[280px] h-[150px] object-cover rounded-lg' 
                        alt={enrollment.course?.title}
                        onError={(e) => { e.target.src = '/coursesimg/machine.png' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default MyLearning











