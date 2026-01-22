import React, { useRef } from 'react'
import "./course.css";

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

    const hideSidebar = () => {
        sideRef.current.style.display = "none";
        barsRef.current.style.display = "block";
        timerRef.current.style.display = "none";
    }

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
         <input type="text" placeholder="Search for courses, skills or topics" className='md:w-[96%] sm:w-[94%] w-[92%] h-full outline-none'/>
         </div>
         </div>
         
      </div>

      <div className='w-full flex justify-between'>
         {/* <div className='md:block hidden md:static fixed px-2 py-3 md:w-[17%] w-70 h-105 bg-white rounded-[20px]' ref={sideRef}> */}
         <div className=' hidden md:block md:static fixed top-70 left-0 md:w-[17%] w-50 h-105 bg-white rounded-[20px] z-50 pl-8' ref={sideRef}>
            <div className='flex flex-col gap-2 pb-3 border-b border-black'>
                <label className='text-[15px] font-[500]'>Category</label>

                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>UI/UX Design</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Web development</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>Data Science</p>
                </div>
                <div className='flex gap-1'>
                    <input type="checkbox" className='w-4 h-4 mt-0.5' />
                    <p className='font-[300] text-[14px]'>AI/ML</p>
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

                <div className='relative h-77 md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
                    <div className='w-full'>
                       <img src="coursesimg/gray.png" className='w-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] font-[500]'>Introduction to Web development</h3>
                        <p className='text-[14px] text-[#61758A]'>Learn the basic of HTML, CSS and Java Script</p>
                        
                    </div>
                    <button className='absolute bottom-2 py-2 px-4 rounded-md bg-[#1280ED] text-white self-end text-[14px] font-[700] enroll'>Enroll Now</button>
                </div>

                <div className='relative h-77 md:w-[30.5%] sm:w-[47%] w-[97%] p-[10px] bg-white rounded-md flex flex-col gap-2 mycourse'>
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
                </div>

            </div>
         </div>
      </div>
    </div> 
  )
}

export default Course
