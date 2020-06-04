import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
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
        return <li key={`li-${index}`}><Link
          key={`menu-${index}`}
          to={item.node.url.replace('https://dev-ratm.pantheonsite.io', '')
          }>{item.node.label}</Link></li>
      })}
      <li><Link to='/blog'>Blog</Link></li>
    </>
  )
}

export default MenuItems
