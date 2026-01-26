import React, { useState } from 'react'
import {Link} from "react-router-dom";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const formSubmitted = (e) => {
    e.preventDefault();
    console.log("form submitted", name, email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className='w-full sm:h-[100vh] flex justify-center items-center bg-[#ccf2ff]'>
    {/* <div className="w-[1200px] my-19 flex px-14 py-11 bg-[url('logo2.png')] bg-no-repeat bg-[length:400px_400px] bg-left bg-center md:bg-none md:bg-white   rounded-lg">  */}
    <div className="w-[1200px] mt-16 flex flex-wrap justify-center items-center  px-14 py-6 bg-white rounded-lg"> 
       <div className='md:w-[50%] w-[100%] flex flex-col gap-4'>
           <div>
           <h2 className='text-[22px] text-black font-[500] font-lexend'>Create an Account</h2>
           <h2 className='bg-gradient-to-r from-[#1C2B74] to-[#3551DA] bg-clip-text text-transparent font-lexend text-[35px] font-[500]'>to Get Started</h2>
           <p className='text-[16px]'>Join course Portal to join start learning now.</p>
           </div>

           <div className='md:w-[80%] w-[100%]'>
            <form action="" onSubmit={formSubmitted} className='w-full flex flex-col gap-3'>
            <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Name</label>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Email</label>
                <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Password</label>
                <input type="text" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className='border border px-2 py-2 text-[14px] w-full rounded-[8px]' />
              </div>

              <div className='flex gap-2 w-full'>
                <input type="checkbox" className="w-4 h-4 mt-0.5" name="" id="" />
                <p className='text-black text-[14px]'>I agree to the <span className='text-[#1280ED]'>Terms of servervices and privacy policy</span></p>
              </div>
              <button type="submit" className='w-full cursor-pointer bg-[#1280ED] py-3 px-4 text-white font-[700] text-[14px] rounded-[8px]'>Sign Up</button>
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
