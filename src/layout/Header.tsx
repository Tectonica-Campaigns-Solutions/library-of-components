import * as React from 'react';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { Nav } from 'tectonica-ui';

const Header = () => {
  const menus = useStaticQuery(graphql`
    query {
      mainMenu: allDatoCmsMenuItem(filter: { root: { eq: true } }, sort: { position: ASC }) {
        nodes {
          ...MainNavigation
        }
      }
    }
  `);

  const logo = {
    id: '1',
    url: 'https://www.datocms-assets.com/120090/1711043456-logo.png?auto=format',
  };

  return <Nav logo={logo} location={{}} navData={menus.mainMenu} />;
};

export default Header;
