import React from 'react'
import {Accordion, AccordionContent, AccordionTitle, Container } from 'semantic-ui-react'

export default ({ block }) => {
  // todo create resolver for attributes.
  const accordionItems = JSON.parse(decodeURIComponent(block.attributes.items))
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
    <section className='lzb-accordion'>
      <Container text textAlign='center'>
        <h1>{block.accordionTitle}</h1>
        <p className='description' dangerouslySetInnerHTML={{ __html: block.accordionDescription }}/>
      </Container>
      <Container>
        <div className='lzb-accordion__container'>
          <Accordion styled>
            {accordions}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
