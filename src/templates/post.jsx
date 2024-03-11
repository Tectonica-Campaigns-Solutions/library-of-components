import React from 'react';
import { graphql } from 'gatsby';
import CustomDatoCMS from '../components/custom-seo-dato-cms';
import BlocksBuilder from '../components/blocks/blocks-builder';

const Page = ({ pageContext, data: { post, favicon } }) => {
  const { seo, title, blocks = [] } = post;

  return (
    <main>
      <CustomDatoCMS seo={seo} favicon={favicon} />

      <h1>{title}</h1>
      <BlocksBuilder blocks={blocks} />
    </main>
  );
};

export default Page;

// export const PostQuery = graphql`
//   query PostById($id: String) {
//     favicon: datoCmsSite {
//       faviconMetaTags {
//         ...GatsbyDatoCmsFaviconMetaTags
//       }
//     }
//     post: datoCmsBasicPost(id: { eq: $id }) {
//       title
//       seo: seoMetaTags {
//         ...GatsbyDatoCmsSeoMetaTags
//       }
//       blocks {
//         ... on DatoCmsNarrativeBlock {
//           ...BlockNarrativeBlock
//         }
//       }
//     }
//   }
// `;
