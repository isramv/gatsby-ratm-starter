import React from "react"
import {StaticQuery, graphql} from "gatsby"

const ComponentName = () => (
    <StaticQuery
      query={graphql`
      {
        __typename
        wpcontent {
          generalSettings {
            title
            url
          }
          pages {
            edges {
              node {
                title
                uri
                status
                slug
              }
            }
          }
        }
      }
    `}
        render={data =>
            <pre>
            {/*{JSON.stringify(data, null, 4)}*/}
                <div>
                <h1>{data.wpcontent.generalSettings.title}</h1>
                <span>{data.wpcontent.generalSettings.url}</span>
                <article>
                    <h2>{data.wpcontent.pages.edges[0].node.title}</h2>
                    <h3>{data.wpcontent.pages.edges[0].node.slug}</h3>
                </article>
            </div>
        </pre>
        }
    />
)

export default ComponentName