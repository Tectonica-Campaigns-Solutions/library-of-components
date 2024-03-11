const path = require(`path`);

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//     const templates = {
//       post: path.resolve('./src/templates/post.js'),
//     };

//     resolve(
//       graphql(`
//         {
//           posts: allDatoCmsPost {
//             edges {
//               node {
//                 id
//                 slug
//                 title
//               }
//             }
//           }
//         }
//       `).then((result) => {
//         if (result.errors) {
//           reject(result.errors);
//         }

//         // Create pages
//         const posts = result.data.posts.edges;
//         for (const post of posts) {
//           createPage({
//             path: post.node.slug,
//             component: templates.post,
//             context: {
//               slug: post.node.slug,
//               id: post.node.id,
//             },
//           });
//         }
//       })
//     );
//   });
// };
