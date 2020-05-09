import React from 'react'
import {Container} from "semantic-ui-react";

export default ({block}) => {
  return <Container><p dangerouslySetInnerHTML={{__html: block.attributes.content}}/></Container>
}
