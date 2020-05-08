import React, {useState} from 'react'
import PropTypes from 'prop-types'
import MenuItems from './menuItems'
import Footer from './footer'
import './ratm-layout.scss'
import {
  SidebarPusher,
  SidebarPushable,
  Sidebar,
  Grid,
  GridRow,
  Menu,
  Icon,
  Container,
  Responsive,
  MenuItem
} from 'semantic-ui-react'

const Layout = ({children}) => {
  const [visible, setVisible] = useState(false)

  function toggleMobileNav(e) {
    e.preventDefault()
    setVisible(!visible)
  }

  return (
    <div className='pageContainer'>
      <div className='navigation'>
        <Container>
          <Responsive minWidth={761}>
            <Menu className='main-menu--desktop' inverted pointing secondary>
              <MenuItems/>
            </Menu>
          </Responsive>
          <Responsive maxWidth={760}>
            <Menu inverted>
              <MenuItem onClick={toggleMobileNav}>
                <Icon name='content'/>
              </MenuItem>
            </Menu>
          </Responsive>
        </Container>
      </div>
      <SidebarPushable>
        <Sidebar as={Menu}
                 animation='overlay'
                 icon='labeled'
                 inverted
                 onHide={() => setVisible(false)}
                 vertical
                 visible={visible}
                 width='thin'>
          <MenuItem onClick={toggleMobileNav}>
            <Icon name='close' circular={true} size='small'/>
          </MenuItem>
          <MenuItems/>
        </Sidebar>
        <SidebarPusher className='main-content'>
          {children}
        </SidebarPusher>
      </SidebarPushable>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
