import React from 'react'
import LazyblockHeroBlock from './LazyblockHeroBlock'
import LazyblockAccordionBlock from './LazyblockAccordionBlock'
import CoreParagraphBlock from './CoreParagraphBlock'
import LazyblockTextAndImageBlock from './LazyblockTextAndImageBlock'
import CoreHeadingBlock from './CoreHeadingBlock'

const components = {
  LazyblockHeroBlock,
  LazyblockAccordionBlock,
  LazyblockTextAndImageBlock,
  CoreParagraphBlock,
  CoreHeadingBlock
}

export default (props) => {
  // component does exist
  if (typeof components[props.block.__typename] !== 'undefined') {
    const blockData = props.block.attributes;
    const LazyBlock = components[props.block.__typename]
    return <LazyBlock
      block={blockData}
    />
  }

  // component doesn't exist yet
  return React.createElement(
    // () => <div>The component {block.block.__typename} has not been created yet.</div>
    () => <div>The component {props.block.__typename} has not been created yet.</div>
  )
}
