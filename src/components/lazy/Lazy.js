import React from 'react'
import LazyblockHeroBlock from './LazyblockHeroBlock'
import LazyblockAccordionBlock from './LazyblockAccordionBlock'
import CoreParagraphBlock from './CoreParagraphBlock'
import LazyblockTextAndImageBlock from './LazyblockTextAndImageBlock'

const components = {
  LazyblockHeroBlock,
  LazyblockAccordionBlock,
  LazyblockTextAndImageBlock,
  CoreParagraphBlock
}

export default (props) => {
  // component does exist
  if (typeof components[props.block.__typename] !== 'undefined') {
    const blockData = props.block.attributes;
    const LazyBlock = components[props.block.__typename]
    return <LazyBlock
      block={blockData}
      // key={props.block.clientId}
    />
  }

  // component doesn't exist yet
  return React.createElement(
    // () => <div>The component {block.block.__typename} has not been created yet.</div>
    () => <div>The component {props.block.__typename} has not been created yet.</div>
  )
}
