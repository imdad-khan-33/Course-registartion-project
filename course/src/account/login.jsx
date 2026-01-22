import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", email, password);
    setEmail("");
    setPasssword("");
    nav("/myCourse")
  }

  const moveOut = () => {

     nav('/signUp');
  }
   return (
    <div className='w-full sm:h-[100vh] flex justify-center items-center bg-[#ccf2ff]'>
      {/* <div className="w-[1200px] my-19 flex px-14 py-11 bg-[url('logo2.png')] bg-no-repeat bg-[length:400px_400px] bg-left bg-center md:bg-none md:bg-white   rounded-lg">  */}
      <div className="w-[1200px] mt-16 flex flex-wrap justify-center items-center  px-14 py-11 bg-white rounded-lg"> 
         <div className='md:w-[50%] w-[100%] flex flex-col gap-6'>
             <div>
             <h2 className='text-[25px] text-black font-[500] font-lexend'>Welcome Back</h2>
             <h2 className='bg-gradient-to-r from-[#1C2B74] to-[#3551DA] bg-clip-text text-transparent font-lexend text-[40px] font-[500]'>to Course Portal</h2>
             <p className='text-[16px]'>Log in to access your courses</p>
             </div>

             <div className='md:w-[80%] w-[100%]'>
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
                <button type="submit" className='w-full cursor-pointer bg-[#1280ED] py-3 px-4 text-white font-[700] text-[14px] rounded-[8px]'>Login</button>
              </form>

              <p className='text-[14px] text-[#1280ED] text-center mt-4'>Don't have an account? <span className='text-[#5A6D82] cursor-pointer' onClick={moveOut}>Sign up</span></p>
             </div>
             
         </div>
         <div className='md:w-[50%] w-[100%] flex justify-center items-center'>
          <img src="logo2.png" className="w-[80%]  mt-12"alt="" />
         </div>
      </div>
    </div>
  )
}

export default Login
