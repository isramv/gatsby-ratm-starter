import React from 'react'
import Layout from '../components/layout/ratm-layout'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Container } from 'semantic-ui-react'

const BlogIndex = () => {
  const query = useStaticQuery(graphql`{
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
  `)
  const posts = query.allMarkdownRemark.edges
  const links = posts.map(post => <li><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></li>)
  return (
    <Layout>
      <Container>
        <h1>Blog Posts</h1>
        <ul>
          {links}
        </ul>
      </Container>
    </Layout>
  )
}

export default BlogIndex