import React from "react"
import { StaticQuery, graphql } from "gatsby"

const BlockIsra = ({props}) => {
    const blockData = props.originalContent;
    let heroAttributes = {}

    if (props.__typename === 'LazyblockHeroBlock') {
        heroAttributes = props.attributes;
    }
    
    return(
        <>
            <h1>{props.__typename}</h1>
            <div dangerouslySetInnerHTML={{ __html: blockData}}/>
            {/* If type hero    */}
            <div className="Hero">
                <h2>{heroAttributes.heroTitle}</h2>
                {(heroAttributes.ctaUrl) ?  heroAttributes.ctaUrl : null }
            </div>

        </>
    )
}

const ComponentTest = ({data}) => {
    const blocks = JSON.parse(data.wpcontent.page.blocksJSON)
    
    return (<div>
        <h1>Hello Friend</h1>
        <ul>
            {blocks.map((block, i) => {
                return (<BlockIsra key={i} props={block}/>)
            })}
        </ul>
    </div>)
}

const ComponentName = () => (
    <StaticQuery
    query={graphql`
      {
        __typename
        wpcontent {
          page(id: "cGFnZToxMA==") {
            id
            blocksJSON
          }
        }
      }
    `}
    render={data =>
        <pre>
            <ComponentTest data={data}/>
        </pre>}
    />
);

export default ComponentName