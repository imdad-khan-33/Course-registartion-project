import React, { useRef } from 'react'
import Dishboard from './dishbaord'
import Navbar from '../navbar'
import Side from '../sidebar/side'


const Dish = () => {

  const sideRef = useRef();
    const barsRef = useRef();
    const timerRef = useRef();
   

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
    <div className=' w-full h-screen overflow-hidden'>
      <Navbar/>
      <div className='relative pt-14 w-full flex gap-0 border-1 border-red-500  mysidebar'>
      <div className='md:static fixed md:block hidden md:w-[17%] w-[40%] h-170 z-40 bg-white' ref={sideRef}>
        <Side absentSidebar={hideSidebar} mytimeref={timerRef} />
      </div>
      <div className='md:w-[83%] w-[100%] bg-blue-500 h-full'>
      <Dishboard  presendSidebar={showSidebar}  myBarRef={barsRef}  />
      </div>
      
      </div>
      
    </div>
  )
}

export default Dish
