import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

import { formatPrice } from "../utils/currency"
import { addToCart } from "../utils/cart"

const ProductTemplate = ({ data }) => {
  return (
    <Layout>
      <section className="container mx-auto text-center">
        <div
          id={data.strapiProduct.uid}
          key={data.strapiProduct.uid}
          className="flex justify-center h-screen p-1"
        >
          <img
            src={data.strapiProduct.thumbnail.publicURL}
            alt={data.strapiProduct.title}
            className="object-cover object-center w-2/3 h-full rounded-lg shadow-md lg:h-3/4"
          />

          <div className="w-1/3 px-4">
            <div className="flex flex-col justify-around p-6 bg-white rounded-lg shadow-lg ">
              <div className="flex justify-center">
                <span className="inline-block px-2 text-xs font-semibold tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full">
                  New
                </span>
                <div className="ml-2 text-xs font-semibold text-red-600 uppercase">
                  REA?
                </div>
              </div>

              <h4 className="mt-1 font-normal uppercase">
                {data.strapiProduct.title}
              </h4>
              <p className="h-12">{data.strapiProduct.description}</p>
              <p className="mt-1">{formatPrice(data.strapiProduct.price)}</p>
              <div className="flex flex-col items-center text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <button
                    onClick={() => addToCart(data.strapiProduct)}
                    className="inline-flex items-center justify-center w-full px-4 py-2 font-semibold leading-6 text-white bg-green-600 border border-transparent rounded-full md:w-auto hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                  >
                    Add to cart
                  </button>
                  {data.strapiProduct.quantity < 5 && (
                    <span className="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-red-700 rounded-full">
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
