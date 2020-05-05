import React from 'react'
import { Button, Container } from 'semantic-ui-react'
import '../../styles/lazy/lazy.scss'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const HeroImage = () => {
  const data = useStaticQuery(graphql`{
  allFile {
    nodes {
      name
      childImageSharp {
        fluid {
          base64
          tracedSVG
          srcWebp
          srcSetWebp
          originalImg
          originalName
          presentationWidth
          presentationHeight
        }
      }
    }
  }
}`)

console.log(data);


}


//
//   console.log();
//
//   let h1 = <h1>Hello Friend<h1/>)
// }

export default ({block}) => {
  block.ctaUrl = block.ctaUrl.replace('https://dev-ratm.pantheonsite.io', '')
  const image = JSON.parse(decodeURIComponent(block.imagen))

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
