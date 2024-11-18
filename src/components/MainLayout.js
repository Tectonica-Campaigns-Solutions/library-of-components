import React from 'react';
import ProtectedLayout from './ProtectedLayout';

const Layout = ({ children, requireAuth = true }) => {
  // If auth is not required, render without protection
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Wrap with ProtectedLayout if auth is required
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;