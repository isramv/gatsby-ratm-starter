import React from 'react'
import { Container } from 'semantic-ui-react'

const Footer = () => {
  return (
    <>
      <footer>
        <Container text>
          <p>Chromatic HQ © {new Date().getFullYear()}</p>
        </Container>
      </footer>
    </>
  )
}

export default Footer
