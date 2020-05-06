import React from 'react'

export default ({block}) => {
  return (
    <section>
      <h2 dangerouslySetInnerHTML={{__html: block.content}}/>
    </section>
  )
}
