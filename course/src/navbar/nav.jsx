import React, { useRef } from 'react'
import "./nav.css";

const Nav = () => {
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
   
    <div className='fixed w-full py-3 px-10 bg-white'>
      <div className='flex justify-between' ref={myRef}>
        <div className='flex gap-2 justify-center items-center'>
            <img src="logo.png" className="w-4 h-4 mt-2" alt="" />
            <h2 className='text-[18px] font-[700] font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-3'>
            <div className='sm:block hidden'>
           <div className='flex gap-4'>
            <ul className='flex gap-9 list-none justify-center items-center'>
                <li className='text-[14px] font-[500]'>Browse</li>
                <li className='text-[14px] font-[500]'>My course</li>
                <li className='text-[14px] font-[500]'>Help</li>
            </ul>
            <button type="button" className='text-[14px] font-[700] h-8 rounded-[8px] px-4 mybtn'>Log in </button>
            </div>
            
            </div>
            
            <button className='sm:hidden block cursor-pointer' ref={barRef} onClick={showList}><i className="fa-solid fa-bars text-2xl"></i></button>
            <button className='hidden cursor-pointer' ref={timeRef} onClick={hideList}><i className="fa-solid fa-times text-2xl"></i></button>
        </div>
      </div>
      <div className='absolute fixed w-45 mr-8 right-0 hidden bg-white' ref={listRef}>
            <ul className='flex flex-col gap-2 list-none w-full'>
                <li className='text-[14px] font-[500] py-2 px-4 w-full listItem font-lexend'>Browse</li>
                <li className='text-[14px] font-[500] py-2 px-4 w-full listItem'>My course</li>
                <li className='text-[14px] font-[500] py-2 px-4 w-full listItem'>Help</li>
                <li className='text-[14px] font-[700] py-2 px-4 w-full listItem mylogin'>Log in</li>
            </ul>
        </div>

    </div>
 
    
  )
}

export default Nav
