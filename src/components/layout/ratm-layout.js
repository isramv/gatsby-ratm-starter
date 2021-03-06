import React, {useState} from 'react'
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
  MenuItem,
  Image,
  Grid,
  GridColumn
} from 'semantic-ui-react'
import { Link } from 'gatsby'
import logo from '../../static/chromatic-logo.svg'

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
          <Grid>
            <GridColumn mobile={13} tablet={3} computer={3} largeScreen={3}>
              <div className="main-logo">
                <Link to='/'><Image src={logo} size='small'/></Link>
              </div>
            </GridColumn>
            <GridColumn mobile={3} tablet={10} computer={10} largeScreen={13}>
              <Responsive minWidth={761}>
                <ul className='main-menu--desktop'>
                  <MenuItems/>
                </ul>
              </Responsive>
              <Responsive className='hamburger-container' maxWidth={760}>
                  <a href='#mobile-nav' onClick={toggleMobileNav}>
                    <Icon name='content'/>
                  </a>
              </Responsive>
            </GridColumn>
          </Grid>
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
          <ul className="mobile-navigation">
            <MenuItems/>
          </ul>
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
