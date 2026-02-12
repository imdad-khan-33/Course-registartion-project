import React from 'react'
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import Nav from './navbar/nav';
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
import Logged from './account/loggedIn';
import Signed from './account/signedUp';
import NavCourse from './courses/NavCourse';
import Course from './courses/course';
import Learn from './courses/learn';
import MyLearning from './courses/mylearning';
<<<<<<< HEAD
import { ToastProvider, AuthProvider } from './context';
import { ProtectedRoute } from './components';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Logged />} />
            <Route path="/signUp" element={<Signed />} />
            <Route path="/myCourse" element={
              <ProtectedRoute>
                <NavCourse />
              </ProtectedRoute>
            }>
              <Route index element={<Course />} />
              <Route path="learn" element={<Learn />} />
              <Route path="mylearn" element={<MyLearning />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
=======
import ProtectedRoute from './protectedRoute';
import Navbar from './navbar/nav2';
import NavigationBar from './navbar/navigationBar';


const ProtectedWithNavbar = () => (
  <>
    <NavigationBar />
    <Outlet />
  </>
);


const App = () => {
  return (
    <div>
     <Router>
 
      <Routes>
      <Route path="/" element={<Navigate to="/myCourse" />} />

        <Route path="/login" element ={<Logged/>}/>
        <Route path="/signUp" element ={<Signed/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route element={<ProtectedWithNavbar/>}>
  
        <Route path="/myCourse" element ={<NavCourse/>}>
        
          <Route index element={<Course/>}/>
          <Route path="learn" element={<Learn/>}/>
          <Route path="mylearn" element={<MyLearning/>}/>
        </Route>
        </Route>
        </Route>
      </Routes>
     </Router>
    </div>
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
  )
}

export default App
