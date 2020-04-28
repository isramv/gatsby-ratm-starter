import React from "react"
import LazyblockHeroBlock from './LazyblockHeroBlock'
import LazyblockAccordionBlock from './LazyblockAccordionBlock'
import LazyblockTextAndImageBlock from './LazyblockTextAndImageBlock'
import CoreParagraphBlock from './CoreParagraphBlock'

const LazyComponents = {
  LazyblockHeroBlock,
  LazyblockAccordionBlock,
  LazyblockTextAndImageBlock,
  CoreParagraphBlock
}

export default block => {
  // component does exist
  if (typeof LazyComponents[block.block.__typename] !== "undefined") {
    return React.createElement(LazyComponents[block.block.__typename], {
      block: block.block
    });
  }
  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {block.block.__typename} has not been created yet.</div>
  );
}
