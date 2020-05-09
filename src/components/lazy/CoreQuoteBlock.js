import React from 'react'
import {Container} from "semantic-ui-react";

export default ({block}) => {
  return <Container><h3 dangerouslySetInnerHTML={{__html: block.attributes.value}}/></Container>
}
