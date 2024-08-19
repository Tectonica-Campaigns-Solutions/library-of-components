import React from 'react';
import Sidebar from '../sidebar/sidebar';

import './index.scss';

const Dashboard = ({ sidebarLinks = [], extraLinks = [], activeItem, setActiveItem, children }) => {
  return (
    <div className="app-dashboard">
      <Sidebar links={sidebarLinks} extraLinks={extraLinks} activeItem={activeItem} setActiveItem={setActiveItem} />
      <main>{children}</main>
    </div>
  );
};

export default Dashboard;
