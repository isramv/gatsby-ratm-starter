import React from 'react'
import {
  Container,
  Segment
} from 'semantic-ui-react'
import Social from "./social";

const Footer = () => {
  return (
    <>
      <Segment inverted className='footer'>
        <Container>
          <p>Chromatic HQ © {new Date().getFullYear()}</p>
          <Social/>
        </Container>
      </Segment>
    </>
  )
}

export default Footer
