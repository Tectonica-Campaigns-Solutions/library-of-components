const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.jsx'),
    };

    resolve(
      graphql(`
        {
          pages: allDatoCmsBasicPage {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages
        const pages = result.data.pages.edges;
        for (const page of pages) {
          createPage({
            path: page.node.slug,
            component: templates.page,
            context: {
              slug: page.node.slug,
              id: page.node.id,
            },
          });
        }
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
