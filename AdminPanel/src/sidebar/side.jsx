import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'


const Side = ({mytimeref, absentSidebar}) => {

  const turnOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }

  return (
    <div className='relative w-full h-full py-4 px-4 bg-[#F7FAFA]'>
      <div className='absolute top-0 right-4 hidden' ref={mytimeref}>
      <i className="fa-solid fa-times text-xl"  onClick={absentSidebar}></i>
      </div>
      <div className='flex flex-col h-full sm:pt-0 pt-4'>

        <div className='flex flex-col gap-2'>
        <NavLink to="/" end className={({ isActive }) => `text-[14px] font-[500] ${isActive ? "bg-[#E8EDF2]" : "text-[#858585]"}`}><div className='flex gap-3 w-full py-1.5 px-2.5'>
          <i className="fa-solid fa-house mt-0.5"></i>
          <p className='text-[#0D121C] text-[14px] font-[500]'>Dashboard</p>
          </div></NavLink>

          <NavLink to="/mycourse" end className={({ isActive }) => `text-[14px] font-[500] ${isActive ? "bg-[#E8EDF2]" : "text-[#858585]"}`}><div className='flex gap-3 w-full py-1.5 px-2.5'>
          <img src="/video.png" className="w-5 h-5" alt="" />
          <p className='text-[#0D121C] text-[14px] font-[500]'>Courses</p>
          </div></NavLink>

          <NavLink to="/myform" end className={({ isActive }) => `text-[14px] font-[500] ${isActive ? "bg-[#E8EDF2]" : "text-[#858585]"}`}><div className='flex gap-3 w-full py-1.5 px-2.5'>
          <img src="/plus.png" className="w-5 h-5" alt="" />
          <p className='text-[#0D121C] text-[14px] font-[500]'>Add Course</p>
          </div></NavLink>

          <NavLink to="/student" end className={({ isActive }) => `text-[14px] font-[500] ${isActive ? "bg-[#E8EDF2]" : "text-[#858585]"}`}><div className='flex gap-3 w-full py-1.5 px-2.5'>
          <img src="/students.png" className="w-5 h-5" alt="" />
          <p className='text-[#0D121C] text-[14px] font-[500]'>Students</p>
          </div></NavLink>

        </div>

        <div className='mt-auto flex gap-3 logout'>
          <img src="/arrow.png" className="w-5 h-5" alt="" />
          <button type="button" className='text-[#0D121C] text-[14px] font-[500]' onClick={turnOut}>Log Out</button>
        </div>
      </div>
      <div>
      
      
      </div>
      
    </div>
  )
}

export default Side
