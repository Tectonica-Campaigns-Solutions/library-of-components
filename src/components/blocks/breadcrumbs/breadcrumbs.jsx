import React from 'react';
import { Link } from 'gatsby';
import separatorIcon from '../../../icons/breadcrumb-separator.svg';

import './styles.scss';

const Breadcrumb = ({ breadcrumb = null, currentPage }) => {
  const renderSeparator = (index = 1) => {
    if (index === 0) return null;

    return (
      <span>
        <img src={separatorIcon} alt="Separator icon" />
      </span>
    );
  };

  return (
    <div className={`breadcrumb d-none d-lg-block`} data-datocms-noindex>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {renderSeparator()}
        </li>

        {breadcrumb && (
          <>
            <li>
              <Link to={breadcrumb}>{breadcrumb.title}</Link>
            </li>
            {renderSeparator()}
          </>
        )}

        <li className="active">{currentPage}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
