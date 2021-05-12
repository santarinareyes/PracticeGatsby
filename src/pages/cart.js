import React, { useState, useCallback, useContext } from "react"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Checkout from "../components/checkout"

import { shippingCost, totalCost, untillFreeShipping } from "../utils/cart"
import { formatPrice } from "../utils/currency"
import { uidToURL } from "../utils/uidToURL"

import { CartCtx } from "../ctx/CartCtx"

const Cart = () => {
  const { cart, addToCart } = useContext(CartCtx)
  let [newCount, setNewCount] = useState(
    cart.reduce((counter, product) => {
      return counter + product.quantInCart
    }, 0)
  )
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const [checkoutClicked, setCheckoutClicked] = useState(false)

  return (
    <Layout>
      <Seo title="Cart" />
      <div className="min-h-screen py-20 bg-gray-100 lg:py-18">
        <div className="container mx-auto">
          <div className="flex flex-col my-10 lg:flex-row lg:shadow-md">
            <div className="w-full px-6 py-10 bg-white shadow-md lg:px-10 lg:w-3/4 lg:shadow-none">
              <div className="flex justify-between pb-8 border-b">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <h2 className="text-2xl font-semibold">{`${newCount} Items`}</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase lg:w-2/5">
                  Product
                </h3>
                <h3 className="w-2/5 text-xs font-semibold text-center text-gray-600 uppercase lg:w-1/5">
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
                <div
                  key={product.uid}
                  className="flex items-center py-5 hover:bg-gray-100"
                >
                  <div className="flex flex-col w-1/5 lg:w-2/5 text-start lg:flex-row">
                    <div className="w-20">
                      <Link to={uidToURL(product.uid)}>
                        <img
                          className="w-24 h-24 mb-0"
                          src={product.thumbnail.publicURL}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between lg:ml-4">
                      <Link to={uidToURL(product.uid)}>
                        <span className="text-sm font-bold whitespace-nowrap">
                          {product.title}
                        </span>
                      </Link>
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
                  <div className="flex justify-center w-2/5 lg:w-1/5">
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

            <div className="w-full px-8 py-10 mt-10 bg-white shadow-md lg:shadow-none lg:mt-0 lg:border-l lg:w-1/4">
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
              <div className="mt-8 lg:border-t">
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
          <div id="checkout-clicked">
            {checkoutClicked && <Checkout cart={cart} />}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
