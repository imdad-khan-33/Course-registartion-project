import React from 'react'

const MyLearning = () => {
  return (
    <div className='pt-25 pb-15 w-full md:px-15 px-10 bg-[#e6f2ff]'>
      <div className='w-full flex flex-col gap-5'>
        <h1 className='text-[36px] font-[500]'>My Learning</h1>
        <div className='w-full flex gap-2 px-2'>
          <p className='text-[14px] font-[700]'>Enrolled</p>
          <p className='text-[14px] text-[#61758A]'>Wishlist</p>
        </div>

        <div className='w-full flex flex-col md:gap-4 gap-9 px-4'>
          <div className='flex flex-col md:gap-4 gap-4'>
            <h3 className='w-full text-[20px] font-[700]'>In progress</h3>

            <div className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h4 className='text-[14px] font-[700]'>Intrduction to Data Science</h4>
                  <p className='text-[14px] text-[#61758A]'>Next up: Module 2 - Data Collection</p>
                </div>
                <p className='pl-4 text-[12px] font-[700] p-1 bg-white w-33'>Resume Learning</p>
              </div>
              <div>
                <img src="/coursesimg/DataScience.png" className='w-[315px]' alt="" />
              </div>
            </div>

            <div className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h4 className='text-[14px] font-[700]'>Advanced Python Programming</h4>
                  <p className='text-[14px] text-[#61758A]'>Next up: Module 4 - Object-Oriented Programming</p>
                </div>
                <p className='pl-4 text-[12px] font-[700] p-1 bg-white w-33'>Resume Learning</p>
              </div>
              <div>
                <img src="/coursesimg/python.png" className='w-[315px]' alt="" />
              </div>
            </div>


          </div>

          <div className='flex flex-col md:gap-4 gap-4'>
            <h3 className='w-full text-[20px] font-[700]'>Completed</h3>

            <div className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h4 className='text-[14px] font-[700]'>Machine Learning Fundamentals</h4>
                  <p className='text-[14px] text-[#61758A]'>Completed on July 15, 2024</p>
                </div>
                <p className='pl-4 text-[12px] font-[700] p-1 bg-white w-33'>View Certificate</p>
              </div>
              <div>
                <img src="/coursesimg/machine.png" className='w-[315px]' alt="" />
              </div>
            </div>

            <div className='w-full flex md:justify-between justify-center md:flex-row flex-col md:gap-0 gap-3'>
              <div className='flex flex-col gap-3'>
                <div>
                  <h4 className='text-[14px] font-[700]'>Web Development with React</h4>
                  <p className='text-[14px] text-[#61758A]'>Completed on June 20, 2024</p>
                </div>
                <p className='pl-4 text-[12px] font-[700] p-1 bg-white w-33'>View Certificate</p>
              </div>
              <div>
                <img src="/coursesimg/webDev.png" className='w-[315px]' alt="" />
              </div>
            </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default MyLearning
