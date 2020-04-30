import React from 'react'
import { Accordion, AccordionContent, AccordionTitle } from 'semantic-ui-react'

export default ({ block }) => {
  const accordionItems = JSON.parse(decodeURIComponent(block.items))
  const [indx, setIndx] = React.useState(0)

  function handleClick (e, titleProps) {
    setIndx(titleProps.index)
  }

  const accordions = accordionItems.map((item, index) => {
    return (
      <>
        <AccordionTitle
          key={`${block.blockId}-accordion-title${index}`}
          index={index}
          active={(index === indx) ? true : false}
          onClick={handleClick}>{item.itemTitle}
        </AccordionTitle>
        <AccordionContent
          key={`${block.blockId}-accordion-${index}`}
          active={(index === indx) ? true : false}>{item.itemContent}
        </AccordionContent>
      </>
    )
  })
  
  return (
    <section>
      <h1>{block.accordionTitle}</h1>
      <p dangerouslySetInnerHTML={{ __html: block.accordionDescription }}/>
      <Accordion styled>
        {accordions}
      </Accordion>
    </section>
  )
}
