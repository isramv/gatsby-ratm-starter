import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/ratm-layout'
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
  const lazyBlockItems = blocks.map((block, index) => <Lazy key={`lazy-${index}`} block={block}/>)
  return (
    <Layout>
      <Container>
        {lazyBlockItems}
      </Container>
    </Layout>
  )
}

export default PageTemplate
