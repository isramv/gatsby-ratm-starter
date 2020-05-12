/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fastDecode = require('fast-decode-uri-component')
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
  drupal {
    nodeQuery(limit: 100, filter: {conditions: {field: "type", operator: EQUAL, value: "article"}}) {
      count
      entities {
        entityUuid
        entityId
        entityLabel
        entityCreated(format: "Y-m-d")
        entityType
        entityUrl {
          path
        }
      }
    }
  }
  }`)
  const markdownPages = result.data.allMarkdownRemark.edges
  const pages = result.data.wpcontent.pages.nodes
  let drupalPages = result.data.drupal.nodeQuery.entities

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

  drupalPages = drupalPages.filter( page => _.has(page, 'entityId'))

  drupalPages.forEach(page => {
    actions.createPage({
      path: page.entityUrl.path,
      component: require.resolve('./src/templates/chq-blog-template'),
      context: {
        id: page.entityId
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
    },
    WPGraphQL_Page: {
      blocksGatsbyJSON: {
        type: `JSON`,
        resolve(source, args, context, info) {
          return JSON.parse(source.blocksJSON)
        }
      },
    }
  })
}
