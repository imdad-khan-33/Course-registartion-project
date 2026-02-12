import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Side = ({mytimeref, absentSidebar}) => {
<<<<<<< HEAD
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };
=======

  const turnOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

  return (
    <div className='relative w-full h-full py-6 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col'>
      {/* Close Button for Mobile */}
      <div className='absolute top-4 right-4 md:hidden block' ref={mytimeref}>
        <button 
          onClick={absentSidebar}
          className='w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all'
        >
          <i className="fa-solid fa-times text-white"></i>
        </button>
      </div>

<<<<<<< HEAD
      {/* Navigation */}
      <div className='flex flex-col flex-1'>
        
        <nav className='flex flex-col gap-1'>
          <NavLink 
            to="/dish" 
            end 
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30' 
                  : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                  <i className={`fa-solid fa-house ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}></i>
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Dashboard
                </span>
              </>
            )}
          </NavLink>
=======
        <div className='flex flex-col gap-2'>
        <NavLink to="/" end className={({ isActive }) => `text-[14px] font-[500] ${isActive ? "bg-[#E8EDF2]" : "text-[#858585]"}`}><div className='flex gap-3 w-full py-1.5 px-2.5'>
          <i className="fa-solid fa-house mt-0.5"></i>
          <p className='text-[#0D121C] text-[14px] font-[500]'>Dashboard</p>
          </div></NavLink>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

          <NavLink 
            to="/mycourse" 
            end 
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30' 
                  : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                  <i className={`fa-solid fa-play-circle ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}></i>
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Courses
                </span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/myform" 
            end 
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30' 
                  : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                  <i className={`fa-solid fa-plus ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}></i>
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Add Course
                </span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/student" 
            end 
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30' 
                  : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                  <i className={`fa-solid fa-users ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}></i>
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Students
                </span>
              </>
            )}
          </NavLink>
        </nav>

<<<<<<< HEAD
        {/* Logout Button */}
        <div className='mt-auto pt-4 border-t border-slate-700'>
          <button 
            onClick={handleLogout}
            className='group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 w-full'
          >
            <div className='w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-all'>
              <i className="fa-solid fa-right-from-bracket text-red-400"></i>
            </div>
            <span className='font-medium text-red-400'>Logout</span>
          </button>
=======
        </div>

        <div className='mt-auto flex gap-3 logout'>
          <img src="/arrow.png" className="w-5 h-5" alt="" />
          <button type="button" className='text-[#0D121C] text-[14px] font-[500]' onClick={turnOut}>Log Out</button>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
        </div>
      </div>
    </div>
  )
}

export default Side
