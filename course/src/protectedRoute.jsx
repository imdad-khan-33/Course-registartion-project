import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center bg-[#ccf2ff]'>
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;











