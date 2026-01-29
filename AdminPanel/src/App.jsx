import React, { useRef } from 'react'
import Login from './adminLogin/login'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dish from './Dishboard/dish';
import Dishtwo from './Dishboard/dishtwo';
import Mycourse from './courses/mycourse';
import Myform from './formfolder/myform';
import Students from './students/students';



const App = () => {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dish" element={<Dishtwo/>}/>
        <Route path="/mycourse" element={<Mycourse/>}/>
        <Route path="/myform" element={<Myform/>}/>
        <Route path="/student" element={<Students/>}/>
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
