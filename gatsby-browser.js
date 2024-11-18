import React from 'react';
import { initConfig } from './src/config';
import { AuthProvider } from './src/context/AuthContext';
require('./src/styles/global.scss');
require('./node_modules/bootstrap/dist/css/bootstrap.min.css');


export const onClientEntry = () => {
  initConfig();
}

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
);