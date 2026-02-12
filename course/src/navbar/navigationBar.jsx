import React, { useRef } from 'react'
import "./nav.css";
import { NavLink } from 'react-router-dom';






const NavigationBar = () => {

  const barRef = useRef();
  const timeRef = useRef();
  const listRef = useRef();
  const myRef = useRef();

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
          <h2 className='text-[18px] font-[700] font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-3'>
          <div className='sm:block hidden'>
            <div className='flex gap-4'>
              <ul className='flex gap-9 list-none justify-center items-center mt-1'>
                <NavLink to="/myCourse" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[500]'>Home</li></NavLink>
                <NavLink to="/myCourse/learn" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[500] '>Courses</li></NavLink>
                <NavLink to="/myCourse/mylearn" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[500] '>My Learning</li></NavLink>

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
           
            <i className="fa-regular fa-bell text-[22px] mt-2"></i>
            <img src="/coursesimg/face.png" className="w-8 h-8" alt="" />
          </div>

        </div>
      </div>


      <div className='absolute fixed z-50 w-45 mr-8 right-0 hidden bg-white' ref={listRef}>
        <ul className='flex flex-col gap-2 list-none w-full'>
          <NavLink to="/myCourse" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[500] py-2 px-4 w-full listItem font-lexend'>Home</li></NavLink>
          <NavLink to="/myCourse/learn" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[500] py-2 px-4 w-full listItem'>Courses</li></NavLink>
          <NavLink to="/myCourse/mylearn" end className={({ isActive }) => `text-[14px] font-[500] pb-1 ${isActive ? "text-black border-b-2 border-black font-[700]" : "text-[#858585]"}`}><li className='text-[14px] font-[700] py-2 px-4 w-full listItem mylogin'>My Learning</li></NavLink>
        </ul>
      </div>

    </div>

  )
}

export default NavigationBar
