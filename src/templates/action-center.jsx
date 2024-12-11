import React from 'react';
import { graphql } from 'gatsby';
import CustomDatoCMS from '../components/custom-seo-dato-cms';
import BlocksBuilder from '../components/blocks/blocks-builder';
import Header from '../layout/Header';
import ProtectedRoute from '../components/ProtectedRoute';

const Page = ({ pageContext, data: { page, navbar, footer, favicon } }) => {
  const { seo, blocks = [] } = page;

  const renderPage = () => {
    return (
      <>
        <main style={{ overflow: 'hidden' }}>
          <CustomDatoCMS seo={seo} favicon={favicon} />
          <Header />
          <BlocksBuilder blocks={blocks} footer={footer} allVisible={true} />
          <style>{styles}</style>
        </main>
      </>
    )
  }

  return (
    <ProtectedRoute component={renderPage} />
  );  
};

const styles = `
  .ui-narrative-block-component {
    padding: 3rem 0;
  }
  .ui-carousel {
    padding: 3rem 5rem;
  }
  .mega-menu {
    top: 72px;
  }
`;

export default Page;

export const PageQuery = graphql`
  query PageById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    navbar: allDatoCmsMenuItem(filter: { root: { eq: true } }, sort: { position: ASC }) {
      nodes {
        title
        path {
          ... on DatoCmsBasicPage {
            id
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsHomepage {
            id
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
    page: datoCmsBasicPage(id: { eq: $id }) {
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        # ...MainNavigation
        ...HeroBasic
        ...HeroHome
        ...BlockNarrativeBlock
        ... on DatoCmsFooter {
          __typename
          internalName
        }
        ...BlockSlider
        ...BlockNarrativeBlockAdvanced
      }
    }
    footer: datoCmsFooterCopy1 {
      copyright
      logo {
        url
        alt
        width
        height
        gatsbyImageData
      }
      socialLinks {
        ... on DatoCmsSocialLink {
          id
          url
          socialNetwork
        }
      }
      columns {
        ... on DatoCmsMenuColumn {
          id
          label
          content
          links {
            ... on DatoCmsGlobalLink {
              id
              title
              externalUrl
              path {
                ... on DatoCmsBasicPage {
                  id
                  slug
                  model {
                    apiKey
                  }
                }
              }
            }
          }
        }
      }
      legalLinksAndExtras {
        ... on DatoCmsGlobalLink {
          id
          title
          externalUrl
          path {
            ... on DatoCmsHomepage {
              id
              slug
              model {
                apiKey
              }
            }
          }
        }
      }
    }
  }
`;
