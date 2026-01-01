import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

function ProtectedRoute({ children }) {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    
    }
    return children;
}

export default ProtectedRoute;
