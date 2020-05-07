import React from 'react'
import LazyblockHeroBlock from './LazyblockHeroBlock'
import LazyblockAccordionBlock from './LazyblockAccordionBlock'
import CoreParagraphBlock from './CoreParagraphBlock'
import LazyblockTextAndImageBlock from './LazyblockTextAndImageBlock'
import CoreHeadingBlock from './CoreHeadingBlock'
import CoreQuoteBlock from './CoreQuoteBlock'

const components = {
  LazyblockHeroBlock,
  LazyblockAccordionBlock,
  LazyblockTextAndImageBlock,
  CoreParagraphBlock,
  CoreHeadingBlock,
  CoreQuoteBlock
}

export default ({block}) => {
  // component does exist
  if (typeof components[block.__typename] !== 'undefined') {
    const blockData = block.attributes;
    const blockId = blockData.blockId || block.clientId
    const LazyBlock = components[block.__typename]
    return <LazyBlock
      block={blockData}
      id={blockId}
    />
  }

  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {block.__typename} has not been created yet.</div>
  )
}
