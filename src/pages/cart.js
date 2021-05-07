import React, { useState, useCallback } from "react"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Checkout from "../components/checkout"

import {
  getCart,
  addToCart,
  countItems,
  shippingCost,
  totalCost,
  untillFreeShipping,
} from "../utils/cart"
import { formatPrice } from "../utils/currency"
import { uidToURL } from "../utils/uidToURL"

const Cart = () => {
  const cart = getCart()
  let [newCount, setNewCount] = useState(countItems())
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [checkoutClicked, setCheckoutClicked] = useState(false)

  return (
    <Layout>
      <Seo title="Cart" />
      <div className="min-h-screen py-10 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex my-10 shadow-md">
            <div className="w-3/4 px-10 py-10 bg-white">
              <div className="flex justify-between pb-8 border-b">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <h2 className="text-2xl font-semibold">{`${newCount} Items`}</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="w-2/5 text-xs font-semibold text-gray-600 uppercase">
                  Product Details
                </h3>
                <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
                  Quantity
                </h3>
                <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
                  Price
                </h3>
                <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
                  Total
                </h3>
              </div>

              {cart.map(product => (
                <div className="flex items-center px-6 py-5 -mx-8 hover:bg-gray-100">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <Link to={uidToURL(product.uid)}>
                        <img
                          className="w-24 h-24 mb-0"
                          src={product.thumbnail.publicURL}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between ml-4">
                      <Link to={uidToURL(product.uid)}>
                        <span className="text-sm font-bold">
                          {product.title}
                        </span>
                      </Link>
                      {/* <span className="text-xs text-red-500">
                        {product.description}
                      </span> */}
                      <button
                        className="self-start text-xs font-semibold text-gray-500 cursor-pointer hover:text-red-500"
                        onClick={() => {
                          addToCart(product, 0, true)
                          setNewCount((newCount -= product.quantInCart))
                          forceUpdate()
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg
                      className="w-3 text-gray-600 cursor-pointer fill-current"
                      viewBox="0 0 448 512"
                      onClick={() => {
                        addToCart(product, -1)
                        setNewCount((newCount -= 1))
                        forceUpdate()
                      }}
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input
                      className="w-8 mx-2 text-center border"
                      type="number"
                      value={product.quantInCart}
                    />

                    <svg
                      className="w-3 text-gray-600 cursor-pointer fill-current"
                      viewBox="0 0 448 512"
                      onClick={() => {
                        addToCart(product, 1)
                        setNewCount((newCount += 1))
                        forceUpdate()
                      }}
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="w-1/5 text-sm font-semibold text-center">
                    {formatPrice(product.price)}
                  </span>
                  <span className="w-1/5 text-sm font-semibold text-center">
                    {formatPrice(product.price, product.quantInCart)}
                  </span>
                </div>
              ))}

              <button className="flex mt-10 text-sm font-semibold hover:text-gray-600">
                <Link to="/">Continue Shopping</Link>
              </button>
            </div>

            <div className="w-1/4 px-8 py-10 bg-white border-l">
              <h1 className="pb-8 text-2xl font-semibold border-b">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="text-sm font-semibold uppercase">{`SHIPPING`}</span>
                {shippingCost() === 0 && (
                  <span className="text-sm font-semibold">Free</span>
                )}
                {shippingCost() !== 0 && (
                  <span className="text-sm font-semibold">
                    {formatPrice(shippingCost())}
                  </span>
                )}
              </div>
              {untillFreeShipping() > 0 && (
                <div className="flex justify-between mb-5">
                  <span className="text-sm font-semibold uppercase">{`Until free`}</span>
                  <span className="text-sm font-semibold">
                    {formatPrice(untillFreeShipping())}
                  </span>
                </div>
              )}
              <div className="mt-8 border-t">
                <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                  <span>Total cost</span>
                  <span>{totalCost()}</span>
                </div>
                {!checkoutClicked && newCount > 0 && (
                  <>
                    <button
                      onClick={() => {
                        setCheckoutClicked(true)
                        scrollTo("#checkout-clicked")
                      }}
                      className="w-full py-3 text-sm font-semibold text-white uppercase bg-gray-600 hover:bg-gray-800"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div id="checkout-clicked">{checkoutClicked && <Checkout />}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
