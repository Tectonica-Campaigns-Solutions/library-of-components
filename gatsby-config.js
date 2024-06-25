require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Tectonica - Library of components`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: process.env.NODE_ENV !== 'production',
        disableLiveReload: false,
        environment: process.env.DATO_ENVIRONMENT ? process.env.DATO_ENVIRONMENT : '',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
