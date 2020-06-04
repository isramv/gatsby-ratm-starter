import React from 'react'
import Layout from '../components/layout/ratm-layout'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Container } from 'semantic-ui-react'

const Blog = () => {
  const query = useStaticQuery(graphql`{
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
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
  const posts = query.allMdx.edges
  const links = posts.map((post, index) => <li key={`li-${index}`}><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></li>)
  return (
    <Layout>
      <Container>
        <div className='blog-template'>
          <h1>Blog Posts</h1>
          <ul>
            {links}
          </ul>
        </div>
      </Container>
    </Layout>
  )
}

export default Blog