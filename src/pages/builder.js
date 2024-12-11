import * as React from 'react';
import { graphql } from 'gatsby';
import PageBuilder from '../components/builder/page-builder';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import TopBar from '../layout/topbar/TopBar';
import ProtectedRoute from '../components/ProtectedRoute';
import AppFooter from '../layout/Footer';
import faviconImage from '../icons/favicon-nazca.png';

const Builder = ({data: { homepage, favicon } }) => {
  const { seo, blocks = [] } = homepage;

  const renderPage = () => {
    console.log('favicon', favicon);
    return (
      <>
        <HelmetDatoCms>
          <link rel="icon" href={faviconImage} type="image/png" />
        </HelmetDatoCms>
        <TopBar 
          bgColor="#FF5A00" 
          logo={"Nazca"}
          title="Layout Builder" 
          buttonLabel="PLATE | Components Library" 
          page='builder'
          onButtonClick={() => document.location.href = "/"} 
        />
        {/* <CustomSeoDatoCMS seo={seo} /> */}
        <PageBuilder blocks={blocks} />
        <AppFooter 
          page='builder'
          buttonLabel='Try Plate Components Library'
          onButtonClick={() => document.location.href = "/"}
        />
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