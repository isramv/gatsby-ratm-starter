import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import {
  Button,
  Container,
  Header,
  Icon,
  Flag,
  Segment,
  Menu
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

const IsraContainer = ({ text }) => {
  return (
    <Container>
      <p>
        {text}
      </p>
    </Container>)
}

const Page = () => {

  function handleClick(e) {
    console.log("Hello Friend")
  }

  return (
    <Layout>
      <main>
        <Segment inverted>
          <Menu inverted>
            <Menu.Item>
              <Link to='/' title='Home'><Icon name='home'/> Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/ratm-test' title='Home'><Flag name='us'/>Ratm test</Link>
            </Menu.Item>
          </Menu>
        </Segment>
        <Container textAlign='justified'>
          <Header size='huge'>Welcome to my site.</Header>
          <IsraContainer text="Hello amigo."/>
          <Button href="/" primary onClick={handleClick}><Icon name='beer'/> Buy me a beer</Button>
        </Container>
      </main>
    </Layout>
  )
}

export default Page