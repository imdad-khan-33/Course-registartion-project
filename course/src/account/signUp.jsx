import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Sign = () => {
  const nav = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      nav('/myCourse');
    }
  }, [isAuthenticated, nav]);

  const formSubmitted = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the terms of service");
      return;
    }

    setLoading(true);
    
    try {
      await signup(name, email, password, confirmPassword);
      toast.success("Account created successfully!");
      nav('/myCourse');
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full sm:h-screen pb-5 pt-3 flex justify-center items-center bg-[#ccf2ff]'>
    
    <div className="sm:w-[490px] w-[350px] mt-16 flex sm:flex-row flex-col sm:gap-0 gap-11 justify-center items-center sm:px-10 px-8 py-3 bg-white rounded-lg"> 
    {/* <div className="sm:w-[1200px] w-[350px] mt-16 flex sm:flex-row flex-col-reverse sm:gap-0 gap-11 justify-center items-center sm:px-14 px-8 py-6 bg-white rounded-lg">  */}
       <div className='md:w-[97%] w-full flex flex-col gap-4'>
           <div className='mydivone'>
           <h2 className='text-2xl text-black font-medium font-lexend'>Create an Account</h2>
           <h2 className='bg-linear-to-r from-[#1C2B74] to-[#3551DA] bg-clip-text text-transparent font-lexend text-[35px] font-medium'>to Get Started</h2>
           <p className='text-base'>Join course Portal to join start learning now.</p>
           </div>

           <div className='md:w-full w-full mydivtwo'>
            <form action="" onSubmit={formSubmitted} className='w-full flex flex-col gap-3'>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-sm'>Name</label>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className='border px-3 py-2 text-sm w-full rounded-lg' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-sm'>Email</label>
                <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className='border px-3 py-2 text-sm w-full rounded-lg' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-sm'>Password</label>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className='border px-2 py-2 text-sm w-full rounded-lg' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-sm'>Confirm Password</label>
                <input type="password" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm your password" className='border px-2 py-2 text-sm w-full rounded-lg' />
              </div>

              <div className='flex gap-2 w-full'>
                <input type="checkbox" className="w-4 h-4 mt-0.5" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <p className='text-black text-sm'>I agree to the <span className='text-[#1280ED]'>Terms of services and privacy policy</span></p>
              </div>
              <button 
                type="submit" 
                className='w-full cursor-pointer bg-blue-600 py-3 px-4 text-white font-bold text-sm rounded-lg signbtn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <Link to="/login"><p className='text-sm text-[#1280ED] text-center mt-4'>Do have an account? <span className='text-[#5A6D82] cursor-pointer'>Login</span></p></Link>
           </div>
           
       </div>
       {/* <div className='md:w-[50%] w-full flex justify-center items-center'>
        <img src="signUp.png" className="w-[80%]  mt-12"alt="" />
       </div> */}
    </div>
  </div>
  )
}

export default Sign











