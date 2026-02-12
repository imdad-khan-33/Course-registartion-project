import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


const ProtectedRoute = ({children}) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <div className='min-h-screen bg-slate-900 flex justify-center items-center'>
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;











