import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import './breadcrumbs-styles.scss';

interface Breadcrumb {
    title: string;
    slug: string;
}

const Breadcrumb = ({ breadcrumb = null, currentPage }: { breadcrumb?: Breadcrumb | null, currentPage: string }) => {
  const renderSeparator = (index = 1) => {
    if (index === 0) return null;

    return (
      <span>
        <StaticImage
            src="../../icons/breadcrumb-separator.svg"
            alt="Separator icon"
            placeholder="blurred"
            layout="fixed"
            width={30}
            height={31}
        />
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
              <Link to={breadcrumb.slug}>{breadcrumb.title}</Link>
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