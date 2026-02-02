import React, { useState } from 'react'
import {Link} from "react-router-dom";
import "../App.css";
import axios from 'axios';
import { API_LOCALHOST } from '../apilocalhost';


const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  

  const formData = {
    name: name,
    email: email,
    password: password,
    confirmPassword:cpassword
  }

  const holeUrl = `${API_LOCALHOST}/api/user/signup`;

  const formSubmitted = (e) => {
    e.preventDefault();

    if(!name || !email || !password || !cpassword){
      alert("Please fill all the fields!")
    }else if(password.length < 6){
      alert("Enter at leat 6 characters password!")
    }else if(password !== cpassword){
      alert("Password and Confirm Password does not match!")
    }else {
      axios.post(holeUrl, formData)
      .then((res)=>{
        console.log(res.data);
        console.log(res.data.message);
        alert(res.data.message);
      })
      console.log("form submitted", name, email, password);
  
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
    }

   

    console.log("holeurl", holeUrl);
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
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Email</label>
                <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className='border border px-3 py-2 text-[14px] w-full rounded-[8px]' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Password  <span className='text-[12px]'>(Password must be at least 6 charaters)</span></label>
                <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password here!" className='border border px-2 py-2 text-[14px] w-full rounded-[8px]' />
              </div>

              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="" className='text-[14px]'>Confirm Password <span className='text-[12px]'>(Password must be at least 6 charaters)</span></label>
                <input type="password" value={cpassword}  onChange={(e)=>setCPassword(e.target.value)} placeholder="Enter password here!" className='border border px-2 py-2 text-[14px] w-full rounded-[8px]' />
              </div>

              <div className='flex gap-2 w-full'>
                <input type="checkbox" className="w-4 h-4 mt-0.5" name="" id="" />
                <p className='text-black text-[14px]'>I agree to the <span className='text-[#1280ED]'>Terms of servervices and privacy policy</span></p>
              </div>
              <button type="submit" className='w-full cursor-pointer bg-blue-600 py-3 px-4 text-white font-[700] text-[14px] rounded-[8px] signbtn'>Sign Up</button>
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
