import { Link } from 'gatsby';
import React from 'react';

import './styles.scss';

const Footer = ({ data }) => {
  const { copyright, logo, columns = [], legalLinksAndExtras = [] } = data;

  return (
    <footer className="app-footer">
      <div className="">
        {/* First row */}
        {logo && (
          <div className="first-row">
            <div>
              <Link to={'/'}>
                <img className="logo" src={logo?.url} alt={logo.alt} />
              </Link>
            </div>
          </div>
        )}

        {/* Second row */}
        <div className="row columns-row">
          {/* Columns links items */}
          {columns.map((column) => (
            <div key={column.id} className="col-lg-3 col-6 columns-links">
              <h2>{column.label}</h2>
              <div className="content" dangerouslySetInnerHTML={{ __html: column.content }} />
            </div>
          ))}
        </div>

        <div className="row extra-row">
          <div className="col">
            {/* Extra links */}
            <div className="extra-links">
              {legalLinksAndExtras.map((link) => (
                <Link key={link.id} to={link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {copyright && (
          <div className="copyright">
            <p>{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
