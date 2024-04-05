import React from 'react';
import { Link } from 'gatsby';
import { ReactSVG } from 'react-svg';

const Sidebar = ({ links = [], extraLinks = [], setActiveItem }) => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-fixed pt-3 sidebar-fixed">
        <ul className="nav flex-column mt-2">
          {links.map((link, index) => {
            return (
              <li className="nav-item" key={`${link.to}-${index}`}>
                <span className="nav-link p-0 py-2 d-flex gap-2" onClick={() => setActiveItem(index)}>
                  <ReactSVG src={link.icon} />
                  {link.label}
                </span>
              </li>
            );
          })}
          <hr />
          {extraLinks.map((link, index) => {
            return (
              <li className="nav-item" key={`${link.to}-${index}`}>
                <Link className="nav-link p-0 py-2 d-flex gap-2" to={`/${link.content?.slug}`}>
                  <ReactSVG src={link.icon} />
                  {link.title}
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
