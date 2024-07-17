import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { checkTokenExpiration } from './utils/checkTokenUtils';

const ProtectedRoute = ({ element }) => {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCheck = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user || checkTokenExpiration()) {
        e.preventDefault();
   
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
      }
    };

    handleAuthCheck();

    const intervalId = setInterval(handleAuthCheck, 10 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, [navigate, setIsLoggedIn, setUser]);

  return element;
};

export default ProtectedRoute;
