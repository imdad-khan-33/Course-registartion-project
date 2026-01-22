import React from 'react'
import "./course.css";
const Learn = () => {
  return (
    <div className='pt-28 pb-15 md:px-15 px-7 w-full bg-[#e6f2ff]'>
      <div className='w-full flex md:flex-row flex-col md:justify-between md:gap-0 gap-8 justify-center'>
          <div className='md:w-[73%] w-full flex gap-6 flex-col'>
          <h1 className='text-[36px] font-[500]'>Introduction to Web Development</h1>

          <div className='bg-white md:px-10 px-5 py-4 flex flex-col gap-6 rounded-lg'>
          <div className='p-4 flex md:flex-row flex-col  gap-4 w-full'>
            <div className='w-32 h-32 rounded-full'>
              <img src="/coursesimg/webFace.png"  className="w-full h-full rounded-full" alt="" />
            </div>
            <div className='flex flex-col gap-1 justify-center'>
              <h3 className='text-[22px] font-[700]'>Dr. Evelyn Reed</h3>
              <p  className='text-[16px] font-[400] text-[#61758A]'>Data Science Professor at Tech Institute</p>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-[22px] font-[700]'>About this course</h2>
            <p className='text-[16px] font-[400]'>
            This course delves into advanced data science techniques, covering topics such as deep learning, natural language processing, and time series analysis. Students will gain hands-on experience through projects and case studies, preparing them for real-world challenges in the field.
            </p>
          </div>

          <div>
            <h3 className='text-[22px] font-[700] pb-4'>Syllabus</h3>
            <div className='flex flex-col gap-3'>
              <div>
                <h4 className='text-[16px] font-[500]'>Introduction to Deep Learning</h4>
                <p className='text-[14px] font-[400] text-[#61758A]'>Week 1</p>
              </div>
              <div>
                <h4 className='text-[16px] font-[500]'>Natural Language Processing Fundamentals</h4>
                <p className='text-[14px] font-[400] text-[#61758A]'>Week 2</p>
              </div>
              <div>
                <h4 className='text-[16px] font-[500]'>Time Series Analysis and Forecasting</h4>
                <p className='text-[14px] font-[400] text-[#61758A]'>Week 3</p>
              </div>
              <div>
                <h4 className='text-[16px] font-[500]'>Advanced Machine Learning Models</h4>
                <p className='text-[14px] font-[400] text-[#61758A]'>Week 4</p>
              </div>
              <div>
                <h4 className='text-[16px] font-[500]'>Project Presentations and Review</h4>
                <p className='text-[14px] font-[400] text-[#61758A]'>Week 5</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-[22px] font-[700]'>Requirements</h3>
            <p className='text-[16px] font-[400]'>
            Students should have a basic understanding of data science concepts and programming skills in Python. Familiarity with machine learning algorithms is recommended but not required.
            </p>
          </div>

          </div>
          
          
          </div>
          <div className='md:w-[22%] w-full pt-19'>
            <div className='px-3 w-full py-6 flex flex-col items-center gap-7 rounded-md bg-white'>
              <table className=' w-[80%]'>
                <tr>
                  <td className='border border-0 text-[14px] font-[400] text-[#61758A]'>Total Hours</td>
                  <td className='border border-0 text-[14px] font-[400]'>40 hours</td>
                </tr>
                <tr>
                  <td className='border border-0 text-[14px] font-[400] text-[#61758A]'>Students Enrolled</td>
                  <td className='border border-0 text-[14px] font-[400]'>150</td>
                </tr>
                <tr>
                  <td className='border border-0 text-[14px] font-[400] text-[#61758A]'>Skill Level</td>
                  <td className='border border-0 text-[14px] font-[400]'>Advanced</td>
                </tr>
                <tr>
                  <td className='border border-0 text-[14px] font-[400] text-[#61758A]'>Price</td>
                  <td className='border border-0 text-[14px] font-[400]'>$499</td>
                </tr>
              </table>
              <button className='w-full py-2 text-[14px] rounded-[8px] font-[700] bg-[#1280ED] text-white border-0 oulitne-none tabel'>Enroll Now</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Learn
