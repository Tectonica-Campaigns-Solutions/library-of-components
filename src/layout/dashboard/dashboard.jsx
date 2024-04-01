import React from 'react';
import Sidebar from '../sidebar/sidebar';
import { Link } from 'gatsby';

const Dashboard = ({ pageTitle, sidebarLinks = [], children }) => {
  return (
    <>
      <header class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">
          Tectonica
        </Link>
      </header>

      <div className="container-fluid pt-4" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
        <div className="row" style={{ minHeight: 'inherit' }}>
          <Sidebar links={sidebarLinks} />

          <main className="col-md-9 ms-sm-auto col-lg-10 p-0 m-0">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom px-4">
              {pageTitle && <h1 className="h2">{pageTitle}</h1>}
            </div>

            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
