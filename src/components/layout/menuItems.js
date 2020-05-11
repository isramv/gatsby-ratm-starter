import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Menu } from 'semantic-ui-react'
import './ratm-layout.scss'

const MenuItems = () => {
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
      {menuItems.map((item, index) => {
        return <Menu.Item
          key={`menu-${index}`}
          name={item.node.label}
          href={(item.node.label === 'Homepage') ? '/' : item.node.url.replace('https://dev-ratm.pantheonsite.io', '')}
        />
      })}
      <Menu.Item href='/blog'>Blog</Menu.Item>
    </>
  )
}

export default MenuItems
