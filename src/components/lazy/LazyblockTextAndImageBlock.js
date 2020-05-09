import React from 'react'
import {Container, Grid} from 'semantic-ui-react'
import Img from 'gatsby-image'

export default ({block}) => {
  const gatsbyImg = block.imageGatsby.childImageSharp.fixed
  return (
    <section className='lzb-two-column'>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8} className='lzb-two-column__content' textAlign='left'>
              <h1>{block.attributes.title}</h1>
              <p dangerouslySetInnerHTML={{__html: block.attributes.copy}}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8} className='lzb-two-column__photo' textAlign='center'>
              <Img fixed={gatsbyImg}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </section>
  )
}
