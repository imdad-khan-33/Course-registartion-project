import React, { useRef, useState } from 'react'

const Student = ({presendSidebar, myBarRef}) => {

    const [myArr, setMyArr] = useState([
        {
            sName : "Sophia",
            sImg  : "/students/sophya.png",
            sEmail : "sophia.clark@gmail.com",
            sCourse : "Web development",
            Edate : "2025-08-15",
            status : "Active"
        },
        {
            sName : "Liam",
            sImg  : "/students/olivia.png",
            sEmail : "liam.walker@gmail.com",
            sCourse : "Data Science Fundamental",
            Edate : "2023-09-01",
            status : "Completed"
        },
        {
            sName : "Olivia",
            sImg  : "/students/liam.png",
            sEmail : "olivia.devis@gmail.com",
            sCourse : "Web development Basics",
            Edate : "2023-07-20",
            status : "Active"
        },
        {
            sName : "Noah",
            sImg  : "/students/noah.png",
            sEmail : "noad.roadrigue@gmail.com",
            sCourse : "Machine Learning Essential",
            Edate : "2023-08-22",
            status : "Active"
        },
        {
            sName : "Emma",
            sImg  : "/students/emma.png",
            sEmail : "emma.wilson@gmail.com",
            sCourse : "Mobile App Development",
            Edate : "2023-09-10",
            status : "Completed"
        },
        {
            sName : "Ethan",
            sImg  : "/students/ethan.png",
            sEmail : "ethan.garcia@gmail.com",
            sCourse : "Cloud Computing Fundamentals",
            Edate : "2023-07-05",
            status : "Active"
        },
        {
            sName : "Olivia",
            sImg  : "/students/liam.png",
            sEmail : "olivia.devis@gmail.com",
            sCourse : "Cyber Security Basics",
            Edate : "2023-07-20",
            status : "Active"
        },
        {
            sName : "Evva",
            sImg  : "/students/eva.png",
            sEmail : "eva.martinz@gmail.com",
            sCourse : "Digital Marketing Strategies",
            Edate : "2023-09-15",
            status : "Completed"
        }
    ])
  return (
    <div className='relative px-4  pb-6 w-full'>
      <div className='absolute top-2 left-2 md:hidden block' ref={myBarRef}>
       <i className="fa-sharp fa-solid fa-bars text-2xl" onClick={presendSidebar} ></i>
      </div>

      <div className='py-3 w-full pr-10'>
      <h1 className='py-3 sm:pt-0 pt-6 text-[25px] font-[700] text-[#0D121C]'>Students & Enrollements</h1>

      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>

        <div className='w-full p-2 flex md:gap-2 sm:gap-3 gap-4 justify-center items-center rounded-[8px] bg-[#E8EDF2]'>
         <i class="fa-solid fa-magnifying-glass md:w-[3%] sm:w-[5%] w-[7%]"></i>
         <input type="text" placeholder="Search for courses, skills or topics" className='md:w-[96%] sm:w-[94%] w-[92%] h-full text-[13px] sm:text-[16px] outline-none'/>
         </div>

            <select name="" id="" className='w-55 py-2 bg-[#E8EDF2] px-3 outline-none'>
                <option value="">All Courses</option>
                <option value="web">Web development</option>
                <option value="Artificial">Artificial Intelligance</option>
                <option value="data">Data Science</option>
            </select>
        </div>

        <div className='my-5 py-4 sm:w-[90%] w-[100%] m-auto flex justify-center items-center border border-1 border-[#D1D9E5] rounded-md'>
        <div className='overflow-x-auto w-full'>
             {/* <table className='min-w-[700px] w-full'> */}
             <table className=' w-full'>
            <thead className='border-b border-[#D1D9E5] pb-2 w-full sm:px-8 px-3'>
                <th className='border border-0 px-2'>Student Name</th>
                <th className='border border-0 px-2'>Image</th>
                <th className='border border-0 px-2'>Email</th>
                <th className='border border-0 px-2'>Enrolled Course</th>
                <th className='border border-0 px-2'>Enrollement Date</th>
                <th className='border border-0 px-2'>Status</th>
                
            </thead>

            {
              myArr.map((item)=>{
                return(
                  <tr className='mt-3 w-full border-b border-[#D1D9E5] pb-2 sm:px-8 px-3'>
                  <td className='border border-0 text-[14px] font-[400] text-[#0D121C] px-2 text-center'>{item.sName}</td>
                  <td className='border border-0 mt-2 py-2 flex justify-center items-center'>
                      <img src={item.sImg} className='w-8 h-8 rounded-full ' alt="" />
                  </td>
                  <td className='border border-0 text-[14px] font-[400] text-[#0D121C] px-2 text-center'>{item.sEmail}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.sCourse}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.Edate}</td>
                  <td className='border border-0 '><span className='text-[14px] font-[500] text-[#0D121C] w-[60px] px-2 py-1 rounded-md text-center bg-[#E8EDF2] px-2 h-[40px]'>{item.status}</span></td>
              </tr>
                )
              })
             
            }
            
           </table>

        </div>
        </div>

        <div className='m-auto flex gap-2'>
            <img src="/leftarrow.png" className='w-3 h-3 mt-4' alt="" />
            <p className='w-10 h-10 flex justify-center items-center bg-[#E8EDF2] rounded-full'>1</p>
            <p className='w-10 h-10 flex justify-center items-center rounded-full'>2</p>
            <p className='w-10 h-10 flex justify-center items-center rounded-full'>3</p>
            <p className='w-10 h-10 flex justify-center items-center rounded-full'>4</p>
            <p className='w-10 h-10 flex justify-center items-center rounded-full'>5</p>
            <img src="/rightarrow.png" className='w-3 h-3 mt-4' alt="" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Student
