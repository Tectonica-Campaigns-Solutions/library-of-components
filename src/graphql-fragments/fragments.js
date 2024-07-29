import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment MainNavigation on DatoCmsMenuItem {
    title
    externalUrl
    isButton
    isSearchButton
    path {
      __typename
      ... on DatoCmsBasicPage {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsHomepage {
        slug
        model {
          apiKey
        }
      }
    }
    treeChildren {
      ... on DatoCmsMenuItem {
        title
        externalUrl
        isButton
        path {
          __typename
          ... on DatoCmsBasicPage {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsHomepage {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
    megaMenu {
      ... on DatoCmsMegaMenu {
        tabs {
          ... on DatoCmsMegaMenuTab {
            title
            description
            groupLinks {
              title
              links {
                ... on DatoCmsGlobalLink {
                  title
                  externalUrl
                  path {
                    ... on DatoCmsBasicPage {
                      slug
                      model {
                        apiKey
                      }
                    }
                    ... on DatoCmsPost {
                      slug
                      model {
                        apiKey
                      }
                    }
                  }
                }
              }
              mainLink {
                ... on DatoCmsGlobalLink {
                  title
                  externalUrl
                  path {
                    ... on DatoCmsBasicPage {
                      slug
                      model {
                        apiKey
                      }
                    }
                    ... on DatoCmsPost {
                      slug
                      model {
                        apiKey
                      }
                    }
                  }
                }
              }
            }
            labelHighlight
            highlightedContent {
              ... on DatoCmsBasicPage {
                title
                # summary: description
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsPost {
                title
                slug
                introduction
                mainImage {
                  url
                  alt
                  title
                  width
                  height
                  gatsbyImageData
                }
                model {
                  apiKey
                }
              }
            }
          }
        }
      }
    }
  }

  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    title
    preTitle
    backgroundColor
    content
    internalName
    image {
      url
      alt
      title
      width
      height
      gatsbyImageData
    }
    imageMobile {
      url
      alt
      title
      width
      height
      gatsbyImageData
    }
    alignmentImage
    video {
      preview {
        url
        alt
        title
        width
        height
        gatsbyImageData
      }
      source {
        title
        url
        title
        provider
        providerUid
        thumbnailUrl
        width
        height
      }
    }
    ctas {
      ... on DatoCmsCta {
        id
        title
        style
        link {
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
  }

  fragment BlockNarrativeBlockAdvanced on DatoCmsNarrativeBlockAdvanced {
    __typename
    id: originalId
    title
    preTitle
    backgroundColor
    content
    internalName
    images {
      url
      alt
      title
    }
    carrouselSettingsAutoloop
    carrouselSettingsArrows
    carrouselSettingsNavigation
    alignmentImage
    video {
      preview {
        url
        alt
        title
        width
        height
        gatsbyImageData
      }
      source {
        title
        url
        title
        provider
        providerUid
        thumbnailUrl
        width
        height
      }
    }
    ctas {
      ... on DatoCmsCta {
        id
        title
        style
        link {
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
    embeddedForm {
      ... on DatoCmsEmbedIframe {
        id
        code
      }
    }
    displayForm
  }

  fragment BlockAccordionBlock on DatoCmsAcordion {
    __typename
    id: originalId
    internalName
    items {
      ... on DatoCmsAcordionItem {
        id
        title
        text
      }
    }
  }

  fragment BlockHubspotForm on DatoCmsTextHubspotForm {
    __typename
    id: originalId
    internalName
    title
    description
    hubspot {
      id
      internalName
      formId
      portalId
      region
    }
  }

  fragment BlockNotification on DatoCmsNotification {
    __typename
    id: originalId
    internalName
    content
  }

  fragment BlockDivider on DatoCmsDivider {
    __typename
    id: originalId
  }

  fragment BlockSectionTitle on DatoCmsSectionTitle {
    __typename
    id: originalId
    title
  }

  fragment BlockCtaGrid on DatoCmsCtaGrid {
    __typename
    id: originalId
    internalName
    test: items {
      ...BlockCta
    }
  }

  fragment BlockCta on DatoCmsCta {
    __typename
    id: originalId
    title
    style
    link {
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

  fragment HeroBasic on DatoCmsHeroBasic {
    __typename
    id: originalId
    title
    internalName
    introduction
    backgroundColor
    image {
      url
      alt
      gatsbyImageData
    }
  }

  fragment HeroHome on DatoCmsHeroHome {
    __typename
    id: originalId
    title
    internalName
    introduction
    image {
      url
      alt
      gatsbyImageData
    }
  }

  fragment BlockCardGrid on DatoCmsCardGrid {
    __typename
    id: originalId
    title
    internalName
    withFilters
    items {
      ... on DatoCmsCard {
        id
        title
        introduction
        backgroundColor
        date
        typeOfCard
        displayCta
        image {
          url
          alt
          title
          width
          height
          gatsbyImageData
        }
        cta {
          id
          title
          style
          link {
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
                ... on DatoCmsBasicPage {
                  slug
                  model {
                    apiKey
                  }
                }
                ... on DatoCmsPost {
                  slug
                  model {
                    apiKey
                  }
                }
              }
            }
          }
        }
        tags {
          id
          name
        }
      }
    }
  }

  fragment BlockBreadcrumb on DatoCmsBreadcrumb {
    __typename
    id: originalId
    internalName
    title
  }

  fragment BlockTabs on DatoCmsTab {
    __typename
    id: originalId
    internalName
    items {
      ... on DatoCmsTabItem {
        id
        title
        text
        ctas {
          ... on DatoCmsCta {
            id
            title
            style
            link {
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
      }
    }
  }

  fragment BlockSlider on DatoCmsSlider {
    __typename
    id: originalId
    title
    internalName
    items {
      ... on DatoCmsCard {
        id
        title
        introduction
        backgroundColor
        typeOfCard
        date
        image {
          url
          alt
          title
          width
          height
          gatsbyImageData
        }
        cta {
          id
          title
          style
          link {
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
                ... on DatoCmsBasicPage {
                  slug
                  model {
                    apiKey
                  }
                }
                ... on DatoCmsPost {
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
    }
  }

  fragment BlockSocialShare on DatoCmsSocialShare {
    __typename
    id: originalId
    internalName
    title
  }

  fragment BlockImageGallery on DatoCmsImageGallery {
    __typename
    id: originalId
    internalName
    headline
    images {
      url
      width
      height
      alt
      title
    }
  }

  fragment BlockPeopleModal on DatoCmsPeopleModal {
    __typename
    id: originalId
    internalName
    fullname
    twitterXUrl
    linkedinUrl
    email
    gender
    role
    image {
      url
      alt
      width
      height
    }
    text: content {
      value
    }
  }

  fragment BlockMapboxWrapper on DatoCmsMapbox {
    __typename
    id: originalId
    internalName
  }

  fragment BlockVideoModal on DatoCmsVideoModal {
    __typename
    id: originalId
    internalName
    video {
      url
      filename
      basename
      alt
      title
      video {
        muxPlaybackId
        streamingUrl
        thumbnailUrl
        mp4Url
      }
    }
    externalVideo {
      url
      title
      provider
      providerUid
      thumbnailUrl
      width
      height
    }
    thumbnailImage {
      url
      alt
      width
      height
    }
  }
`;
