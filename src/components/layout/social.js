import React from "react";
import {
  Icon,
  List, ListItem
} from "semantic-ui-react";
import {graphql, useStaticQuery} from "gatsby";

const Social = () => {

  const social = useStaticQuery(graphql`{
    allSocialNetworksYaml {
      edges {
        node {
          id
          name
          url
          icon
        }
      }
    }
  }`)
  const socialIcons = social.allSocialNetworksYaml.edges.map(so =>
    <ListItem key={so.node.icon}><a href={so.node.url}><Icon name={so.node.icon}/></a></ListItem>)
  return (
    <div className='socialNetworks'>
      <List horizontal>
        {socialIcons}
      </List>
    </div>
  )
}

export default Social