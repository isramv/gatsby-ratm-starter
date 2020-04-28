import React  from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from '../components/layout'
import LazyComponent from '../components/lazy/Lazy'

const LazyBlocks = ({blocks}) => {
    return(
        <>
          {blocks.map( (block, index) => {
            return (<LazyComponent key={index} block={block}/>)
          })}
        </>
    )
}

const ComponentTest = ({data}) => {
    const blocks = JSON.parse(data.wpcontent.page.blocksJSON)
    return (<Layout>
        <LazyBlocks blocks={blocks}/>
    </Layout>)
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
        <>
            <ComponentTest data={data}/>
        </>
    }
    />
);

export default ComponentName