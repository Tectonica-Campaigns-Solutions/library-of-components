import * as React from 'react';
import { graphql } from 'gatsby';
// import Layout from '../components/ProtectedLayout';
import PageBuilder from '../components/builder/page-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';
import TopBar from '../layout/topbar/TopBar';
import ProtectedRoute from '../components/ProtectedRoute';

const Builder = ({data: { homepage, favicon } }) => {
  const { seo, blocks = [] } = homepage;

  const renderPage = () => {
    return (
      <>
        <TopBar 
          bgColor="#C8730F" 
          logo={"Nazca"}
          title="Layout Builder" 
          buttonLabel="PLATE | Components Library" 
          page='builder'
          onButtonClick={() => document.location.href = "/"} 
        />
        <CustomSeoDatoCMS seo={seo} favicon={favicon} />
        <PageBuilder blocks={blocks} />
      </>
    )
  }

  return (
    <ProtectedRoute component={renderPage} />
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