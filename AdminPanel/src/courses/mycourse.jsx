import React, { useRef } from 'react'
import Navbar from '../navbar';
import Side from '../sidebar/side';
import Course from './course';

const Mycourse = () => {

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
    <div className="w-full h-screen overflow-hidden">
  <div> 
  <Navbar />
  </div>
 
  <div className="w-full flex pt-14 h-[calc(100vh-56px)]">

    <div className="md:static fixed z-50 top-14 md:block h-[calc(100vh-56px)] overflow-y-auto hidden md:w-[17%] w-[50%] bg-white" ref={sideRef}>
      <Side absentSidebar={hideSidebar} mytimeref={timerRef} />
    </div>

    <div className="md:w-[83%] w-full overflow-y-auto">
      <Course presendSidebar={showSidebar} myBarRef={barsRef} />
    </div>

  </div>
</div>
  )
}


export default Mycourse;