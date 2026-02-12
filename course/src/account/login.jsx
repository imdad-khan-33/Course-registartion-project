<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
=======
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_LOCALHOST } from '../apilocalhost';
import axios from 'axios';
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628


const Login = () => {

  const nav = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      nav('/myCourse');
    }
  }, [isAuthenticated, nav]);

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    
    try {
      await login(email, password);
      toast.success("Login successful!");
      nav("/myCourse");
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
=======
  const loginUrl = `${API_LOCALHOST}/api/user/login`;

  const loginData = {
    email: email,
    password: password
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    

    if(!email || !password){
      alert("Please fill all the fields!");
    }else{
      axios.post(loginUrl, loginData)
      .then((res)=>{
        console.log(res.data);
        alert(res.data.message);
        console.log("token", res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        nav("/");
      })
    }

    
    // setEmail("");
    // setPasssword("");
    // nav("/myCourse")
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
  }

  const moveOut = () => {
     nav('/signUp');
  }

  // Show simple loading if checking auth
  if (authLoading) {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center bg-[#ccf2ff]'>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
   return (
    <div className='w-full sm:h-[100vh] pb-5 pt-3 flex justify-center items-center bg-[#ccf2ff]'>
     
      <div className="sm:w-[450px] w-[350px] mt-16 flex flex-wrap justify-center items-center sm:px-14 px-8 py-11 bg-white rounded-xl"> 
     
        <div className='md:w-[97%] w-[100%] flex flex-col gap-6'>
             <div className='w-full'>
             <h2 className='text-[25px] text-black font-[500] font-lexend'>Welcome Back</h2>
             <h2 className='bg-gradient-to-r from-[#1C2B74] to-[#3551DA] bg-clip-text text-transparent font-lexend text-[40px] font-[500] w-full'>to Course Portal</h2>
             <p className='text-[16px]'>Log in to access your courses</p>
             </div>

             <div className='md:w-[100%] w-[100%] flex flex-col justify-center items-center'>
              <form action="" onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="">Email</label>
                  <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-md w-full rounded-[8px]' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="">Password</label>
                  <input type="text" value={password}  onChange={(e)=>setPasssword(e.target.value)} placeholder="Enter your password" className='border border px-2 py-2 text-md w-full rounded-[8px]' />
                </div>

                <div className='flex justify-between w-full'>
                  <div className='flex gap-1'>
                  <input type="checkbox" className='w-4 h-4 mt-1' />
                  <lable htmlFor="" className=''>Remember me</lable>
                  </div>
                  <p className='text-[#145DA0]'>Forgot Password</p>
                </div>
                <button 
                  type="submit" 
                  className='w-full cursor-pointer bg-[#1280ED] py-3 px-4 text-white font-[700] text-[14px] rounded-[8px] signbtn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              <p className='text-[14px] text-[#1280ED] text-center mt-4'>Don't have an account? <span className='text-[#5A6D82] cursor-pointer' onClick={moveOut}>Sign up</span></p>
             </div>
             
         </div>
  
         
         {/* <div className='md:w-[50%] w-[100%] flex justify-center items-center'>
          <img src="logo2.png" className="w-[80%]  mt-12"alt="" />
         </div> */}
      </div>
    </div>
  )
}

export default Login
