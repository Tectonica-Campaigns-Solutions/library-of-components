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
    url: '',
  };

  return <Nav logo={logo} location={{}} navData={menus.mainMenu} />;
};

export default Header;
