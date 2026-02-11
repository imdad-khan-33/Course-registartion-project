import React, { useState } from 'react'
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {

  const mynav = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      mynav('/dish');
    }
  }, [isAuthenticated, mynav]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    
    try {
      await login(email, password);
      toast.success("Login successful!");
      mynav('/dish');
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl'></div>
      </div>

      {/* Header */}
      <div className='relative z-10 py-6 px-8'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30'>
            <i className="fa-solid fa-graduation-cap text-white text-lg"></i>
          </div>
          <h2 className='text-xl font-bold text-white'>Course Admin</h2>
        </div>
      </div>

      {/* Login Card */}
      <div className='relative z-10 flex justify-center items-center min-h-[85vh] px-4'>
        <div className='w-full max-w-md'>
          {/* Glass Card */}
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl'>
            {/* Logo & Title */}
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/30'>
                <i className="fa-solid fa-lock text-white text-3xl"></i>
              </div>
              <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
              <p className='text-gray-400'>Sign in to access admin dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className='space-y-6'>
              {/* Email Input */}
              <div className='relative'>
                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white/20 transition-all duration-300'
                  placeholder='Admin Email'
                />
              </div>

              {/* Password Input */}
              <div className='relative'>
                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <i className="fa-solid fa-key"></i>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white/20 transition-all duration-300'
                  placeholder='Password'
                />
              </div>

              {/* Forgot Password */}
              <div className='flex justify-end'>
                <button type='button' className='text-indigo-400 hover:text-indigo-300 text-sm transition-colors'>
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button 
                type='submit'  
                className='w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Login as Admin
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className='mt-8 pt-6 border-t border-white/10 text-center'>
              <p className='text-gray-400 text-sm'>
                Protected Admin Area <i className="fa-solid fa-shield-halved ml-1 text-indigo-400"></i>
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className='text-center text-gray-500 text-sm mt-6'>
            © 2024 Course Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div> 
  )
}

export default Login
