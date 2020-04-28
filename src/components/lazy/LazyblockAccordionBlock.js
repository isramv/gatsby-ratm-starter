import React from 'react'
import { Accordion, AccordionContent, AccordionTitle } from 'semantic-ui-react'

export default ({ block }) => {
  const data = block.attributes
  const accordionItems = JSON.parse(decodeURIComponent(data.items))
  const [indx, setIndx] = React.useState(0)

  function handleClick(e, titleProps) {
    setIndx(titleProps.index)
  }
  
  return (
    <section>
      <h1>{data.accordionTitle}</h1>
      <p dangerouslySetInnerHTML={{ __html: data.accordionDescription }}/>
      <Accordion styled>
        {accordionItems.map((item, index) => {
          return (
            <>
              <AccordionTitle index={index} active={(index === indx) ? true : false} onClick={handleClick}>
                {item.itemTitle}
              </AccordionTitle>
              <AccordionContent active={(index === indx) ? true : false}>
                {item.itemContent}
              </AccordionContent>
            </>
          )})}
      </Accordion>
    </section>
  )
}
