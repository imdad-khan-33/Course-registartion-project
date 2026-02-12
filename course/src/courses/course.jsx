import React, { useRef, useState, useEffect } from 'react'
import "./course.css";
import { courseService, enrollmentService } from '../services';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


const Course = () => {
    const sideRef = useRef();
    const barsRef = useRef();
    const timerRef = useRef();
    const courseRef = useRef();
    const toast = useToast();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [enrollingId, setEnrollingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        'Web Development',
        'Graphic Design', 
        'Business Strategy',
        'Data Science',
        'Mobile Development',
        'Other'
    ];

    useEffect(() => {
        fetchInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const courseRes = await courseService.getAllCourses();
            let enrollmentsData = [];
            
            if (isAuthenticated) {
                try {
                    const enrollRes = await enrollmentService.getMyEnrollments();
                    if (enrollRes.success && enrollRes.data) {
                        enrollmentsData = enrollRes.data.enrollments || (Array.isArray(enrollRes.data) ? enrollRes.data : []);
                        setMyEnrollments(enrollmentsData);
                    }
                } catch (e) {
                    console.error("Failed to fetch enrollments:", e);
                }
            }

            if (courseRes.success && courseRes.data) {
                const coursesData = courseRes.data.courses || (Array.isArray(courseRes.data) ? courseRes.data : []);
                setCourses(coursesData);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    const isEnrolled = (courseId) => {
        return myEnrollments.some(e => (e.course?._id || e.course) === courseId);
    };

    const handleEnroll = (courseId) => {
        // Always navigate to the detail page when clicking the button on the list
        navigate(`/myCourse/learn/${courseId}`);
    };

    const handleCategoryFilter = async (category) => {
        setSelectedCategory(category);
        if (!category) {
            fetchInitialData();
            return;
        }
        
        try {
            setLoading(true);
            const response = await courseService.getCoursesByCategory(category);
            if (response.success && response.data) {
                // Handle nested data structure
                const coursesData = response.data.courses || (Array.isArray(response.data) ? response.data : []);
                setCourses(coursesData);
            }
        } catch (error) {
            toast.error(error.message || "Failed to filter courses");
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (image) => {
        if (!image) return "coursesimg/gray.png";
        if (image.startsWith('http')) return image;
        return courseService.getImageUrl(image);
    };

    const filteredCourses = courses.filter(course => 
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showSidebar = () => {
        sideRef.current.style.display = "block";
        barsRef.current.style.display = "none";
        timerRef.current.style.display = "block";
    }

    const hideSidebar = () => {
        sideRef.current.style.display = "none";
        barsRef.current.style.display = "block";
        timerRef.current.style.display = "none";
    }

  return (
    <div className='pt-20 pb-10 w-full sm:pl-15 pl-10 sm:pr-17 pr-10 flex flex-col gap-4 bg-[#e6f2ff]'>
      <div className='w-full flex flex-col gap-2'>
         <h1 className='font-medium text-3xl text-black'>Explore Courses</h1>
         <h2 className='text-2xl text-[#757575] font-medium'>Find the right course to upgrade your skills</h2>
        
         <div className='w-full flex sm:gap-1 gap-5 md:mt-0 mt-2'>
         <div className='md:hidden block md:w-[0%] sm:w-[5%] w-[7%]' ref={barsRef}><i className="fa-solid fa-bars text-3xl mt-1"  onClick={showSidebar}></i></div>
         <div className='hidden md:w-[0%] sm:w-[5%] w-[7%]' ref={timerRef}><i className="fa-solid fa-times text-3xl mt-1"  onClick={hideSidebar}></i></div>
         <div className='md:w-full w-[93%] p-2 flex md:gap-2 sm:gap-3 gap-4 justify-center items-center rounded-lg bg-white'>
         <i className="fa-solid fa-magnifying-glass md:w-[3%] sm:w-[5%] w-[7%]"></i>
         <input 
           type="text" 
           placeholder="Search for courses, skills or topics" 
           className='md:w-[96%] sm:w-[94%] w-[92%] h-full text-base sm:text-sm outline-none'
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
         />
         </div>
         </div>
         
      </div>

      <div className='w-full flex justify-between'>

         <div className=' hidden md:block md:static fixed top-70 left-0 md:w-[17%] w-50 bg-white rounded-tr-[20px] rounded-br-[20px] z-50 pl-8 py-4' ref={sideRef}>
            <div className='flex flex-col gap-2 pb-3 border-b border-gray-200'>
                <label className='text-base font-semibold'>Category</label>

                <div 
                  className={`flex gap-1 cursor-pointer p-1 rounded ${!selectedCategory ? 'bg-blue-50' : ''}`}
                  onClick={() => handleCategoryFilter("")}
                >
                    <p className={`font-normal text-sm ${!selectedCategory ? 'text-blue-600' : ''}`}>All Categories</p>
                </div>
                {categories.map((cat) => (
                  <div 
                    key={cat}
                    className={`flex gap-1 cursor-pointer p-1 rounded ${selectedCategory === cat ? 'bg-blue-50' : ''}`}
                    onClick={() => handleCategoryFilter(cat)}
                  >
                      <p className={`font-normal text-sm ${selectedCategory === cat ? 'text-blue-600' : ''}`}>{cat}</p>
                  </div>
                ))}
            </div>
         </div>

         <div className='md:w-[78%] w-full' ref={courseRef}>
            {loading ? (
              <div className='w-full flex justify-center items-center py-20'>
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className='w-full flex justify-center items-center py-20'>
                <p className='text-gray-500 text-lg'>No courses found. Check back later!</p>
              </div>
            ) : (
              <div className='w-[95%] flex md:gap-7 gap-7 sm:mt-0 mt-2 flex-wrap'>
                {filteredCourses.map((course) => (
                <div key={course._id} className='relative h-auto min-h-[300px] md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse shadow-sm hover:shadow-md transition-shadow'>
                    <Link to={`/myCourse/learn/${course._id}`} className='flex flex-col gap-2 grow'>
                        <div className='w-full h-[140px] overflow-hidden rounded-md'>
                           <img 
                             src={getImageUrl(course.image)} 
                             className='w-full h-full object-cover' 
                             alt={course.title}
                             onError={(e) => { e.target.src = 'coursesimg/gray.png' }}
                           />
                        </div>
                        <div className='flex flex-col gap-1 grow'>
                            <span className='text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full self-start'>
                              {course.category || 'General'}
                            </span>
                            <h3 className='text-base font-semibold'>{course.title}</h3>
                            <p className='text-xs text-[#61758A] line-clamp-2'>{course.description}</p>
                            <p className='text-lg font-bold text-[#0D121C]'>${course.price}</p>
                        </div>
                    </Link>
                    <button 
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollingId === course._id}
                      className={`py-2 px-4 rounded-md text-white self-end text-sm font-bold enroll transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isEnrolled(course._id) ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1280ED] hover:bg-blue-600'}`}
                    >
                      {enrollingId === course._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Enrolling...
                        </>
                      ) : isEnrolled(course._id) ? (
                        'View Course'
                      ) : (
                        'Enroll Now'
                      )}
                    </button>
                </div>
                ))}
              </div>
            )}
         </div>
      </div>
    </div> 
  )
}

export default Course











