import * as React from "react"
import { graphql, Link, navigate } from "gatsby"

import { formatPrice } from "../utils/currency"
import { uidToURL } from "../utils/uidToURL"
import { addToCart } from "../utils/cart"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  let { state = {} } = location
  if (!state) {
    state = { newUser: false, signedInUser: false }
  }
  let { newUser } = state
  let { signedInUser } = state

  return (
    <Layout>
      <Seo title="Home" />
      <div className="pt-24">
        {newUser && (
          <div className="py-4 pb-8 mb-3 text-xl text-center text-white bg-green-500 border-t border-b border-grey-lighter">
            <button
              onClick={() => {
                navigate("/", {
                  state: { newUser: false, signedInUser: false },
                })
              }}
              className="w-full"
            >
              User created
              <span className="text-xs text-gray-300">{`(Click to close)`}</span>
            </button>
          </div>
        )}
        {signedInUser && (
          <div className="px-8 py-4 mb-3 text-xl text-center text-white bg-green-500 border-t border-b border-grey-lighter">
            <button
              onClick={() => {
                navigate("/", {
                  state: { newUser: false, signedInUser: false },
                })
              }}
              className="w-full"
            >
              User signed in
              <span className="text-xs text-gray-300">{`(Click to close)`}</span>
            </button>
          </div>
        )}
        <section className="container grid grid-cols-1 gap-1 mx-auto mb-20 text-center gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {data.allStrapiProduct.nodes.map(product => (
            <div id={product.uid} key={product.uid} className="p-1">
              <Link className="relative" to={uidToURL(product.uid)}>
                <div className="absolute flex ml-2 top-2 -left-30">
                  <span className="relative z-30 inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase bg-teal-200 bg-indigo-400 rounded-full">
                    New
                  </span>
                  <span className="ml-0.5 z-30 inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase bg-teal-200 bg-red-500 rounded-full">
                    -XX%
                  </span>
                </div>
                <img
                  src={product.thumbnail.publicURL}
                  alt={product.title}
                  className="relative object-cover object-center w-full transform rounded-lg shadow-md hover:z-20 hover:scale-105 h-52 lg:h-80"
                />
              </Link>

              <div className="relative px-4 -mt-28">
                <div className="flex flex-col justify-around p-6 bg-white rounded-lg shadow-lg ">
                  <h4 className="mt-1 font-medium uppercase">
                    {product.title}
                  </h4>
                  <p className="h-12">{product.description}</p>
                  <p className="mt-1">{formatPrice(product.price)}</p>
                  <div className="flex flex-col items-center text-center">
                    <span className="relative inline-flex w-full md:w-auto">
                      <button
                        onClick={() => {
                          addToCart(product)
                          forceUpdate()
                        }}
                        className="inline-flex items-center justify-center w-full px-4 py-2 font-semibold leading-6 text-white bg-gray-800 border border-transparent md:w-auto hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                      >
                        Add to cart
                      </button>
                      {product.quantity < 5 && (
                        <span className="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-red-700 border border-white rounded-full">
                          only {product.quantity} left
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        strapiId
        id
        description
        created_at
        price
        quantity
        title
        thumbnail {
          publicURL
        }
        uid
      }
    }
  }
`
