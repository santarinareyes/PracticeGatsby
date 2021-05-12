import * as React from "react"
import { useContext, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { countItems } from "../utils/cart"
import { getUser } from "../utils/showRegister"

import CartCtx from "../ctx/CartCtx"

const Header = ({ siteTitle }) => {
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [isExpanded, toggleExpansion] = useState(false)

  const { cart } = useContext(CartCtx)

  return (
    <div className="fixed z-50 w-full text-gray-700 bg-white shadow-md lg:px-8">
      <nav className="flex flex-wrap items-center justify-between p-4 border-b">
        <div className="flex items-center flex-shrink-0 mr-6 text-black transition ease-in-out transform lg:hover:-translate-y-1 lg:hover:scale-110">
          <Link to="/">
            <span className="text-xl font-semibold tracking-tight">
              {siteTitle}
              <span className="text-red-800">.</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Link to="/cart">
            <button className="relative mr-2 leading-none text-center text-gray-600 lg:hidden lg:ml-2 hover:text-gray-800 lg:mt-0">
              <svg
                className="inline-flex w-6 h-6 my-2 text-gray-600 hover:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart && cart.length !== 0 && (
                <span
                  className={`absolute bottom-0 p-0 px-1 text-xs font-bold text-gray-600 bg-white border rounded-full ${
                    cart.length < 10 ? "-left-1" : "-left-2"
                  }`}
                >
                  {cart.reduce((counter, product) => {
                    return counter + product.quantInCart
                  }, 0)}
                </span>
              )}
            </button>
          </Link>
          <button
            onClick={() => toggleExpansion(!isExpanded)}
            className="flex items-center px-3 py-2 text-gray-600 border border-gray-600 rounded hover:text-gray-800 hover:border-gray-800"
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="mx-auto">
            <Link
              to="/"
              className="block mt-4 mr-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:mt-0 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:border-none"
            >
              Products
            </Link>
            <Link
              to="/"
              className="block mt-4 mr-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:mt-0 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:border-none"
            >
              About us
            </Link>
          </div>
          <div className="mt-2">
            <div className="lg:inline-block">
              {getUser().length === 0 ? (
                <>
                  <Link
                    to="/login"
                    className="block mt-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:px-1 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:mt-0 first:border-0"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block mt-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:px-1 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:mt-0 first:border-0"
                  >
                    Register
                  </Link>{" "}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block mt-4 text-gray-600 transition ease-in-out transform lg:inline-block lg:px-1 hover:text-gray-800 lg:hover:-translate-y-1 lg:hover:scale-110 lg:mt-0 first:border-0"
                    onClick={() => {
                      localStorage.removeItem("jwt")
                      forceUpdate()
                    }}
                  >
                    Sign out
                  </Link>
                </>
              )}
            </div>
            <Link to="/cart">
              <button className="relative hidden leading-none text-center text-gray-600 transition ease-in-out transform lg:hover:-translate-y-1 lg:hover:scale-110 lg:ml-2 lg:inline-block hover:text-gray-800 lg:mt-0">
                <svg
                  className="inline-flex w-6 h-6 my-2 text-gray-600 hover:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span
                  className={`absolute bottom-0 p-0 px-1 text-xs font-bold text-gray-600 bg-white border rounded-full ${
                    countItems() < 10 ? "-left-1" : "-left-2"
                  }`}
                >
                  {countItems()}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
