import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/ProtectedLayout';
import Dashboard from '../layout/dashboard/dashboard';
import BlocksBuilder from '../components/blocks/blocks-builder';
import CustomSeoDatoCMS from '../components/custom-seo-dato-cms';
import { getSidebarLinksFromBlocks } from '../utils/dato.utils';
import TopBar from '../layout/topbar/TopBar';
import Logs from '../components/blocks/Logs/Logs';
import AppFooter from '../layout/Footer';

const IndexPage = ({ data: { homepage, navbar, footer, favicon } }) => {
  
  const { seo, blocks = [] } = homepage;
  const sidebarLinks = getSidebarLinksFromBlocks(blocks);

  const [activeItem, setActiveItem] = React.useState(-1);

  const renderPage = () => {
    
    return (
      <Layout>
        <TopBar 
            bgColor="#003293" 
            logo={"Plate"}
            title="Components Library for Organizational Themes" 
            buttonLabel="NAZCA | Layout Builder" 
            page="library"
            onButtonClick={() => document.location.href = "/builder"} 
          />
        <CustomSeoDatoCMS seo={seo} favicon={favicon} />

        <Dashboard
          sidebarLinks={sidebarLinks}
          extraLinks={navbar.nodes}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        >
          <div className="px-4">
            {activeItem === -1 ? <Logs /> : null}
            <BlocksBuilder blocks={blocks} footer={footer} activeItem={activeItem} />
          </div>
        </Dashboard>

        <AppFooter 
          page='library'
          buttonLabel='Try Nazca Layout Builder' 
          onButtonClick={() => document.location.href = "/builder"} 
        />

      </Layout>
    )
  };

  return (
    // <ProtectedRoute component={renderPage} />
    renderPage()
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
        ...on DatoCmsComponentInfo {
          __typename
          name
          description
          composedBy
        }
        ...on DatoCmsLink {
          __typename
          id: originalId
          internalName
          pageLink {
            ... on DatoCmsGlobalLink {
              id: originalId
              externalUrl
              model {
                apiKey
              }
            }
          }
        }
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
