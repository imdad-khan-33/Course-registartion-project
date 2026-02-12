import React, { useRef, useState } from 'react'
import "./form.css";
import axios from 'axios';
import { adminLocalHost } from '../adminlocalhost';


const Formm = ({presendSidebar, myBarRef, newmode, handleUpdate, mytitle, setMyTitle, mydescription, setMyDescription, mycateg, setMycateg, img, setImg, myprice, setMyprice, durationn, setDurationn, instructer, setInstructer, myActive, activee}) => {


  console.log("This is my mode", newmode);

  const [mycategory, setMycategory] = useState("");
  const [courselevel, setCourselevel] = useState("");
  const [myTumbnil, setMyThumbnil] = useState(null);
  const [title, setTitle] = useState("");
  const [instruct, setInstruct] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
};

const courseUrl = `${adminLocalHost}/api/courses/admin/create`


const myadminToken = localStorage.getItem("adminToken");

const courseFormData = new FormData();

courseFormData.append("title", title);
courseFormData.append("description", description);
courseFormData.append("category", mycategory);
courseFormData.append("duration", duration);
courseFormData.append("price", price);
courseFormData.append("instructor", instruct);
courseFormData.append("img", myTumbnil);


const handlePusblish = (e) => {
  e.preventDefault();
  if(!title || !mycategory || !instruct || !courselevel || !duration || !price || !description || !myTumbnil){
    alert("Please fill all the fields");
    return;
  }else
  {
    
    console.log("Title:", title, "Category:", mycategory, "Instructor:", instruct, "Course level:", courselevel, "Duration:", duration, "Price:", price, "Description:", description, "Thumbnil:", myTumbnil);

    axios.post(courseUrl, courseFormData,{
      headers: {
        Authorization: `Bearer ${myadminToken}`,
      },
    })
    .then((res)=>{
      console.log(res.data);
      alert(res.data.message);
    })
    
    setTitle("");
    setMycategory("");
    setCourselevel("");
    setInstruct("");
    setDuration("");
    setPrice("");
    setDescription("");
    setMyThumbnil(null);
  }
}

          const reload = () => {
            window.location.reload();
          }
  return (
    <div className='relative px-4 pt-2 pb-6 w-full'>
      <div className='absolute top-2 left-2 md:hidden block' ref={myBarRef}>
       <i className="fa-sharp fa-solid fa-bars text-2xl" onClick={presendSidebar} ></i>
      </div>
      <div className='py-3 w-full sm:pr-18 pr-7'>
      <h1 className='sm:py-0 py-5 font-[700] text-[25px] text-[#0D121C]'>{newmode ? "Update Course":"Add New Course"}</h1>
      {newmode && (<button type="button" onClick={reload} className='my-3 px-3 py-1 rounded-md text-white cursor-pointer bg-blue-400' >Back</button>)}

      <div className='w-full flex'>
        {newmode ?  (<form action="" onSubmit={handleUpdate} className='w-full'>
        <div className='flex flex-col gap-2 sm:w-[50%] w-[90%]'>
         
         <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Course Title</label>
             <input type="text" value={mytitle} onChange={(e)=>setMyTitle(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter course title' />
         </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Category</label>
             <select value={mycateg} onChange={(e)=>setMycateg(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[12px]outline-none'>
                 <option className="text-[14px]" value="">Select category</option>
                 <option className="text-[14px]" value="Web Development">Web development</option>
                 <option className="text-[14px]" value="Graphic Design">Graphic Design</option>
                 <option className="text-[14px]" value="Business Strategy">Business Strategy</option>
                 <option className="text-[14px]" value="Data Science">Data Science</option>
                 <option className="text-[14px]" value="Mobile Development">Mobile Development</option>
                 <option className="text-[14px]" value="Other">Other</option>
             </select>
          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Instructor</label>
             <input type="text" value={instructer} onChange={(e)=>setInstructer(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter Instructor Name' />
          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Course Status</label>
             <select value={activee === null ? "" : activee.toString()} onChange={(e)=>myActive(e.target.value=== ""? null : e.target.value === "true")} className='w-full p-1 border-1 border-[#E8EDF2] text-[12px]outline-none'>
                 <option className="text-[14px]" value="">Select Course Status</option>
                 <option className="text-[14px]" value="true">Active</option>
                 <option className="text-[14px]" value="false">Not Active</option>
             </select>

          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Duration</label>
             <input type="text" value={durationn} onChange={(e)=>setDurationn(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter Duration' />
             
          </div>
          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Price</label>
             <input type="text" value={myprice} onChange={(e)=>setMyprice(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter price here' />
             
          </div>
          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Description</label>
            <textarea type="text" value={mydescription} onChange={(e)=>setMyDescription(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none h-[100px]' placeholder='Enter Description here'>
            </textarea>
          </div>
        </div>

        <div className='w-full py-2'>
          <div className='w-full'>
            <h2 className='text-[20px] font-[700]'>Upload Course Thumbnil</h2>
          </div>
          <div className='sm:py-6 py-8 flex justify-center items-center'>
            <div onClick={handleImageClick} className='flex flex-col justify-center items-center cursor-pointer'>
              <input type="file" ref={fileInputRef} onChange={(e)=>setImg(e.target.files[0])} className='hidden'></input>
              <h3 className='font-[700] text-[18px] text-center'>Drag and drop or browse to upload</h3>
              <p className='font-[400] text-[14]'>Max, file size: 5MB</p>
            </div>
          </div>
            <div className='w-full'>
            <div className='flex gap-1 justify-end'>
            <button type="submit" className='py-1 px-3 cursor-pointer rounded-md text-white bg-[#2E73E3] publish'>Edit</button>
            <button type="button" className='py-1 px-3 rounded-md text-black cursor-pointer bg-[#E8EDF2] save'>Save Draft</button>
           </div>
            </div>
           

        </div>
        </form>):
        
        (<form action="" onSubmit={handlePusblish} className='w-full'>
        <div className='flex flex-col gap-2 sm:w-[50%] w-[90%]'>
         
         <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Course Title</label>
             <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter course title' />
         </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Category</label>
             <select value={mycategory} onChange={(e)=>setMycategory(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[12px]outline-none'>
                 <option className="text-[14px]" value="">Select category</option>
                 <option className="text-[14px]" value="Web Development">Web development</option>
                 <option className="text-[14px]" value="Graphic Design">Graphic Design</option>
                 <option className="text-[14px]" value="Business Strategy">Business Strategy</option>
                 <option className="text-[14px]" value="Data Science">Data Science</option>
                 <option className="text-[14px]" value="Mobile Development">Mobile Development</option>
                 <option className="text-[14px]" value="Other">Other</option>
             </select>
          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Instructor</label>
             <input type="text" value={instruct} onChange={(e)=>setInstruct(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter Instructor Name' />
          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Course Level</label>
             <select value={courselevel} onChange={(e)=>setCourselevel(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[12px]outline-none'>
                 <option className="text-[14px]" value="">Select Course Level</option>
                 <option className="text-[14px]" value="a">A</option>
                 <option className="text-[14px]" value="b">B</option>
             </select>

          </div>

          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Duration</label>
             <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter Duration' />
             
          </div>
          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Price</label>
             <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none' placeholder='Enter price here' />
             
          </div>
          <div className='flex flex-col px-4 py-3'>
             <label htmlFor="" className='border-1 border-[#E8EDF2] p-1 text-[14px] font-[500]'>Description</label>
            <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full p-1 border-1 border-[#E8EDF2] text-[14px] outline-none h-[100px]' placeholder='Enter Description here'>
            </textarea>
          </div>
        </div>

        <div className='w-full py-2'>
          <div className='w-full'>
            <h2 className='text-[20px] font-[700]'>Upload Course Thumbnil</h2>
          </div>
          <div className='sm:py-6 py-8 flex justify-center items-center'>
            <div onClick={handleImageClick} className='flex flex-col justify-center items-center cursor-pointer'>
              <input type="file" ref={fileInputRef} onChange={(e)=>setMyThumbnil(e.target.files[0])} className='hidden'></input>
              <h3 className='font-[700] text-[18px] text-center'>Drag and drop or browse to upload</h3>
              <p className='font-[400] text-[14]'>Max, file size: 5MB</p>
            </div>
          </div>
            <div className='w-full'>
            <div className='flex gap-1 justify-end'>
            <button type="submit" className='py-1 px-3 cursor-pointer rounded-md text-white bg-[#2E73E3] publish'>Publish</button>
            <button type="button" className='py-1 px-3 rounded-md text-black cursor-pointer bg-[#E8EDF2] save'>Save Draft</button>
           </div>
            </div>
           

        </div>
        </form>)
}

      

        
      </div>
        
      </div>
    </div>
  )
}

export default Formm
