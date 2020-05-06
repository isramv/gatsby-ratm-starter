import React from 'react'

export default ({block}) => {
  return <p dangerouslySetInnerHTML={{__html: block.content}}/>
}
