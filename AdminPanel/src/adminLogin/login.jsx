import React, { useState } from 'react'
import "./login.css";
import { useNavigate } from "react-router-dom";
import { adminLocalHost } from '../adminlocalhost';
import axios from 'axios';


const Login = () => {

  const mynav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const holeUrl = `${adminLocalHost}/api/admin/login`;

  const loginForm = {
    email : email,
    password : password
  }


  const handleLogin = (e) => {
      e.preventDefault();
    if(!email && !password){
      alert("Please fill all fields");
    }else{
      
      axios.post(holeUrl, loginForm)
      .then((res)=>{
        console.log("This is my response", res);
        console.log("This is my token", res.data.data.token);
        localStorage.setItem("adminToken", res.data.data.token);
        mynav("/");
        
      })
      console.log("These are my data", email, password);
     
    }
    
  }


  return (
    <div>
      <div className='py-[12px] px-[40px] flex gap-2'>
        <img src="logo.png" className='w-[16px] h-[16px] mt-1.5' alt="" />
        <h2 className='text-[18px] font-[700]'>Course Admin</h2>
      </div>
      <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='sm:w-[475px] w-[350px] h-[508px] bg-[#C1D6F7] rounded-[40px] flex justify-center items-center'>
            <div className=' flex flex-col gap-12 justify-center items-center'>
                <div className='w-full flex justify-center items-center'>
                     <h2 className='text-[28px] font-[700]'>Admin Login</h2>
                </div>
                <div className='sm:w-[318px] w-[280px] flex flex-col gap-10'>
                    <div className='flex flex-col gap-4'>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='rounded-[8px] p-[15px] w-full bg-white outline-none' placeholder='Admin Email' />
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded-[8px] p-[15px] w-full bg-white outline-none' placeholder='Password' />
                        <p className='text-[#4F6B96] text-[14px] font-[400] self-end'>Forgot Password?</p>
                    </div>
                    <div className='w-full  '>
                        <button type='button'  className='w-full py-3 rounded-[8px] text-[14px] bg-[#2E73E3] font-[700] text-white cursor-pointer mybtndiv' onClick={handleLogin}>Login as Admin</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div> 
  )
}

export default Login
