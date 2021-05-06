/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { data } = require("autoprefixer")

const newRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const getProducts = newRequest(
    graphql,
    `
    query MyQuery {
      allStrapiProduct {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
    
  `
  ).then(result => {
    result.data.allStrapiProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/products/${node.uid}`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
  return Promise.all([getProducts])
}
