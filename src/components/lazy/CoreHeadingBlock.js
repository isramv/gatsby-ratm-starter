import React from 'react'

export default ({block}) => {
  switch (block.level) {
    case 1:
      return <h1 dangerouslySetInnerHTML={{__html: block.content}}/>
    case 2:
      return <h2 dangerouslySetInnerHTML={{__html: block.content}}/>
    case 3:
      return <h3 dangerouslySetInnerHTML={{__html: block.content}}/>
    case 4:
      return <h4 dangerouslySetInnerHTML={{__html: block.content}}/>
    default:
      return <h2 dangerouslySetInnerHTML={{__html: block.content}}/>
  }
}
