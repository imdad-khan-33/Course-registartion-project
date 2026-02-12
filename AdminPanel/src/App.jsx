<<<<<<< HEAD
import React from 'react'
import Login from './adminLogin/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import React, { useRef, useState } from 'react'
import Login from './adminLogin/login'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
import Dish from './Dishboard/dish';
import Mycourse from './courses/mycourse';
import Myform from './formfolder/myform';
import Students from './students/students';
<<<<<<< HEAD
import { ToastProvider, AuthProvider } from './context';
import { ProtectedRoute } from './components';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dish" element={
              <ProtectedRoute>
                <Dish />
              </ProtectedRoute>
            } />
            <Route path="/mycourse" element={
              <ProtectedRoute>
                <Mycourse />
              </ProtectedRoute>
            } />
            <Route path="/myform" element={
              <ProtectedRoute>
                <Myform />
              </ProtectedRoute>
            } />
            <Route path="/student" element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
=======
import ProtectedRoute from './protectedRoute';
import { adminLocalHost } from './adminlocalhost';
import axios from 'axios';



const App = () => {



  const [mode, setMode] = useState(false);
  const [idValue, setIdValue] = useState(null);

  const [mytitle, setMyTitle] = useState("");
  const [mydescription, setMyDescription] = useState("");
  const [mycateg, setMycateg] = useState("");
  const [img, setImg] = useState("");
  const [myprice, setMyprice] = useState("");
  const [durationn, setDurationn] = useState("");
  const [instructer, setInstructer] = useState("");
  const [isActive, setIsActive] = useState(null);

   
  const adminToken = localStorage.getItem("adminToken");
  




 const updateData = (e) => {
     e.preventDefault();

     
     const updateFormData = new FormData();

     if(mytitle) updateFormData.append("title", mytitle);
     if(mydescription) updateFormData.append("description", mydescription);
     if(mycateg) updateFormData.append("category", mycateg);
     if(durationn) updateFormData.append("duration", durationn);
     if(myprice) updateFormData.append("price", myprice);
     if(instructer) updateFormData.append("instructor", instructer);
     if(isActive !== null) updateFormData.append("isActive", isActive);
     if(img){
       updateFormData.append("img", img);
     }


     console.log("my status value", isActive);


     const updateUrl = `${adminLocalHost}/api/courses/admin/update/${idValue}`
    
    axios.put(updateUrl, updateFormData, {
      headers:{
        Authorization: `Bearer ${adminToken}`
      }
    })
    .then((res)=>{
      console.log("This is updated form response", res.data);
      res && alert("Course updated successfully!");
  
    })


  // if(mytitle.length < 3 || mytitle.length > 100){
  //   return alert("Title should be between 3 to 100 characters");
  // }else if(mydescription.length < 10){
  //   return alert("Description should be at least 10 characters");
  // }else if(isNaN(myprice)){
  //   return alert("Price should be a valid number");
  // }else{

  //   const updateUrl = `${adminLocalHost}/api/courses/admin/update/${idValue}`
    
  //   axios.put(updateUrl, updateFormData, {
  //     headers:{
  //       Authorization: `Bearer ${adminToken}`
  //     }
  //   })
  //   .then((res)=>{
  //     console.log("This is updated form response", res.data);
  //     res && alert("Course updated successfully!");
  
  //   })

  // }
  
 }

  const updateItem = (itemId) => {
    console.log("my new id", itemId,);
    setIdValue(itemId);
    setMode(true);
 
  }
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Dishtwo/></ProtectedRoute>}/>
        <Route path="/mycourse" element={<ProtectedRoute><Mycourse newItem={updateItem}/></ProtectedRoute>}/>

        <Route path="/myform" element={<ProtectedRoute><Myform mymode={mode} updateFunction={updateData} mytitle={mytitle} setMyTitle={setMyTitle} mydescription={mydescription} setMyDescription={setMyDescription} mycateg={mycateg} setMycateg={setMycateg} img={img} setImg={setImg} myprice={myprice} setMyprice={setMyprice} durationn={durationn} setDurationn={setDurationn} instructer={instructer} setInstructer={setInstructer} myActive={setIsActive} activee={isActive}/></ProtectedRoute>}/>

        <Route path="/student" element={<ProtectedRoute><Students/></ProtectedRoute>}/>
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
  )
}

// mytitle, setMyTitle, mydescription, setMyDescription, mycateg, setMycateg, img, setImg, myprice, setMyprice,
// duratrionn, setDurationn, instructer, setInstructer

export default App
