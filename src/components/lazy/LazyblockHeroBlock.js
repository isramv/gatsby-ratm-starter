import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import fastDecode from 'fast-decode-uri-component'

export default ({block}) => {
  let image = fastDecode(block.imagen)
  image = JSON.parse(image)
  block.ctaUrl = block.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  const images = useStaticQuery(graphql`
    {
        allFile {
          nodes {
            name
            url
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
  const heroImage = allImageNodes.filter(imageNode => imageNode.url === image.url)
  let [ hero ] = heroImage
  hero = hero.childImageSharp.fluid;
  
  return (
      <Container>
        <div className="custom-hero">
          <div className='custom-hero__content'>
            <Img fluid={hero}/>
            <h1>{block.heroTitle}</h1>
            <Button href={block.ctaUrl} primary>{block.ctaTitle}</Button>
          </div>
        </div>
      </Container>
  )
}
