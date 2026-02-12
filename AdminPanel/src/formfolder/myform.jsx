import React, { useRef } from 'react'
import Navbar from '../navbar';
import Side from '../sidebar/side';
import Formm from './form';


const Myform = ({mymode, updateFunction, mytitle, setMyTitle, mydescription, setMyDescription, mycateg, setMycateg, img, setImg, myprice, setMyprice, durationn, setDurationn, instructer, setInstructer, myActive, activee}) => {

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

    console.log("This is my form mode", mymode);
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <Navbar />
 
      <div className="w-full flex pt-[72px]">
        {/* Sidebar */}
        <div 
          className="md:sticky fixed z-40 top-[72px] md:block hidden md:w-[260px] w-[280px] h-[calc(100vh-72px)] overflow-hidden shrink-0" 
          ref={sideRef}
        >
          <Side absentSidebar={hideSidebar} mytimeref={timerRef} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-[calc(100vh-72px)] overflow-y-auto">
          <Formm presendSidebar={showSidebar} myBarRef={barsRef} />
        </div>
      </div>
    </div>
<<<<<<< HEAD
=======

    <div className="md:w-[83%] w-full overflow-y-auto">
      <Formm presendSidebar={showSidebar} myBarRef={barsRef} newmode={mymode} handleUpdate={updateFunction}
      mytitle={mytitle} setMyTitle={setMyTitle} mydescription={mydescription} setMyDescription={setMyDescription} mycateg={mycateg} setMycateg={setMycateg} img={img} setImg={setImg} myprice={myprice} setMyprice={setMyprice} durationn={durationn} setDurationn={setDurationn} instructer={instructer} setInstructer={setInstructer} myActive={myActive} activee={activee}
      />
    </div>

  </div>
</div>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
  )
}


export default Myform;