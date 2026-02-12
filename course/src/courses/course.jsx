import React, { useEffect, useRef, useState } from 'react'
import "./course.css";
import { API_LOCALHOST } from '../apilocalhost';
import axios from 'axios';


const Course = () => {
    const sideRef = useRef();
    const barsRef = useRef();
    const timerRef = useRef();
    const courseRef = useRef();

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
         <i class="fa-solid fa-magnifying-glass md:w-[3%] sm:w-[5%] w-[7%]"></i>
         <input type="text" placeholder="Search for courses, skills or topics" className='md:w-[96%] sm:w-[94%] w-[92%] h-full sm:text-[16px] text-[12px] outline-none'/>
         </div>
         </div>
         
      </div>

      <div className='w-full flex justify-between'>

         <div className=' hidden md:block md:static fixed top-70 left-0 md:w-[17%] w-50 h-105 bg-white rounded-tr-[20px] rounded-br-[20px] z-50 pl-8' ref={sideRef}>
            <div className='flex flex-col gap-2 pb-3 border-b border-black'>
                <label className='text-[15px] font-[500]'>Category</label>

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
                
                
            </div>
         </div>

         <div className='md:w-[78%] w-[100%]' ref={courseRef}>
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
         </div>
      </div>
    </div> 
  )
}

export default Course
