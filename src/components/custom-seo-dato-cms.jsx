import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const CustomSeoDatoCMS = ({ seo, favicon = null, children }) => {
  return (
    <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags}>
      {children}
    </HelmetDatoCms>
  );
};

export default CustomSeoDatoCMS;
