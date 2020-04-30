import React from 'react'
import LazyHero from './LazyblockHeroBlock'
import LazyAccordion from './LazyblockAccordionBlock'
import LazyTextAndImage from './LazyblockTextAndImageBlock'
import CoreParagraph from './CoreParagraphBlock'

const components = {
  lazyblockheroblock: LazyHero,
  lazyblockaccordionblock: LazyAccordion,
  lazyblocktextandimageblock: LazyTextAndImage,
  coreparagraphblock: CoreParagraph
}

export default (props) => {
  // component does exist
  if (typeof components[props.block.__typename.toLowerCase()] !== 'undefined') {

    const blockData = props.block.attributes;
    
    console.log(blockData);

    const LazyBlock = components[props.block.__typename.toLowerCase()]
    return <LazyBlock
      block={blockData}
      key={props.block.clientId}
    />

  }

  // if (typeof LazyComponents[block.block.__typename] !== "undefined") {
  //   return
  // }
  // component doesn't exist yet
  return React.createElement(
    // () => <div>The component {block.block.__typename} has not been created yet.</div>
    () => <div>The component has not been created yet.</div>
  )
}
