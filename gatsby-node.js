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

  // Returns a page index.
  function lookForParent(id) {
    return _.findKey(pages, { 'id': id });
  }

  mediaItems.forEach(mediaItem => {
    let parentIndex = lookForParent(mediaItem.parent.id)
    if (typeof parentIndex === 'string') {
      if (typeof pages[parentIndex].mediaItems === 'undefined') {
        pages[parentIndex].mediaItems = []
      }
      if (typeof pages[parentIndex].mediaItems === 'object') {
        pages[parentIndex].mediaItems.push(mediaItem)
      }
    }
  })

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
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    node.internal.type === 'SitePage' &&
    !node.isCreatedByStatefulCreatePages &&
    _.has(node, 'context')
  ) {
    const mediaItems = node.context.page.mediaItems
    if (typeof mediaItems === 'object') {
      let mediaItemsArray = []
      for (const mediaItem of mediaItems) {
        // create media items.
        let fileNode = await createRemoteFileNode({
          url: mediaItem.mediaItemUrl,
          parentNodeId: node.id,
          createNode,
          createNodeId,
          cache,
          store,
        })
        if (fileNode) {
          mediaItemsArray.push(fileNode)
          // node.context.page.mediaItems.push(fileNode);
          // node.nodes.context.mediaItems.push(fileNode.id)
        }
      }
      node.context.page.mediaItems = mediaItemsArray
    }
  }
}
