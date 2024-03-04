import React from 'react';
import { Link } from 'gatsby';

const Sidebar = ({ links = [] }) => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          {links.map((link, index) => {
            return (
              <li className="nav-item" key={`${link.to}-${index}`}>
                <Link className="nav-link" to={link.to} activeClassName="active">
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
