import React from "react"
import LazyblockHeroBlock from './LazyblockHeroBlock'
import LazyblockAccordionBlock from './LazyblockAccordionBlock'

const LazyComponents = {
  LazyblockHeroBlock,
  LazyblockAccordionBlock
}

export default block => {
  // component does exist
  if (typeof LazyComponents[block.component] !== "undefined") {
    return React.createElement(LazyComponents[block.component], {
      // key: block._uid,
      block: block
    });
  }
  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    // { key: block._uid }
  );
}
