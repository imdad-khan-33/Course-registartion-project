import React from 'react'
import Login from './adminLogin/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dish from './Dishboard/dish';
import Mycourse from './courses/mycourse';
import Myform from './formfolder/myform';
import Students from './students/students';
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
  )
}

export default App
