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
    <div className='w-full sm:h-[100vh] pb-5 pt-3 flex justify-center items-center bg-[#ccf2ff]'>
    
    <div className="sm:w-[1200px] w-[350px] mt-16 flex sm:flex-row flex-col sm:gap-0 gap-11 justify-center items-center sm:px-14 px-8 py-6 bg-white rounded-lg"> 
    {/* <div className="sm:w-[1200px] w-[350px] mt-16 flex sm:flex-row flex-col-reverse sm:gap-0 gap-11 justify-center items-center sm:px-14 px-8 py-6 bg-white rounded-lg">  */}
       <div className='md:w-[50%] w-[100%] flex flex-col gap-4'>
           <div className='mydivone'>
           <h2 className='text-[22px] text-black font-[500] font-lexend'>Create an Account</h2>
           <h2 className='bg-gradient-to-r from-[#1C2B74] to-[#3551DA] bg-clip-text text-transparent font-lexend text-[35px] font-[500]'>to Get Started</h2>
           <p className='text-[16px]'>Join course Portal to join start learning now.</p>
           </div>

           <div className='md:w-[80%] w-[100%] mydivtwo'>
            <form action="" onSubmit={formSubmitted} className='w-full flex flex-col gap-3'>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Name</label>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Email</label>
                <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Password</label>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className='border border px-2 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Confirm Password</label>
                <input type="password" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm your password" className='border border px-2 py-2 text-[14px] w-full rounded-[8px]' />
              </div>

              <div className='flex gap-2 w-full'>
                <input type="checkbox" className="w-4 h-4 mt-0.5" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <p className='text-black text-[14px]'>I agree to the <span className='text-[#1280ED]'>Terms of services and privacy policy</span></p>
              </div>
              <button 
                type="submit" 
                className='w-full cursor-pointer bg-blue-600 py-3 px-4 text-white font-[700] text-[14px] rounded-[8px] signbtn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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

            <Link to="/"><p className='text-[14px] text-[#1280ED] text-center mt-4'>Do have an account? <span className='text-[#5A6D82] cursor-pointer'>Login</span></p></Link>
           </div>
           
       </div>
       <div className='md:w-[50%] w-[100%] flex justify-center items-center'>
        <img src="signUp.png" className="w-[80%]  mt-12"alt="" />
       </div>
    </div>
  </div>
  )
}

export default Sign
