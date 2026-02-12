import React, { useRef } from 'react'
import "./nav.css";
import { Link } from 'react-router-dom';

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
   
    <div className='fixed w-full py-3 px-10 bg-white z-50'>
      <div className='flex justify-between' ref={myRef}>
        <div className='flex gap-2 justify-center items-center'>
            <img src="logo.png" className="w-4 h-4 mt-2" alt="" />
            <h2 className='text-lg font-bold font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-3'>
            <div className='sm:block hidden'>
           <div className='flex gap-4 items-center'>
            <ul className='flex gap-9 list-none justify-center items-center'>
                <li className='text-sm font-medium cursor-pointer hover:text-blue-600'>Browse</li>
                <li className='text-sm font-medium cursor-pointer hover:text-blue-600'>Help</li>
            </ul>
            <Link to="/signUp"><button type="button" className='text-sm font-bold h-8 rounded-lg px-4 mybtn'>Sign Up</button></Link>
            </div>
            
            </div>
            
            <button className='sm:hidden block cursor-pointer' ref={barRef} onClick={showList}><i className="fa-solid fa-bars text-2xl"></i></button>
            <button className='hidden cursor-pointer' ref={timeRef} onClick={hideList}><i className="fa-solid fa-times text-2xl"></i></button>
        </div>
      </div>
      <div className='absolute fixed w-45 mr-8 right-0 hidden bg-white shadow-lg rounded-lg' ref={listRef}>
            <ul className='flex flex-col gap-2 list-none w-full py-2'>
                <li className='text-sm font-medium py-2 px-4 w-full listItem font-lexend'>Browse</li>
                <li className='text-sm font-medium py-2 px-4 w-full listItem'>Help</li>
                <Link to="/signUp"><li className='text-sm font-bold py-2 px-4 w-full listItem mylogin'>Sign Up</li></Link>
            </ul>
        </div>

    </div>
 
    
  )
}

export default Nav











