import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from './navbar/nav';
import Logged from './account/loggedIn';
import Signed from './account/signedUp';
import NavCourse from './courses/NavCourse';
import Course from './courses/course';
import Learn from './courses/learn';
import MyLearning from './courses/mylearning';



const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        
        <Route path="/" element ={<Logged/>}/>
        <Route path="/signUp" element ={<Signed/>}/>
        <Route path="/myCourse" element ={<NavCourse/>}>
          <Route index element={<Course/>}/>
          <Route path="learn" element={<Learn/>}/>
          <Route path="mylearn" element={<MyLearning/>}/>
        </Route>

      </Routes>
     </Router>
    </div>
  )
}

export default App
