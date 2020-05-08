import React from 'react'
import Layout from '../components/layout/ratm-layout'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Container, List, ListItem } from 'semantic-ui-react'

const Blog = () => {
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
  const links = posts.map(post => <ListItem><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></ListItem>)
  return (
    <Layout>
      <Container>
        <div className='blog-template'>
          <h1>Blog Posts</h1>
          <List>
            {links}
          </List>
        </div>
      </Container>
    </Layout>
  )
}

export default Blog