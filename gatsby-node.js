/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const _ = require(`lodash`)
// You can delete this file if you're not using it
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`{ 
  wpcontent {
    pages {
      nodes {
        title
        uri
        id
      }
    }
  }
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          path
        }
      }
    }
  }
  }`)
  const markdownPages = result.data.allMarkdownRemark.edges
  const pages = result.data.wpcontent.pages.nodes
  pages.forEach(page => {
    actions.createPage({
      path: page.uri,
      component: require.resolve('./src/templates/ratm-page-template.js'),
      context: {
        id: page.id,
        blocks: page.blocksJSON,
        page: page
      }
    })
  })
  markdownPages.forEach(page => {
    actions.createPage({
      path: page.node.frontmatter.path,
      component: require.resolve('./src/templates/blog-template.js'),
      context: {
        path: page.node.frontmatter.path
      }
    })
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          let sourceUrl = source.mediaItemUrl || source.sourceUrl
          return createRemoteFileNode({
            url: sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        },
      },
    },
  })
}
