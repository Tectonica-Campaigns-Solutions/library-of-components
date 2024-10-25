import * as React from 'react';
import { graphql } from 'gatsby';
import PageBuilder from '../components/builder/page-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';

const Builder = ({data: { homepage, favicon } }) => {
  const { seo, blocks = [] } = homepage;
    return (
      <>
        <CustomSeoDatoCMS seo={seo} favicon={favicon} />
        <h1>Page Builder</h1>
        <PageBuilder blocks={blocks} />
      </>
    );

};
  
export default Builder;

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
        ...BlockImageGallery
        ...BlockPeopleModal
        ...BlockVideoModal
        ...BlockMapboxWrapper
        ...AudioPlayer
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
        ...BlockNarrativeBlockAdvanced
        ...SidebarWrapper
        ...ParallaxContentSection
        ...SplashPage
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;