import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import './ratm-layout.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <main className="main-content">{children}</main>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
