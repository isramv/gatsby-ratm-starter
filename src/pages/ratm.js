import React from "react"
import {StaticQuery, graphql} from "gatsby"

const ComponentName = () => (
    <StaticQuery
    query={graphql`
      {
        wpcontent {
          generalSettings {
            title
            url
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
            </div>
        </pre>
    }
    />
)

export default ComponentName