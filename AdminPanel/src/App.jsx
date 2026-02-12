import React, { useState } from 'react'
import Login from './adminLogin/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dish from './Dishboard/dish';
import Mycourse from './courses/mycourse';
import Myform from './formfolder/myform';
import Students from './students/students';
import { ToastProvider, AuthProvider } from './context';
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
    if(img) updateFormData.append("img", img);

    const updateUrl = `${adminLocalHost}/api/courses/admin/update/${idValue}`
    
    axios.put(updateUrl, updateFormData, {
      headers:{
        Authorization: `Bearer ${adminToken}`
      }
    })
    .then((res)=>{
      // // console.log("This is updated form response", res.data);
      res && alert("Course updated successfully!");
    })
    .catch((err) => {
      console.error("Update error", err);
      alert("Failed to update course");
    });
  }

  const updateItem = (itemId) => {
    setIdValue(itemId);
    setMode(true);
  }
  
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dish /></ProtectedRoute>} />
            <Route path="/mycourse" element={<ProtectedRoute><Mycourse newItem={updateItem} /></ProtectedRoute>} />
            <Route path="/myform" element={
              <ProtectedRoute>
                <Myform 
                  mymode={mode} 
                  updateFunction={updateData} 
                  mytitle={mytitle} 
                  setMyTitle={setMyTitle} 
                  mydescription={mydescription} 
                  setMyDescription={setMyDescription} 
                  mycateg={mycateg} 
                  setMycateg={setMycateg} 
                  img={img} 
                  setImg={setImg} 
                  myprice={myprice} 
                  setMyprice={setMyprice} 
                  durationn={durationn} 
                  setDurationn={setDurationn} 
                  instructer={instructer} 
                  setInstructer={setInstructer} 
                  myActive={setIsActive} 
                  activee={isActive}
                />
              </ProtectedRoute>
            } />
            <Route path="/student" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App











