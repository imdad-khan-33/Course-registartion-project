import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import Nav from './navbar/nav';
import Logged from './account/loggedIn';
import Signed from './account/signedUp';
import NavCourse from './courses/NavCourse';
import Course from './courses/course';
import Learn from './courses/learn';
import MyLearning from './courses/mylearning';
import ProtectedRoute from './protectedRoute';
import Navbar from './navbar/nav2';
import NavigationBar from './navbar/navigationBar';
import { AuthProvider, ToastProvider } from './context';


const ProtectedWithNavbar = () => (
  <>
    <NavigationBar />
    <Outlet />
  </>
);


const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/myCourse" />} />
            <Route path="/login" element={<Logged />} />
            <Route path="/signUp" element={<Signed />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedWithNavbar />}>
                <Route path="/myCourse" element={<NavCourse />}>
                  <Route index element={<Course />} />
                  <Route path="learn/:id" element={<Learn />} />
                  <Route path="mylearn" element={<MyLearning />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App











