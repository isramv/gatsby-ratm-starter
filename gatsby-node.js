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
    mediaItems {
      nodes {
        id
        mediaItemUrl
        parent {
          ... on WPGraphQL_Page {
            id
          }
        }
      }
    }
    pages {
      nodes {
        title
        uri
        id
      }
    }
  }
  }`)

  const pages = result.data.wpcontent.pages.nodes
  const mediaItems = result.data.wpcontent.mediaItems.nodes
  
  mediaItems.forEach(mediaItem => {
    pages.forEach(page => {
      if (page.id === mediaItem.parent.id) {
        page.mediaItems = []
        page.mediaItems.push(mediaItem)
      }
    })
  })

  pages.forEach(page => {
    actions.createPage({
      path: page.uri,
      component: require.resolve('./src/templates/ratm-page-template.js'),
      context: {
        id: page.id,
        blocks: page.blocksJSON
      }
    })
  })
}
