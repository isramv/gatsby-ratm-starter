import React from "react";
import { graphql } from "gatsby"

export const query = graphql`
query ($id: ID!) {
  wpcontent {
    page(id: $id) {
      slug
      status
      title
      content
    }
  }
}`

const PageTemplate = ({ data }) => {
    const page = data.wpcontent.page
    // <pre>{JSON.stringify(props, null, 2)}</pre>
    return <>
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </>
}

export default PageTemplate