import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/ratm-layout'
import Lazy from '../components/lazy/Lazy'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

export const query = graphql`
query ($id: ID!) {
  wpcontent {
    page(id: $id) {
      id
      title
      blocksJSON
      content
    }
  }
}`

const PageTemplate = ({ data }) => {
  const blocks = JSON.parse(data.wpcontent.page.blocksJSON)
  const lazyBlocks = blocks.filter(block => block.name.includes('lazy'))
  const lazyBlockItems = blocks.map((block, index) => <Lazy key={`lazy-${index}`} block={block}/>)
  const container = (lazyBlocks.length > 0) ? lazyBlockItems : <Container className='no-lazy-blocks'>{lazyBlockItems}</Container>
  return (
    <Layout>
      {container}
    </Layout>
  )
}

export default PageTemplate
