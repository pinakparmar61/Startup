import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

// If you don't have an AuthContext, you can use this simpler version:
/*
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
*/
