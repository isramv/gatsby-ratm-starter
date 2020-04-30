import React from 'react'

export default ({block}) => {
  return (
    <section>
      <p dangerouslySetInnerHTML={{__html: block.content}}/>
    </section>
  )
}
