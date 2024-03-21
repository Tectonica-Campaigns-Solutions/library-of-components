import * as React from 'react';
import { graphql } from 'gatsby';
import Dashboard from '../layout/dashboard/dashboard';
import BlocksBuilder from '../components/blocks/blocks-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';
import { getSidebarLinksFromBlocks } from '../utils/dato.utils';
import Footer from '../layout/footer/footer';
import ListPaginated from '../components/blocks/pagination/list-paginated';
import Breadcrumb from '../components/blocks/breadcrumbs/breadcrumbs';

const IndexPage = ({ data: { homepage, footer, favicon } }) => {
  const { title, seo, blocks = [] } = homepage;
  const sidebarLinks = getSidebarLinksFromBlocks(blocks);

  return (
    <>
      <CustomSeoDatoCMS seo={seo} favicon={favicon} />

      <Dashboard pageTitle={title} sidebarLinks={sidebarLinks}>
        <div className="px-4">
          <BlocksBuilder blocks={blocks} />

          <ListPaginated
            list={[1, 2, 3, 4, 5, 6]}
            customPageSize={3}
            renderItem={(item) => (
              <div
                style={{
                  display: 'inline-block',
                  width: '250px',
                  height: '300px',
                  backgroundColor: '#333',
                  color: '#FFF',
                  padding: '20px',
                  marginRight: '1rem',
                }}
              >
                Element {item}
              </div>
            )}
          />

          <Breadcrumb currentPage={title} />
        </div>

        <Footer data={footer} />
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
    homepage: datoCmsHomepage {
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ...BlockNarrativeBlock
        ...BlockAccordionBlock
        ...BlockDivider
        ...BlockSectionTitle
        ...BlockCta
        ...BlockCardGrid
        ...BlockTabs
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
