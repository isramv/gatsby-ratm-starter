import React from 'react'
import { Grid } from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import fastDecode from 'fast-decode-uri-component'

export default ({block}) => {
  const image = JSON.parse(fastDecode(block.image))
  const images = useStaticQuery(graphql`
    {
    wpcontent {
      mediaItems {
        nodes {
          title
          sourceUrl
          imageFile {
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }`)
  const allImageNodes = images.wpcontent.mediaItems.nodes
  const heroImage = allImageNodes.filter(imageNode => {
    return imageNode.sourceUrl === image.url
  })
  let gatsbyImg = null
  if (heroImage.length > 0) {
    gatsbyImg = heroImage[0].imageFile.childImageSharp.fixed
  }
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
