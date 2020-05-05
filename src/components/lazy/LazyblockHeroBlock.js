import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export default ({block}) => {
  block.ctaUrl = block.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  const images = useStaticQuery(graphql`
    {
        allFile {
          nodes {
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
  `)
  const allImageNodes = images.allFile.nodes;
  const image = JSON.parse(decodeURIComponent(block.imagen))
  const heroImage = allImageNodes.filter(imageNode => imageNode.name === image.title)
  const heroImg = heroImage[0].childImageSharp.fluid
  
  return (
      <Container>
        <div className="custom-hero">
          <div className='custom-hero__content'>
            <Img fluid={heroImg}/>
            <h1>{block.heroTitle}</h1>
            <Button href={block.ctaUrl} primary>{block.ctaTitle}</Button>
          </div>
        </div>
      </Container>
  )
}
