<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react'
import "./course.css";
import { courseService, enrollmentService } from '../services';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
=======
import React, { useEffect, useRef, useState } from 'react'
import "./course.css";
import { API_LOCALHOST } from '../apilocalhost';
import axios from 'axios';

>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

const Course = () => {
    const sideRef = useRef();
    const barsRef = useRef();
    const timerRef = useRef();
    const courseRef = useRef();
    const toast = useToast();
    const { isAuthenticated } = useAuth();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
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
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await courseService.getAllCourses();
            if (response.success && response.data) {
                // Handle nested data structure: response.data.courses or direct array
                const coursesData = response.data.courses || (Array.isArray(response.data) ? response.data : []);
                setCourses(coursesData);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        if (!isAuthenticated) {
            toast.error("Please login to enroll");
            return;
        }

        try {
            setEnrollingId(courseId);
            await enrollmentService.enrollInCourse(courseId);
            toast.success("Successfully enrolled in course!");
        } catch (error) {
            toast.error(error.message || "Failed to enroll");
        } finally {
            setEnrollingId(null);
        }
    };

    const handleCategoryFilter = async (category) => {
        setSelectedCategory(category);
        if (!category) {
            fetchCourses();
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

    const [courseArray, setCourseArray] = useState([]);


    useEffect(()=>{
        const getAllcourses = JSON.parse(localStorage.getItem("mycourses"));
        setCourseArray(getAllcourses);
        
    },[]);

    console.log("These are my course array items :", courseArray);


   

    // /api/courses/

    const hideSidebar = () => {
        sideRef.current.style.display = "none";
        barsRef.current.style.display = "block";
        timerRef.current.style.display = "none";
    }

    const wholeCourseUrl = `${API_LOCALHOST}/api/courses/`;

    useEffect(()=>{
      axios.get(wholeCourseUrl)
      .then((res)=>{
        console.log("This is my response data:", res.data);
        console.log("These are my courses", res.data.data.courses);
        localStorage.setItem("mycourses", JSON.stringify(res.data.data.courses));
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])

    const enrollment = (mycourseid) => {
        const enrollUrl = `${API_LOCALHOST}/api/enrollments/enroll`
        const enrollToken = localStorage.getItem("token");


        console.log("enrollToken", enrollToken);

        const enrollData = {
            courseId : mycourseid
        }

        axios.post(enrollUrl, enrollData, {
            headers: {
                Authorization: `Bearer ${enrollToken}`
            }
        })
        .then((res)=> {
            console.log("This is my enrollment response:", res.data);
            
        })
        .catch((err) => {
            console.log("Enrollment error:", err.response?.data);
          
            if (err.response?.status === 400) {
              alert(err.response.data.message);
            }
          })
    }


    const handleCategoryClick = async (category) => {
        // try {
        //   const res = await axios.get(
        //     `${API_LOCALHOST}/api/courses/category/${encodeURIComponent(category)}`
        //   );
        //   setCourseArray(res.data);
        // } catch (err) {
        //   console.error(err);
        // }

        try{
            axios.get(`${API_LOCALHOST}/api/courses/category/${encodeURIComponent(category)}`)
            .then((res)=>{
                console.log(res.data);
                setCourseArray(res.data.data.courses);
            })
        }
        catch(err){
            console.log(err);
        }
      };

  return (
    <div className='pt-20 pb-10 w-full sm:pl-15 pl-10 sm:pr-17 pr-10 flex flex-col gap-4 bg-[#e6f2ff]'>
      <div className='w-full flex flex-col gap-2'>
         <h1 className='font-[500] text-[30px] text-black'>Explore Courses</h1>
         <h2 className='text-[22px] text-[#757575] font-[500]'>Find the right course to upgrade your skills</h2>
        
         <div className='w-full flex sm:gap-1 gap-5 md:mt-0 mt-2'>
         <div className='md:hidden block md:w-[0%] sm:w-[5%] w-[7%]' ref={barsRef}><i className="fa-solid fa-bars text-3xl mt-1"  onClick={showSidebar}></i></div>
         <div className='hidden md:w-[0%] sm:w-[5%] w-[7%]' ref={timerRef}><i className="fa-solid fa-times text-3xl mt-1"  onClick={hideSidebar}></i></div>
         <div className='md:w-full w-[93%] p-2 flex md:gap-2 sm:gap-3 gap-4 justify-center items-center rounded-[8px] bg-white'>
<<<<<<< HEAD
         <i className="fa-solid fa-magnifying-glass md:w-[3%] sm:w-[5%] w-[7%]"></i>
         <input 
           type="text" 
           placeholder="Search for courses, skills or topics" 
           className='md:w-[96%] sm:w-[94%] w-[92%] h-full text-[16px] sm:text-[14px] outline-none'
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
         />
=======
         <i class="fa-solid fa-magnifying-glass md:w-[3%] sm:w-[5%] w-[7%]"></i>
         <input type="text" placeholder="Search for courses, skills or topics" className='md:w-[96%] sm:w-[94%] w-[92%] h-full sm:text-[16px] text-[12px] outline-none'/>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
         </div>
         </div>
         
      </div>

      <div className='w-full flex justify-between'>

         <div className=' hidden md:block md:static fixed top-70 left-0 md:w-[17%] w-50 bg-white rounded-tr-[20px] rounded-br-[20px] z-50 pl-8 py-4' ref={sideRef}>
            <div className='flex flex-col gap-2 pb-3 border-b border-gray-200'>
                <label className='text-[15px] font-[600]'>Category</label>

<<<<<<< HEAD
                <div 
                  className={`flex gap-1 cursor-pointer p-1 rounded ${!selectedCategory ? 'bg-blue-50' : ''}`}
                  onClick={() => handleCategoryFilter("")}
                >
                    <p className={`font-[400] text-[14px] ${!selectedCategory ? 'text-blue-600' : ''}`}>All Categories</p>
                </div>
                {categories.map((cat) => (
                  <div 
                    key={cat}
                    className={`flex gap-1 cursor-pointer p-1 rounded ${selectedCategory === cat ? 'bg-blue-50' : ''}`}
                    onClick={() => handleCategoryFilter(cat)}
                  >
                      <p className={`font-[400] text-[14px] ${selectedCategory === cat ? 'text-blue-600' : ''}`}>{cat}</p>
                  </div>
                ))}
=======
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Web Development")}/>
                    <p className='font-[300] text-[14px]'>Web development</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Data Science")}/>
                    <p className='font-[300] text-[14px]'>Data Science</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Graphic Design")}/>
                    <p className='font-[300] text-[14px]'>Graphic Design</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Business Strategy")}/>
                    <p className='font-[300] text-[14px]'>Business Strategy</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Mobile Development")}/>
                    <p className='font-[300] text-[14px]'>Mobile Development</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' onChange={(e) =>
                    e.target.checked && handleCategoryClick("Other")}/>
                    <p className='font-[300] text-[14px]'>Other</p>
                </div>

            </div>

            <div className='flex flex-col gap-2 py-3 border-b border-black'>
                <label className='text-[15px] font-[500]'>Level</label>

                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Beginner</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Intermediate</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Advanced</p>
                </div>
                
            </div>

            <div className='flex flex-col gap-2 py-3 border-b border-black'>
                <label className='text-[15px] font-[500]'>Price</label>

                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Free</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Paid</p>
                </div>
                
                
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
            </div>
         </div>

         <div className='md:w-[78%] w-[100%]' ref={courseRef}>
<<<<<<< HEAD
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
                    <div className='w-full h-[140px] overflow-hidden rounded-md'>
                       <img 
                         src={getImageUrl(course.image)} 
                         className='w-full h-full object-cover' 
                         alt={course.title}
                         onError={(e) => { e.target.src = 'coursesimg/gray.png' }}
                       />
                    </div>
                    <div className='flex flex-col gap-1 flex-grow'>
                        <span className='text-[11px] font-[500] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full self-start'>
                          {course.category || 'General'}
                        </span>
                        <h3 className='text-[16px] font-[600]'>{course.title}</h3>
                        <p className='text-[13px] text-[#61758A] line-clamp-2'>{course.description}</p>
                        <p className='text-[18px] font-[700] text-[#0D121C]'>${course.price}</p>
                    </div>
                    <button 
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollingId === course._id}
                      className='py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                    >
                      {enrollingId === course._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Enrolling...
                        </>
                      ) : (
                        'Enroll Now'
                      )}
                    </button>
                </div>
                ))}
              </div>
            )}
=======
            <div className='w-[95%] flex md:gap-7 gap-7 sm:mt-0 mt-2 flex-wrap'>

                {
                   courseArray.map((single)=>{
                    return(
                        <div className='relative h-77 md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                        <div className='w-full'>
                           <img src={single.image} className='w-full' alt="" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-[16px] font-[500]'>{single.title}</h3>
                            <p className='text-[14px] text-[#61758A]'>{single.description}</p>
                            
                        </div>
                        <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll' onClick={()=>enrollment(single._id)}>Enroll Now</button>
                    </div>
                    )
                   }) 
                    }

                {/* <div className='relative h-77 md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/contentImg.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Graphic designning fundamental</h3>
                        <p className='text-[14px] text-[#61758A]'>Master the principles of visual communication and design.</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div>

                <div className='relative h-77 md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/white.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Business Strategy Essentials</h3>
                        <p className='text-[14px] text-[#61758A]'>Develop a strong foundation in business strategy and planning.</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div>

                <div className='relative md:w-[30.5%] sm:w-[47%] w-[97%] h-77 p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/gray.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Introduction to Web development</h3>
                        <p className='text-[14px] text-[#61758A]'>Learn the basic of HTML, CSS and Java Script</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] bottom-1 text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div>

                <div className='relative md:w-[30.5%] sm:w-[47%] w-[97%] h-77 p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/contentImg.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Graphic designning fundamental</h3>
                        <p className='text-[14px] text-[#61758A]'>Master the principles of visual communication and design.</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div>

                <div className='relative md:w-[30.5%] sm:w-[47%] w-[97%] h-77 p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/white.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Business Strategy Essentials</h3>
                        <p className='text-[14px] text-[#61758A]'>Develop a strong foundation in business strategy and planning.</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div> */}

            </div>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
         </div>
      </div>
    </div> 
  )
}

export default Course
