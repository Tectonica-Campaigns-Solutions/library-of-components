import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment MainNavigation on DatoCmsMenuItem {
    title
    externalUrl
    isButton
    content {
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
        content {
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
  }

  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    title
    preTitle
    backgroundColor
    content
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
        isButton
        link {
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
  }

  fragment BlockAccordionBlock on DatoCmsAcordion {
    __typename
    id: originalId
    items {
      ... on DatoCmsAcordionItem {
        id
        title
        text
      }
    }
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

  fragment BlockCta on DatoCmsCta {
    __typename
    id: originalId
    title
    isButton
    link {
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

  fragment BlockCardGrid on DatoCmsCardGrid {
    __typename
    id: originalId
    title
    items {
      ... on DatoCmsCard {
        id
        title
        introduction
        backgroundColor
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
          isButton
          link {
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
    }
  }

  fragment BlockTabs on DatoCmsTab {
    __typename
    id: originalId
    items {
      ... on DatoCmsTabItem {
        id
        title
        text
        ctas {
          ... on DatoCmsCta {
            id
            title
            isButton
            link {
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
      }
    }
  }
`;
