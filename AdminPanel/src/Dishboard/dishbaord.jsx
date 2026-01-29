import React, { useRef } from 'react'

const Dishboard = ({presendSidebar, absentSidebar, myBarRef, myTimeRef}) => {


  return (
    <div className='relative px-4 pt-2 pb-6 w-full'>
      <div className='absolute top-2 left-2 md:hidden block' ref={myBarRef}>
      <i className="fa-sharp fa-solid fa-bars text-2xl" onClick={presendSidebar} ></i>
      </div>
      <div className='w-full'>
        <h1 className='font-[700] text-[32px] py-0 sm:pt-0 pt-7'>Dishboard</h1>
        <div className='flex flex-col gap-4 w-full'>
          <div className='w-full flex flex-wrap gap-4 py-4'>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Courses</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>25</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 10 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Students</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>150</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 5 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Total Enrollments</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>300</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 15 %</p>
            </div>

            <div className='flex flex-col sm:w-[22%] w-[47%] bg-[#E8EDF2] p-3 '>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Recent Activity</p>
              <h3 className='text-[16px] font-[500] text-[#0D121C]'>10</h3>
              <p className='text-[16px] font-[500] text-[#08873B]'>+ 20 %</p>
            </div>

          </div>


          <div className='flex flex-col gap-3 py-3'>
            <div className='flex flex-col gap-0'>
              <p className='text-[16px] font-[500] text-[#0D121C]'>Enrollment Trends</p>
              <h4 className='text-[25px] font-[700] text-[#0D121C]'>+15%</h4>
              <p className='text-[16px] font-[400] text-[#0D121C]'>Last 30 Days <span className='text-[16px] font-[500] text-[#08873B]'>+15%</span></p>
            </div>
            <div className='h-[300px] bg-blue-400'>
              <h3>Chart work</h3>
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
              </div>
            </div>

            <div className='flex gap-2'>
              <img src="/oneman.png" className="w-5 h-5 mt-1" alt="" />
              <div className='flex flex-col'>
                <p className='text-[16px] font-[500] text-[#0D121C]'>Students enrolled</p>
                <p className='text-[16px] font-[400] text-[#4F6B96]'>5 hourse ago</p>
              </div>
            </div>

            <div className='flex gap-2'>
              <img src="/pencil.png" className="w-5 h-5 mt-1" alt="" />
              <div className='flex flex-col'>
                <p className='text-[16px] font-[500] text-[#0D121C]'>Course updtated</p>
                <p className='text-[16px] font-[400] text-[#4F6B96]'>1 day ago</p>
              </div>
            </div>

          </div>
            

          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Dishboard
