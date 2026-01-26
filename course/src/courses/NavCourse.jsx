import React from 'react'
import Course from './course'
import NavigationBar from '../navbar/navigationBar'
import Learn from './learn'
import { Outlet } from 'react-router-dom'



const NavCourse = () => {
  return (
    <div>
      <NavigationBar/>
      {/* <div className='overflow-x-hidden'> */}
      <div>
      <Outlet/>
      </div>
    </div>
  )
}

export default NavCourse
