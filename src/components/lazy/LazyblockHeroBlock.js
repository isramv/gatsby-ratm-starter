import React from 'react'
import { Button, Container, Image } from 'semantic-ui-react'
import lazy from '../../styles/lazy/lazy.scss'

export default ({block}) => {
  const data = block.attributes

  data.ctaUrl = data.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  const image = JSON.parse(decodeURIComponent(data.imagen))

  return (
      <Container>
        <div className="custom-hero">
          <Image src={image.url} alt={image.alt} size='large' fluid className='custom-hero__image'/>
          <div className='custom-hero__content'>
            <h1>{data.heroTitle}</h1>
            <Button href={data.ctaUrl} primary>{data.ctaTitle}</Button>
          </div>
        </div>
      </Container>
  )
}
