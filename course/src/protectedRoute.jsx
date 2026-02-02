import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const mytoken = localStorage.getItem("token");
    console.log("my protected token", mytoken);
    return mytoken ? <Outlet /> : <Navigate to="/login"/>;
}

export default ProtectedRoute
