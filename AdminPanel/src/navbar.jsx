import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import "./App.css";
    



const Navbar = () => {
  
  
   

  return (
    <div className='fixed w-full py-3 z-50 md:px-12 px-9 bg-white border-b border-[#E5E8EB]'>
      <div className='flex justify-between' >
        <div className='flex gap-2 justify-center items-center'>
            <img src="logo.png" className="w-4 h-4 mt-2" alt="" />
            <h2 className='text-[18px] font-[700] font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-7'>
        
        <i className="fa-regular fa-bell text-xl mt-2"></i>
        <img src="/face.png" className="w-8 h-8" alt="" />
        </div>
      </div>
      
        
    </div>
 
  )
}

export default Navbar
