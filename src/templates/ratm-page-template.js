import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/ratm-layout'
import Lazy from '../components/lazy/Lazy'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import _ from 'lodash'

export const query = graphql`
query ($id: ID!) {
  wpcontent {
    page(id: $id) {
      id
      title
      blocksJSON
      blocksGatsbyJSON
      content
      blocks {
        ... on WPGraphQL_LazyblockHeroBlock {
          parentId
          attributes {
            imagen
            imageJSON
          }
          imageGatsby {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        ... on WPGraphQL_LazyblockTextAndImageBlock {
          parentId
          attributes {
            image
          }
          imageGatsby {
            childImageSharp {
              fixed(width: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
}`

const PageTemplate = ({ data }) => {
  const blocks = data.wpcontent.page.blocksGatsbyJSON
  const blocksImages = data.wpcontent.page.blocks
  const mergedBlocks = _.merge(blocks, blocksImages)
  const lazyBlocks = mergedBlocks.filter(block => block.name.includes('lazy'))
  const lazyBlockItems = mergedBlocks.map((block, index) => <Lazy key={`lazy-${index}`} block={block}/>)
  const container = (lazyBlocks.length > 0) ? <div className='has-lazy-blocks'>{lazyBlockItems}</div> : <Container className='no-lazy-blocks'>{lazyBlockItems}</Container>
  return (
    <Layout>
      {container}
    </Layout>
  )
}

export default PageTemplate
