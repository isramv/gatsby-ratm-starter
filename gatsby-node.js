/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({actions, graphql}) => {
    const result = await graphql(`
    {
      wpcontent {
        pages {
          nodes {
            id
            uri
          }
        }
      }
    }
   `);
    const pages = result.data.wpcontent.pages.nodes
    pages.forEach(page => {
        actions.createPage({
            path: page.uri,
            component: require.resolve('./src/templates/ratm-page-template.js'),
            context: {
                id: page.id
            }
        })
    })
}
