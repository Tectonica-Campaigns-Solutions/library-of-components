const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.jsx'),
      actionCenter: path.resolve('./src/templates/action-center.jsx'),
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
                typeOfPage
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
        let component = null;
        for (const page of pages) {
          switch (page.node.typeOfPage) {
            // Add here for different types of layouts
            case 'action_center':
              component = templates.actionCenter;
              break
            case 'Content':
              component = templates.page;
              break
            default:
              component = templates.page;
          }
          createPage({
            path: page.node.slug,
            component: component,
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
