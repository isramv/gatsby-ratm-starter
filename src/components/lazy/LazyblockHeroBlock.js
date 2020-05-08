import React from 'react'
import { Button } from 'semantic-ui-react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import fastDecode from 'fast-decode-uri-component'
import './styles/lazyblockHeroBlock.scss'

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
  console.log(allImageNodes);
  let hero = null
  if (heroImage.length > 0) {
    console.log(hero);
    hero = heroImage[0].imageFile.childImageSharp.fluid
  }
  return (
    <section className="lzb-hero">
      <div className='lzb-hero__container'>
        <div className='lzb-hero__image' style={{ maxHeight: `450px`, overflow: `hidden` }}>
          {(hero) ? <Img fluid={hero}/> : null}
        </div>
        <div className='lzb-hero__content-container'>
          {(block.heroTitle) ? <h1>{block.heroTitle}</h1> : null}
          {(block.ctaUrl) ? <Button href={block.ctaUrl} primary>{block.ctaTitle}</Button> : null }
        </div>
      </div>
    </section>
  )
}
