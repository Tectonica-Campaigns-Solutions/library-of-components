import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state as null to prevent flash of content
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check authentication status after component mounts
    // This prevents SSR issues with window/localStorage
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const login = (username, password) => {
    // Replace these with your desired credentials
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = 'password123';

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  // Show nothing while checking authentication status
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};