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

  function attachImage() {
    
  }

  // Returns a page index.
  function lookForParent(id) {
    return _.findKey(pages, { 'id': id });
  }

  mediaItems.forEach(mediaItem => {
    let parentIndex = lookForParent(mediaItem.parent.id)
    if (typeof parentIndex === 'string') {
      if (typeof pages[parentIndex].mediaItems !== 'undefined') {
        pages[parentIndex].mediaItems.push(mediaItem)
      } else {
        pages[parentIndex].mediaItems = []
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

    // console.log(node.context.page.mediaItems);

    // let fileNode = await createRemoteFileNode({
    //   url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
    //   parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
    //   createNode, // helper function in gatsby-node to generate the node
    //   createNodeId, // helper function in gatsby-node to generate the node id
    //   cache, // Gatsby's cache
    //   store, // Gatsby's redux store
    // })
    //
    // if (fileNode) {
    //   node.featuredImg___NODE = fileNode.id
    // }
  }
}
