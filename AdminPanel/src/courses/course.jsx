import React, { useEffect, useState } from 'react'
import { adminLocalHost } from '../adminlocalhost';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Course = ({presendSidebar, myBarRef, editItem}) => {


    const myAdmintoken = localStorage.getItem("adminToken");
    const getUrl = `${adminLocalHost}/api/courses/admin/all`;


    useEffect(()=>{
         axios.get(getUrl, {
            headers: {
                Authorization: `Bearer ${myAdmintoken}`,
              },
         })
            .then((res)=>{
                console.log(res.data);
                console.log(res.data.data.courses);
                localStorage.setItem("myAllCourses", JSON.stringify(res.data.data.courses));
            })
    },[]);


    

    const [arr, setArr] = useState([]);

    useEffect(()=>{
      const myCourses = JSON.parse(localStorage.getItem("myAllCourses"));
      setArr(myCourses);
    },[])


    

    const removeItem = (id) => {
      console.log("This is course id",id);
      const holedltUrl = `${adminLocalHost}/api/courses/admin/delete/${id}`;

      axios.delete(holedltUrl, {
        headers:{
          Authorization:`Bearer ${myAdmintoken}`,
        }
      })
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })

      window.location.reload();
    }

  return (
    <div className='relative px-4 pt-2 pb-6 w-full'>
       <div className='absolute top-2 left-2 md:hidden block' ref={myBarRef}>
       <i className="fa-sharp fa-solid fa-bars text-2xl" onClick={presendSidebar} ></i>
      </div>

      <div className='py-1 w-full sm:px-5 px-1'>
      <div className='flex justify-between py-3 sm:mt-0 mt-3'>
      <h1 className='font-[700] text-[32px] text-[#0D121C]'>Courses</h1>
      <p className='font-[500] text-[14px] text-[#0D121C] bg-[#E8EDF2] px-2 h-[35px] flex justify-center items-center rounded-[6px] sm:mt-0 mt-1'>+ Add New Course</p>
      </div>
      
      <div className='py-6 sm:px-0 px-3 sm:w-[92%] w-[97%] m-left flex justify-center items-center'>

        <div className='overflow-x-auto w-full'>
             {/* <table className='min-w-[700px] w-full'> */}
             <table className=' w-full'>
            <thead>
                <th className='border border-0 px-2'>Thumbnail</th>
                <th className='border border-0 px-2'>Title</th>
                <th className='border border-0 px-2'>Category</th>
                <th className='border border-0 px-2'>Instructor</th>
                <th className='border border-0 px-2'>Price</th>
                <th className='border border-0 px-2'>Status</th>
                <th className='border border-0 px-2'>Actions</th>
            </thead>

            {
              arr.map((item)=>{
                return(
                  <tr className='mt-3 w-full'>
                  <td className='border border-0 mt-2 py-2 flex justify-center items-center'>
                      <img src={item.image} className='w-8 h-8 rounded-full ' alt="" />
                  </td>
                  <td className='border border-0 text-[14px] font-[400] text-[#0D121C] px-2 text-center'>{item.title}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.category}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.instructor}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>${item.price}</td>
                  <td className='border border-0 w-[40px]'><span className='text-[14px] font-[500] text-[#0D121C] w-full px-2 text-center bg-[#E8EDF2] px-2 h-[40px]'>{item.isActive === true ? "Active":"NotActive"}</span></td>
                  <td className='border border-0 text-[14px] font-[700] text-[#4F6B96] px-2 text-center'><Link to="/myform"><button type="button" className='cursor-pointer' onClick={()=>editItem(item._id)}>Edit</button></Link>, <button type="button" className="cursor-pointer" onClick={()=>removeItem(item._id)}>Delete</button>, View</td>
              </tr>
                )
              })
             
            }
            
           </table>

        </div>
           
      </div>



      </div>

    </div>
  )
}

export default Course
