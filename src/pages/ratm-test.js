import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from '../components/layout'
import LazyComponent from '../components/lazy/Lazy'

const LazyBlocks = ({blocks}) => {

    // const renderBlocks = blocks.map( block => {
    //   const name = block.__typename
    //   (<LazyComponent tag={name}/>)
    // })
    
    return(
        <>
          {blocks.map( (block, index) => {
            return (<LazyComponent component={block.__typename}/>)
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