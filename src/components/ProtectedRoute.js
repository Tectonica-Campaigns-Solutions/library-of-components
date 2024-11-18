import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;