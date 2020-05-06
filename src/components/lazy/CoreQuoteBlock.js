import React from 'react'

export default ({block}) => {
  return <h3 dangerouslySetInnerHTML={{__html: block.value}}/>
}
