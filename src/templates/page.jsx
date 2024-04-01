import React from 'react';
import { graphql } from 'gatsby';
import CustomDatoCMS from '../components/custom-seo-dato-cms';
import BlocksBuilder from '../components/blocks/blocks-builder';
import Dashboard from '../layout/dashboard/dashboard';

const Page = ({ pageContext, data: { post, favicon } }) => {
  const { seo, title, blocks = [] } = post;

  return (
    <main>
      <CustomDatoCMS seo={seo} favicon={favicon} />
      <Dashboard pageTitle={title} sidebarLinks={[]}>
        <div className="px-4">
          <BlocksBuilder blocks={blocks} />
        </div>
      </Dashboard>
    </main>
  );
};

export default Page;

export const PageQuery = graphql`
  query PageById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsBasicPage(id: { eq: $id }) {
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ... on DatoCmsNavbar {
          __typename
        }
      }
    }
  }
`;
