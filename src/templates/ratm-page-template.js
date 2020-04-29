import React  from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
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

const LazyBlocks = ({blocks}) => {
  return(
    <>
      {blocks.map( (block, index) => {
        return (<LazyComponent key={index} block={block}/>)
      })}
    </>
  )
}

const PageTemplate = ({data}) => {
  const blocks = JSON.parse(data.wpcontent.page.blocksJSON)
  return (<Layout>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <LazyBlocks blocks={blocks}/>
  </Layout>)
}

export default PageTemplate
