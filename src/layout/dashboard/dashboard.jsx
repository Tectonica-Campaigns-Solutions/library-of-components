import React from 'react';
import Sidebar from '../sidebar/sidebar';

import './index.scss';

const Dashboard = ({ pageTitle, sidebarLinks = [], extraLinks = [], activeItem, setActiveItem, children }) => {
  return (
    <div className="app-dashboard container-fluid" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="row" style={{ minHeight: 'inherit' }}>
        <Sidebar links={sidebarLinks} extraLinks={extraLinks} activeItem={activeItem} setActiveItem={setActiveItem} />

        <main className="col-md-9 ms-sm-auto col-lg-10 p-0 m-0 mt-5">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
