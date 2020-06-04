import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import { Container } from "semantic-ui-react"
import Layout from "../components/layout/ratm-layout"

const shortcodes = { Link }

export const query = graphql`
  query($pathQuery: String!) {
    mdx(frontmatter: { path: { eq: $pathQuery } }) {
      frontmatter {
        path
        date
        title
      }
      body
    }
  }
`

const BlogTemplate = ({ data }) => {
  const { mdx } = data
  return (
    <Layout>
      <Container>
        <div className="blog-template">
          <h1>{mdx.frontmatter.title}</h1>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </Container>
    </Layout>
  )
}

export default BlogTemplate
