import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import '../../styles/lazy/lazy.scss'

export default ({block}) => {
  block.ctaUrl = block.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  // const image = JSON.parse(decodeURIComponent(block.imagen))
  return (
      <Container>
        <div className="custom-hero">
          <div className='custom-hero__content'>
            <h1>{block.heroTitle}</h1>
            <Button href={block.ctaUrl} primary>{block.ctaTitle}</Button>
          </div>
        </div>
      </Container>
  )
}
