import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItems from './menuItems'
import Footer from './footer'
import './ratm-layout.scss'
import {
  SidebarPusher,
  SidebarPushable,
  Sidebar,
  Menu,
  Icon,
  Container,
  Responsive,
  MenuItem
} from 'semantic-ui-react'

const Layout = ({ children }) => {
  const [visible, setVisible] = useState(false)
  function toggleMobileNav(e) {
    e.preventDefault()
    setVisible(!visible)
  }
  return (
    <>
      <Responsive className='header'>
        <Menu inverted style={{borderRadius: `0`}}>
          <Container>
            <Responsive maxWidth={760}>
              <Container>
                <Menu inverted>
                  <MenuItem onClick={toggleMobileNav}>
                    <Icon name='content'/>
                  </MenuItem>
                </Menu>
              </Container>
            </Responsive>
            <Responsive minWidth={761}>
              <Menu inverted>
                <MenuItems/>
              </Menu>
            </Responsive>
          </Container>
        </Menu>
      </Responsive>
      <SidebarPushable>
        <Sidebar as={Menu}
                 animation='overlay'
                 icon='labeled'
                 inverted
                 onHide={() => setVisible(false)}
                 vertical
                 visible={visible}
                 width='thin'
        >
          <MenuItem onClick={toggleMobileNav} >
            <Icon name='close' circular={true} size='small'/>
          </MenuItem>
          <MenuItems/>
        </Sidebar>
        <SidebarPusher className='main-content'>
          {children}
        </SidebarPusher>
      </SidebarPushable>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
