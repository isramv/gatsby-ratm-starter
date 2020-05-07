import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Menu, Segment } from 'semantic-ui-react'
import './ratm-layout.scss'

const Header = () => {
  const data = useStaticQuery(graphql`
  {
    wpcontent {
      menus(where: {slug: "main_menu"}) {
        edges {
          node {
            id
            menuItems {
              edges {
                node {
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  `)
  const menuItems = data.wpcontent.menus.edges[0].node.menuItems.edges
  return (
    <>
      <header>
        <Segment inverted>
          <Menu inverted secondary>
            {menuItems.map((item, index) => {
              return <Menu.Item
                key={`menu-${index}`}
                name={item.node.label}
                href={item.node.url.replace('https://dev-ratm.pantheonsite.io', '')}
              />
            })}
          </Menu>
        </Segment>
      </header>
    </>
  )
}

export default Header
