import * as React from 'react';
import { graphql } from 'gatsby';
import Dashboard from '../layout/dashboard/dashboard';
import BlocksBuilder from '../components/blocks/blocks-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';

const IndexPage = ({ data: { homepage, favicon } }) => {
  const { title, seo, blocks = [] } = homepage;

  return (
    <>
      <CustomSeoDatoCMS seo={seo} favicon={favicon} />

      <Dashboard pageTitle={title}>
        <BlocksBuilder blocks={blocks} />
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
  }
`;
