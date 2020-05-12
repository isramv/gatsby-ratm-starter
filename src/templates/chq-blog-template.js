import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Container } from "semantic-ui-react";
import Layout from "../components/layout/ratm-layout";

export const query = graphql`
query ($id: String!) {
  drupal {
    nodeById(id: $id) {
      ... on DrupalGraphQL_NodeArticle {
        nid
        uuid
        created
        title
        body {
          format
          value
        }
        fieldArticleAuthor {
          entity {
            fieldDisplayName
          }
        }
        fieldHeroMedia {
          entity {
            ... on DrupalGraphQL_MediaImage {
              mid
              uuid
              entityUrl {
                routed
                path
              }
              fieldMediaImage {
                url
                alt
                height
                width
              }
            }
          }
        }
      }
    }
  }
}`

export default ({data}) => {
  const pageData = data.drupal.nodeById
  return (
    <Layout>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      <Container>
        <h1>{pageData.title}</h1>
        <ReactMarkdown
          source={pageData.body.value}
          style={dark}/>
      </Container>
    </Layout>
  )
}
