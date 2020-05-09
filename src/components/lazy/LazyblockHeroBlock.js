import React from 'react'
import { Button } from 'semantic-ui-react'
import Img from 'gatsby-image'
import './styles/lazyblockHeroBlock.scss'

export default ({ block }) => {
  const image = block.imageGatsby.childImageSharp.fluid || null
  return (
    <section className="lzb-hero">
      <div className='lzb-hero__container'>
        <div className='lzb-hero__image' style={{ maxHeight: `450px`, overflow: `hidden` }}>
          {(image) ? <Img fluid={image}/> : null}
        </div>
        <div className='lzb-hero__content-container'>
          {(block.attributes.heroTitle) ? <h1>{block.attributes.heroTitle}</h1> : null}
          {(block.attributes.ctaUrl) ? <Button href={block.ctaUrl} primary>{block.attributes.ctaTitle}</Button> : null }
        </div>
      </div>
    </section>
  )
}
