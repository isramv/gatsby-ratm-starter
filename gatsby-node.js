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
        pathQuery: page.node.frontmatter.path
      }
    })
  })
}

const fastDecode = require('fast-decode-uri-component')

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
    WPGraphQL_LazyblockHeroBlockAttributes: {
      imageJSON: {
        type: `JSON`,
        resolve(source, args, context, info) {
          return JSON.parse(fastDecode(source.imagen))
        }
      },
      imageGatsby: {
        type: `File`,
        resolve(source, args, context, info) {
          let imageJSON = JSON.parse(fastDecode(source.imagen));
          let sourceUrl = imageJSON.url
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
    WPGraphQL_LazyblockTextAndImageBlockAttributes: {
      imageJSON: {
        type: `JSON`,
        resolve(source, args, context, info) {
          return JSON.parse(fastDecode(source.image))
        }
      },
      imageGatsby: {
        type: `File`,
        resolve(source, args, context, info) {
          let imageJSON = JSON.parse(fastDecode(source.image));
          let sourceUrl = imageJSON.url
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
    WPGraphQL_LazyblockHeroBlock : {
      imageGatsby: {
        type: `File`,
        resolve(source, args, context, info) {
          let imageJSON = JSON.parse(fastDecode(source.attributes.imagen))
          return createRemoteFileNode({
            url: imageJSON.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        },
      },
    },
    WPGraphQL_LazyblockTextAndImageBlock : {
      imageGatsby: {
        type: `File`,
        resolve(source, args, context, info) {
          let imageJSON = JSON.parse(fastDecode(source.attributes.image))
          return createRemoteFileNode({
            url: imageJSON.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        },
      },
    }
  })
}
