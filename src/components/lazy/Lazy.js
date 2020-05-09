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
  const blockName = block.__typename.replace('WPGraphQL_', '')
  if (typeof components[blockName] !== 'undefined') {
    const blockId = block.clientId
    const LazyBlock = components[blockName]
    return <LazyBlock
      block={block}
      id={blockId}
    />
  }

  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {blockName} has not been created yet.</div>
  )
}
