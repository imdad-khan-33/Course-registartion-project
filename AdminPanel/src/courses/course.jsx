import React, { useState } from 'react'

const Course = ({presendSidebar, myBarRef}) => {

    const [arr, setArr] = useState([
      {
        thumbnail : "/courseimg/web.png",
        title : "Introduction to Programming",
        category : "Technology",
        instructor : "Alex Turnder",
        price : "$49",
        status : "Published",
        Actions : "Edit, delete, View"
     },
        {
           thumbnail : "/courseimg/digital.png",
           title : "Digital Marketing Fundamental",
           category : "Marketing",
           instructor : "Sophia Clark",
           price : "$79",
           status : "Published",
           Actions : "Edit, delete, View"
        },
        {
          thumbnail : "/courseimg/analysis.png",
          title : "Advanced Data Analysis",
          category : "Data Science",
          instructor : "Ethan Benneth",
          price : "$99",
          status : "Published",
          Actions : "Edit, delete, View"
       },
       {
        thumbnail : "/courseimg/workshop.png",
        title : "Creative writing Workshop",
        category : "Arts & Humanities",
        instructor : "Olivia Hayes",
        price : "$59",
        status : "Draft",
        Actions : "Edit, delete, View"
     },
     {
      thumbnail : "/courseimg/business.png",
      title : "Business Strategy Essentials",
      category : "Business",
      instructor : "Liom Faster",
      price : "$69",
      status : "Published",
      Actions : "Edit, delete, View"
   }
    ]);

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
      
      <div className='py-3 sm:px-8 px-3 sm:w-[90%] w-[97%] m-auto flex justify-center items-center'>

        <div className='overflow-x-auto'>
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
                      <img src={item.thumbnail} className='w-8 h-8 rounded-full ' alt="" />
                  </td>
                  <td className='border border-0 text-[14px] font-[400] text-[#0D121C] px-2 text-center'>{item.title}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.category}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.instructor}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.price}</td>
                  <td className='border border-0 w-[40px]'><span className='text-[14px] font-[500] text-[#0D121C] w-full px-2 text-center bg-[#E8EDF2] px-2 h-[40px]'>{item.status}</span></td>
                  <td className='border border-0 text-[14px] font-[700] text-[#4F6B96] px-2 text-center'>{item.Actions}</td>
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
