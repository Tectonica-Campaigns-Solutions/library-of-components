import React from 'react';
import Sidebar from '../sidebar/sidebar';

const Dashboard = ({ pageTitle, sidebarLinks = [], children }) => {
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row h-100">
        <Sidebar links={sidebarLinks} />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            {pageTitle && <h1 className="h2">{pageTitle}</h1>}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
