import React, { useRef, useState } from 'react'
import "./nav.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const barRef = useRef();
    const timeRef = useRef();
    const listRef = useRef();
    const myRef = useRef();
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleLogout = () => {
      logout();
      toast.success("Logged out successfully");
      navigate('/');
    };

  return (
    <div className='fixed w-full py-3 px-10 bg-white z-50 shadow-sm'>
      <div className='flex justify-between' ref={myRef}>
        <div className='flex gap-2 justify-center items-center'>
            <img src="logo.png" className="w-4 h-4 mt-2" alt="" />
            <h2 className='text-[18px] font-[700] font-lexend'>coursePortal</h2>
        </div>
        <div className='flex gap-3'>
            <div className='sm:block hidden'>
           <div className='flex gap-4 items-center'>
            <ul className='flex gap-9 list-none justify-center items-center'>
                <Link to="/myCourse"><li className='text-[14px] font-[500] hover:text-blue-600 cursor-pointer'>Browse</li></Link>
                <Link to="/myCourse/mylearn"><li className='text-[14px] font-[500] hover:text-blue-600 cursor-pointer'>My Learning</li></Link>
            </ul>
            {isAuthenticated ? (
              <div className='relative'>
                <div 
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm'>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className='text-sm font-medium'>{user?.name || 'User'}</span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform ${showDropdown ? 'rotate-180' : ''}`}></i>
                </div>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
                    <div className='px-4 py-2 border-b border-gray-100'>
                      <p className='text-sm font-medium text-gray-900'>{user?.name || 'User'}</p>
                      <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                    </div>
                    <Link to="/myCourse/mylearn" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'>
                      <i className="fa-solid fa-book mr-2"></i>
                      My Learning
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex gap-2'>
                <Link to="/"><button type="button" className='text-[14px] font-[500] h-8 rounded-[8px] px-4 hover:bg-gray-100'>Login</button></Link>
                <Link to="/signUp"><button type="button" className='text-[14px] font-[700] h-8 rounded-[8px] px-4 mybtn'>Sign Up</button></Link>
              </div>
            )}
            </div>
            
            </div>
            
            <button className='sm:hidden block cursor-pointer' ref={barRef} onClick={showList}><i className="fa-solid fa-bars text-2xl"></i></button>
            <button className='hidden cursor-pointer' ref={timeRef} onClick={hideList}><i className="fa-solid fa-times text-2xl"></i></button>
        </div>
      </div>
      <div className='absolute fixed w-45 mr-8 right-0 hidden bg-white shadow-lg rounded-lg' ref={listRef}>
            <ul className='flex flex-col gap-2 list-none w-full py-2'>
                <Link to="/myCourse"><li className='text-[14px] font-[500] py-2 px-4 w-full listItem font-lexend'>Browse</li></Link>
                <Link to="/myCourse/mylearn"><li className='text-[14px] font-[500] py-2 px-4 w-full listItem'>My Learning</li></Link>
                {isAuthenticated ? (
                  <li className='text-[14px] font-[700] py-2 px-4 w-full listItem text-red-600 cursor-pointer' onClick={handleLogout}>Logout</li>
                ) : (
                  <>
                    <Link to="/"><li className='text-[14px] font-[500] py-2 px-4 w-full listItem'>Login</li></Link>
                    <Link to="/signUp"><li className='text-[14px] font-[700] py-2 px-4 w-full listItem mylogin'>Sign Up</li></Link>
                  </>
                )}
            </ul>
        </div>

    </div>
 
  )
}

export default Navbar
