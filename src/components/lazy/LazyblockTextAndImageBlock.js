import React from 'react'
import {
  Grid,
  Image
} from 'semantic-ui-react'

export default ({block}) => {
  const data = block.attributes;
  const image = JSON.parse(decodeURIComponent(data.image))

  return (
    <section>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <h1>{data.title}</h1>
            <p dangerouslySetInnerHTML={{__html: data.copy}}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Image src={image.url} alt={image.alt} size={'small'}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>
  )
}
