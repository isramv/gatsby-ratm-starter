import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

const Footer = () => {
  return (
    <>
      <Segment inverted className='footer'>
        <Container>
          <p>Chromatic HQ © {new Date().getFullYear()}</p>
        </Container>
      </Segment>
    </>
  )
}

export default Footer
