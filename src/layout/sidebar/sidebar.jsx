import React from 'react';
import { ReactSVG } from 'react-svg';

import './index.scss';

const Sidebar = ({ links = [], activeItem, setActiveItem }) => {
  return (
    <nav className="app-sidebar d-md-block bg-light sidebar collapse">
      <div className="pt-3 sidebar-fixed">
        <ul className="app-nav">
          <span className="logo" onClick={() => setActiveItem(-1)}>
            Library of Components
          </span>

          {links.map((link, index) => {
            if (link.wrapper) {
              return <span className="wrapper-label">{link.label}</span>;
            }

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
