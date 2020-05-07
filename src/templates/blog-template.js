import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'semantic-ui-react'
import Layout from '../components/layout/ratm-layout'

export const query = graphql`
query ($path: String!) {
  markdownRemark(frontmatter: {path: {eq: $path}}) {
    frontmatter {
      path
      date
      title
    }
    html
  }
}
`

const BlogTemplate = ({data}) => {
  const { markdownRemark } = data
  const { title } = markdownRemark.frontmatter

  return (
    <Layout>
      <Container>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{__html: markdownRemark.html}}/>
      </Container>
    </Layout>
  )
}

export default BlogTemplate
