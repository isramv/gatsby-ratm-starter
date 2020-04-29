import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/ratm-layout'
import LazyComponent from '../components/lazy/Lazy'

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
  const lazyBlockItems = blocks.map((block, index) => {
    return <LazyComponent key={block.clientId} block={block}/>
  })

  return (
    <Layout>
      {lazyBlockItems}
    </Layout>
  )
}

export default PageTemplate
