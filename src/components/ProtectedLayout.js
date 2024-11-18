import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

// This component will wrap the entire layout instead of individual pages
const ProtectedLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('redirectUrl', window.location.pathname);
      }
      navigate('/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;