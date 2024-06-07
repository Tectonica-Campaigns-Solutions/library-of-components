import * as React from 'react';
import { graphql } from 'gatsby';
import Dashboard from '../layout/dashboard/dashboard';
import BlocksBuilder from '../components/blocks/blocks-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';
import { getSidebarLinksFromBlocks } from '../utils/dato.utils';

const IndexPage = ({ data: { homepage, navbar, footer, favicon } }) => {
  const { title, seo, blocks = [] } = homepage;
  const sidebarLinks = getSidebarLinksFromBlocks(blocks);

  console.log({ sidebarLinks });

  const [activeItem, setActiveItem] = React.useState(0);

  return (
    <>
      <CustomSeoDatoCMS seo={seo} favicon={favicon} />

      <Dashboard
        pageTitle={title}
        sidebarLinks={sidebarLinks}
        extraLinks={navbar.nodes}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      >
        <div className="px-4">
          <BlocksBuilder blocks={blocks} footer={footer} activeItem={activeItem} />
        </div>
      </Dashboard>
    </>
  );
};

export default IndexPage;

export const HomepageQuery = graphql`
  query Homepage {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    navbar: allDatoCmsMenuItem(filter: { root: { eq: true } }, sort: { position: ASC }) {
      nodes {
        title
        content {
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
    homepage: datoCmsHomepage {
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ...HeroHome
        ...HeroBasic
        ...BlockNarrativeBlock
        ...BlockAccordionBlock
        ...BlockDivider
        ...BlockSectionTitle
        ...BlockCta
        ...BlockCardGrid
        ...BlockTabs
        ...BlockBreadcrumb
        ...BlockCtaGrid
        ...BlockNotification
        ...BlockHubspotForm
        ... on DatoCmsHeader {
          __typename
          internalName
        }
        ... on DatoCmsFooter {
          __typename
          internalName
        }
        ... on DatoCmsListPaginated {
          __typename
          internalName
        }
        ... on DatoCmsForm {
          __typename
          internalName
        }
        ...BlockSlider
        ...BlockSocialShare
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
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
        }
      }
      legalLinksAndExtras {
        ... on DatoCmsGlobalLink {
          id
          label
          externalUrl
          content {
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
