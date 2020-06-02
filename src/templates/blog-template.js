import React from "react"
import { graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import { Container } from "semantic-ui-react"
import Layout from "../components/layout/ratm-layout"

export const query = graphql`
  query($pathQuery: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathQuery } }) {
      frontmatter {
        path
        date
        title
      }
      html
    }
  }
`

const BlogTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { title } = markdownRemark.frontmatter
  const frontmatter = data.markdownRemark.frontmatter
  
  return (
    <Layout>
      <Container>
        <div className="blog-template">
          <h1>{title}</h1>
           <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </div>
      </Container>
    </Layout>
  )
}

export default BlogTemplate
