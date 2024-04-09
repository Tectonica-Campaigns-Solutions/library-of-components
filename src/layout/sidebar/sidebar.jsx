import React from 'react';
import { Link } from 'gatsby';
import { ReactSVG } from 'react-svg';

import './index.scss';

const Sidebar = ({ links = [], extraLinks = [], activeItem, setActiveItem }) => {
  return (
    <nav className="app-sidebar col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-fixed pt-3 sidebar-fixed">
        <ul className="app-nav">
          <Link to="/" className="logo">
            Library of Component
          </Link>

          {links.map((link, index) => {
            return (
              <li
                className={`nav-item ${activeItem === index ? 'active' : ''}`}
                key={`${link.to}-${index}`}
                onClick={() => setActiveItem(index)}
              >
                <ReactSVG src={link.icon} />
                {link.label}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
