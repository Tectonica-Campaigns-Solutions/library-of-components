import * as React from 'react';
import { AuthProvider } from './src/context/AuthContext';

// Example of preload fonts
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />,
  ]);
};

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
);