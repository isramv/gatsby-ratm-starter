module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Chromatic demo`,
    author: `@isramv`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "WPGraphQL",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "wpcontent",
        // Url to query from
        url: "https://dev-ratm.pantheonsite.io/graphql",
        // url: "https://ratm.lndo.site/graphql",
      },
    },
    // {
    //   resolve: "gatsby-source-wordpress",
    //   options: {
    //     baseUrl: "dev-ratm.pantheonsite.io",
    //     protocol: "https",
    //     restApiRoutePrefix: "wp-json",
    //     hostingWPCOM: false,
    //     useACF: false,
    //     verboseOutput: false,
    //     includedRoutes: [
    //       "**/media"
    //     ],
    //   }
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    }
  ],
}
