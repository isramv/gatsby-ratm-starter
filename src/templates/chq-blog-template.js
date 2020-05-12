import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

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
    <>
      <h1>{pageData.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ReactMarkdown source={pageData.body.value}/>
    </>
  )
}
