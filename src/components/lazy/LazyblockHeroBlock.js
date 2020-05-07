import React from 'react'
import { Button } from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import fastDecode from 'fast-decode-uri-component'

export default ({ block }) => {
  let image = fastDecode(block.imagen)
  image = JSON.parse(image)
  block.ctaUrl = block.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  const images = useStaticQuery(graphql`
    {
    wpcontent {
      mediaItems {
        nodes {
          title
          sourceUrl
          imageFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
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
  let hero = null
  if (heroImage.length > 0) {
    hero = heroImage[0].imageFile.childImageSharp.fluid
  }
  return (
    <section className="custom-hero">
      <div className='custom-hero__content'>
        <div style={{ maxHeight: `400px`, overflow: `hidden` }}>
          {(hero) ? <Img fluid={hero}/> : null}
        </div>
        <h1>{block.heroTitle}</h1>
        <Button href={block.ctaUrl} primary>{block.ctaTitle}</Button>
      </div>
    </section>
  )
}
