import React from 'react'
import {Container} from "semantic-ui-react";

export default ({block}) => {
  let blockLevel = {}
  switch (block.level) {
    case 1:
      blockLevel = <h1 dangerouslySetInnerHTML={{__html: block.content}}/>
      break
    case 2:
      blockLevel = <h2 dangerouslySetInnerHTML={{__html: block.content}}/>
      break
    case 3:
      blockLevel = <h3 dangerouslySetInnerHTML={{__html: block.content}}/>
      break
    case 4:
      blockLevel = <h4 dangerouslySetInnerHTML={{__html: block.content}}/>
      break
    default:
      blockLevel = <h2 dangerouslySetInnerHTML={{__html: block.content}}/>
      break
  }
  return <Container className='heading-element'>{blockLevel}</Container>
}
