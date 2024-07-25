import * as React from 'react';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { Header as HeaderUI } from 'tectonica-ui';

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

  return <HeaderUI logo={logo} location={{}} menu={menus.mainMenu} />;
};

export default Header;
