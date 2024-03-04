import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    title
  }
`;
