import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/ratm-layout'
import Lazy from '../components/lazy/Lazy'
import { Container } from 'semantic-ui-react'
import Img from 'gatsby-image'

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
    return <Lazy key={block.clientId} block={block}/>
  })
  return (
    <Layout>
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {lazyBlockItems}
      </Container>
    </Layout>
  )
}

const TestTemplate = (data) => <>
  <h1>Hello Friend</h1>
  <pre>{JSON.stringify(data, null, 2)}</pre>
</>
export default TestTemplate
