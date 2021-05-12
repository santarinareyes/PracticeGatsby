import React, { useContext } from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

import CartCtx from "../ctx/CartCtx"

import { formatPrice } from "../utils/currency"

const ProductTemplate = ({ data }) => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const { addToCart } = useContext(CartCtx)

  return (
    <Layout>
      <section className="container min-h-screen pt-24 mx-auto text-center">
        <div
          id={data.strapiProduct.uid}
          key={data.strapiProduct.uid}
          className="relative flex flex-col justify-center p-1 h-1/2 lg:flex-row"
        >
          <img
            src={data.strapiProduct.thumbnail.publicURL}
            alt={data.strapiProduct.title}
            className="object-cover object-center rounded-lg shadow-md h-96 lg:w-2/3"
          />
          <div className="absolute flex ml-2 left-1 top-3">
            <span className="relative z-30 inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase bg-teal-200 bg-indigo-400 rounded-full">
              New
            </span>
            <span className="ml-0.5 z-30 inline-block px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase bg-teal-200 bg-red-500 rounded-full">
              -XX%
            </span>
          </div>

          <div className="w-full lg:px-4 lg:w-1/3">
            <div className="flex flex-col justify-around p-6 bg-white rounded-lg shadow-lg ">
              <h4 className="mt-1 font-medium uppercase">
                {data.strapiProduct.title}
              </h4>
              <p className="h-12">{data.strapiProduct.description}</p>
              <p className="mt-1">{formatPrice(data.strapiProduct.price)}</p>
              <div className="flex flex-col items-center text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <button
                    onClick={() => {
                      addToCart(data.strapiProduct)
                      forceUpdate()
                    }}
                    className="inline-flex items-center justify-center w-full px-4 py-2 font-semibold leading-6 text-white bg-gray-800 border border-transparent md:w-auto hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                  >
                    Add to cart
                  </button>
                  {data.strapiProduct.quantity < 5 && (
                    <span className="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-red-700 border border-white rounded-full">
                      only {data.strapiProduct.quantity} left
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProductTemplate
export const productQuery = graphql`
  query singleProduct($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      description
      price
      quantity
      title
      uid
      thumbnail {
        publicURL
      }
    }
  }
`
