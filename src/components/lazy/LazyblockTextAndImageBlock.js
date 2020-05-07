import React from 'react'
import {
  Grid
} from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export default ({block}) => {
  const image = JSON.parse(decodeURIComponent(block.image))
  const images = useStaticQuery(graphql`
    {
        allFile {
          nodes {
            name
            url
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
  `)
  const allImageNodes = images.allFile.nodes;
  const heroImage = allImageNodes.filter(imageNode => imageNode.url === image.url)
  const gatsbyImg = heroImage[0].childImageSharp.fixed
  return (
    <section>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <h1>{block.title}</h1>
            <p dangerouslySetInnerHTML={{__html: block.copy}}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Img fixed={gatsbyImg}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>
  )
}
