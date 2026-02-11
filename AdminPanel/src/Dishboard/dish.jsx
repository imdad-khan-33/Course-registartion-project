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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="w-full flex pt-[72px]">
        <div
          className="md:sticky fixed z-40 top-[72px] md:block hidden md:w-[260px] w-[280px] h-[calc(100vh-72px)] overflow-hidden shrink-0"
          ref={sideRef}
        >
          <Side absentSidebar={hideSidebar} mytimeref={timerRef} />
        </div>
        <div className="flex-1 min-h-[calc(100vh-72px)] overflow-y-auto">
          <Dishboard presendSidebar={showSidebar} myBarRef={barsRef} />
        </div>
      </div>
    </div>
  )
}

export default Dish
